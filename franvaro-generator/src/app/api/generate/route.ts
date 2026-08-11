import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const MAX_TOKENS = 4000;

// ─────────────────────── Mjuk daglig kostnadsgräns ───────────────────────
// Räknaren lever i minnet för den här serverinstansen. Vercels serverless-
// funktioner kan spinna upp flera instanser parallellt och startar om vid
// ny driftsättning eller cold start, så detta är ett grovt, inte exakt,
// skydd mot att länken missbrukas – inte en garanterad kostnadstak. Kombinerat
// med fast modell och fast max_tokens per anrop begränsar den ändå den
// realistiska värsta-falls-kostnaden per dag och instans.
const MAX_PER_DAY = Number(process.env.MAX_REQUESTS_PER_DAY) || 30;
let dagensAntal = 0;
let dagensDatum = new Date().toDateString();

function harBudgetKvar(): boolean {
  const idag = new Date().toDateString();
  if (idag !== dagensDatum) {
    dagensDatum = idag;
    dagensAntal = 0;
  }
  if (dagensAntal >= MAX_PER_DAY) return false;
  dagensAntal++;
  return true;
}

// ─────────────────────────── Request/response-typer ───────────────────────────
interface GroundingLegendItem {
  id: string;
  text: string;
}
type Grounding =
  | { mode: "structured"; legend: GroundingLegendItem[]; courseName: string }
  | { mode: "manual"; text: string }
  | null;

interface GenerateRequestBody {
  subject?: string;
  stadiumLabel?: string;
  duration?: string;
  context?: string;
  extra?: string;
  grounding?: Grounding;
}

interface FormData {
  subject: string;
  stadiumLabel: string;
  duration: string;
  context: string;
  extra: string;
}

// ─────────────────────────── Verktygsschema (tvingad JSON) ───────────────────────────
// Vi tvingar fram svaret via ett "tool use"-anrop i stället för att be
// modellen skriva ut JSON som text och sedan försöka tolka den – det ger
// garanterat välformad, schemaenlig output.
const MATERIAL_TOOL: Anthropic.Tool = {
  name: "leverera_material",
  description: "Returnera det genererade vikariematerialet som strukturerad data.",
  input_schema: {
    type: "object",
    properties: {
      titel: { type: "string", description: "Kort titel för lektionen" },
      instruktioner_till_vikarien: {
        type: "object",
        properties: {
          oversikt: { type: "string", description: "2-3 meningar om lektionens upplägg" },
          material_som_behovs: { type: "array", items: { type: "string" } },
          tidsplan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                tid: { type: "string" },
                aktivitet: { type: "string" },
              },
              required: ["tid", "aktivitet"],
            },
          },
          tips: { type: "array", items: { type: "string" }, description: "Praktiska tips till vikarien" },
        },
        required: ["oversikt", "material_som_behovs", "tidsplan", "tips"],
      },
      elevuppgift: {
        type: "object",
        properties: {
          introduktion: { type: "string", description: "Text som läses upp/visas för eleverna" },
          uppgifter: {
            type: "array",
            items: {
              type: "object",
              properties: {
                nummer: { type: "integer" },
                text: { type: "string" },
                kopplingar: {
                  type: "array",
                  items: { type: "string" },
                  description: "ID:n (t.ex. CI1, KK2) för de kunskapskrav/centralt innehåll deluppgiften kopplar till, eller tom lista",
                },
              },
              required: ["nummer", "text", "kopplingar"],
            },
          },
        },
        required: ["introduktion", "uppgifter"],
      },
      facit: {
        type: "object",
        properties: {
          svar: {
            type: "array",
            items: {
              type: "object",
              properties: {
                nummer: { type: "integer" },
                facit: { type: "string" },
                kopplingar: { type: "array", items: { type: "string" } },
              },
              required: ["nummer", "facit", "kopplingar"],
            },
          },
          bedomningsanteckning: {
            type: "string",
            description: "Kort anteckning till ordinarie lärare om vad som visar godtagbara kunskaper, eller tom sträng",
          },
        },
        required: ["svar", "bedomningsanteckning"],
      },
      buffertaktivitet: {
        type: "object",
        properties: {
          titel: { type: "string" },
          beskrivning: { type: "string", description: "En extra aktivitet ifall klassen blir klar i förtid" },
          tidsat: { type: "string" },
        },
        required: ["titel", "beskrivning", "tidsat"],
      },
    },
    required: ["titel", "instruktioner_till_vikarien", "elevuppgift", "facit", "buffertaktivitet"],
  },
};

// ─────────────────────────── Promptbygge ───────────────────────────
function buildSystemPrompt(formData: FormData, grounding: Grounding): string {
  let prompt =
    "Du är en erfaren svensk lärare och pedagog som hjälper ordinarie lärare att skapa material till vikarier " +
    '("frånvaro-material"). Materialet ska vara självinstruerande så att en vikarie utan ämneskunskap kan hålla i lektionen, ' +
    "och begripligt för elever i " +
    formData.stadiumLabel.toLowerCase() +
    ' som arbetar med ämnet/kursen "' +
    formData.subject +
    '".\n\n' +
    "Lektionen är " +
    formData.duration +
    " minuter lång.\n\n";

  if (grounding && grounding.mode === "structured" && grounding.legend.length > 0) {
    prompt +=
      'KOPPLADE KUNSKAPSKRAV OCH CENTRALT INNEHÅLL (hämtade från Skolverkets Syllabus API för "' +
      grounding.courseName +
      '"):\n';
    grounding.legend.forEach((item) => {
      prompt += "- [" + item.id + "] " + item.text + "\n";
    });
    prompt +=
      "\nVIKTIGT: Elevuppgiften och facit SKA uttryckligen kopplas till ett eller flera av ovanstående punkter. " +
      'Varje deluppgift i elevuppgiften och varje svar i facit ska ha fältet "kopplingar" ifyllt med vilka ID:n ' +
      '(t.ex. "CI1", "KK2") som deluppgiften tränar eller bedömer. Hitta INTE på egna kunskapskrav – använd bara de ' +
      'som listas ovan. Om en deluppgift inte tydligt kopplar till något av dem, lämna "kopplingar" som en tom lista.\n\n';
  } else if (grounding && grounding.mode === "manual" && grounding.text) {
    prompt +=
      "LÄRAREN HAR SJÄLV KLISTRAT IN FÖLJANDE UNDERLAG FRÅN KURSPLANEN, VÄV IN DET I MATERIALET:\n" +
      grounding.text +
      "\n\n" +
      'Koppla elevuppgiften och facit till detta underlag där det är relevant, men hitta inte på exakta ID-referenser – ' +
      'skriv istället en kort fras i fältet "kopplingar" per deluppgift (eller en tom lista om inget passar).\n\n';
  } else {
    prompt +=
      'Inga specifika kunskapskrav har hämtats för denna lektion. Skapa ändå ett ämnesrelevant och pedagogiskt väl ' +
      'avvägt material för stadiet. Lämna fältet "kopplingar" som en tom lista överallt.\n\n';
  }

  prompt +=
    "Skriv på tydlig, korrekt svenska anpassad till åldersgruppen. Elevuppgiften ska innehålla minst 4-6 konkreta " +
    "deluppgifter eleverna kan arbeta med självständigt utan vikariens ämneskunskap. Använd verktyget " +
    '"leverera_material" för att lämna svaret.';

  return prompt;
}

function buildUserPrompt(formData: FormData): string {
  return (
    "Skapa vikariematerial enligt instruktionerna i systemprompten.\n\n" +
    "Ämne/kurs: " +
    formData.subject +
    "\n" +
    "Skolform/stadium: " +
    formData.stadiumLabel +
    "\n" +
    "Lektionslängd: " +
    formData.duration +
    " minuter\n" +
    "Vad klassen jobbar med just nu: " +
    (formData.context || "Inte angivet – gör rimliga antaganden för ämnet och stadiet.") +
    "\n" +
    "Extra instruktioner till vikarien: " +
    (formData.extra || "Inga.")
  );
}

// ─────────────────────────── Route handler ───────────────────────────
export async function POST(request: Request) {
  let body: GenerateRequestBody;
  try {
    body = (await request.json()) as GenerateRequestBody;
  } catch {
    return NextResponse.json({ error: "Felaktig JSON i förfrågan." }, { status: 400 });
  }

  const subject = (body.subject || "").trim();
  if (!subject) {
    return NextResponse.json({ error: "Ange ett ämne eller en kurs." }, { status: 400 });
  }
  const formData: FormData = {
    subject,
    stadiumLabel: (body.stadiumLabel || "Grundskola").trim(),
    duration: (body.duration || "60").trim(),
    context: (body.context || "").trim(),
    extra: (body.extra || "").trim(),
  };
  const grounding = body.grounding ?? null;

  if (!harBudgetKvar()) {
    return NextResponse.json(
      {
        error:
          "Dagens gräns för antal genereringar (" +
          MAX_PER_DAY +
          " st) är nådd. Försök igen imorgon, eller kontakta den som administrerar sidan.",
      },
      { status: 429 },
    );
  }

  const rawKey = process.env.ANTHROPIC_API_KEY;
  if (!rawKey || !rawKey.trim()) {
    return NextResponse.json(
      { error: "Servern är inte konfigurerad (ANTHROPIC_API_KEY saknas)." },
      { status: 500 },
    );
  }
  const apiKey = rawKey.trim();
  if (/\s/.test(apiKey) || !apiKey.startsWith("sk-")) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY på servern ser felaktig ut. Kontakta den som administrerar sidan." },
      { status: 500 },
    );
  }

  try {
    const client = new Anthropic({ apiKey, timeout: 55_000, maxRetries: 0 });
    const systemPrompt = buildSystemPrompt(formData, grounding);
    const userPrompt = buildUserPrompt(formData);

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      thinking: { type: "disabled" },
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
      tools: [MATERIAL_TOOL],
      tool_choice: { type: "tool", name: MATERIAL_TOOL.name },
    });

    const toolBlock = response.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    );
    if (!toolBlock) {
      return NextResponse.json(
        { error: "AI:n kunde inte generera materialet. Försök igen." },
        { status: 502 },
      );
    }

    return NextResponse.json({ data: toolBlock.input });
  } catch (err) {
    const meddelande = err instanceof Error ? err.message : "Okänt fel vid generering.";
    const e = err as { status?: number; name?: string; cause?: unknown };
    const orsak = e.cause instanceof Error ? e.cause.message : e.cause ? String(e.cause) : null;
    // Maskera ev. API-nyckel innan felet loggas, så en felaktigt inklistrad
    // nyckel aldrig läcker via loggar eller svar.
    const redacta = (s: string) => s.replace(/sk-ant-[A-Za-z0-9_-]+/g, "sk-ant-***MASKERAD***");
    const detalj = redacta(
      [e.name, e.status ? "status " + e.status : null, meddelande, orsak ? "orsak: " + orsak : null]
        .filter(Boolean)
        .join(" – "),
    );
    console.error("[/api/generate] fel:", detalj);
    return NextResponse.json({ error: "Kunde inte generera materialet.", detalj }, { status: 502 });
  }
}
