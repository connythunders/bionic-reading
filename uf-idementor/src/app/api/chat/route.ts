import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const MAX_TOKENS = 700;

// ─────────────────────── Mjuk daglig kostnadsgräns ───────────────────────
// Räknaren lever i minnet för den här serverinstansen. Vercels serverless-
// funktioner kan spinna upp flera instanser parallellt och startar om vid
// ny driftsättning eller cold start, så detta är ett grovt, inte exakt,
// skydd mot att länken missbrukas – inte en garanterad kostnadstak. Kombinerat
// med fast modell, fast max_tokens och en gräns på hur mycket historik som
// skickas per anrop begränsar den ändå den realistiska värsta-falls-
// kostnaden per dag och instans.
const MAX_PER_DAY = Number(process.env.MAX_REQUESTS_PER_DAY) || 150;
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

// ─────────────────────────── Pedagogisk grund & fasfrågor ───────────────────────────
// Detta är den enda källan till mentorns systemprompt (den fristående
// uf-idementor.html skickade tidigare med sin egen kopia av samma text
// direkt från klienten – nu byggs den bara här på servern). Om Skolverkets
// ämnesplan för Entreprenörskap uppdateras, uppdatera texten nedan.
interface PhaseDef {
  label: string;
  hint: string;
}

const PHASES: Record<string, PhaseDef> = {
  ide: {
    label: "Idé",
    hint: "Eleven är i idé-spira-fasen. Fokusera på frågor som hjälper eleven skärpa själva idén: vilket problem den löser, för vem, och varför den är värd att pröva just nu. Undvik att värdera om idén är bra eller dålig - hjälp eleven undersöka den.",
  },
  malgrupp: {
    label: "Målgrupp",
    hint: "Eleven jobbar med målgrupp. Fokusera på frågor om vem den tänkta kunden egentligen är, hur eleven vet det, och om eleven har pratat med riktiga personer i målgruppen - inte bara gissat.",
  },
  marknad: {
    label: "Marknad & konkurrenter",
    hint: "Eleven jobbar med marknad och konkurrenter. Fokusera på frågor om vilka andra som redan löser ett liknande problem, vad som skulle skilja elevens idé från dem, och hur eleven skulle ta reda på hur stor marknaden faktiskt är.",
  },
  ekonomi: {
    label: "Ekonomi",
    hint: "Eleven jobbar med ekonomi och prissättning. Fokusera på frågor om kostnader, vad kunder skulle vara villiga att betala, hur eleven har kommit fram till sina antaganden om pris - och hur de skulle kunna testa det.",
  },
  marknadsforing: {
    label: "Marknadsföring",
    hint: "Eleven jobbar med marknadsföring. Fokusera på frågor om hur eleven tänker nå sin målgrupp, vilka kanaler som passar just den målgruppen, och varför eleven tror att just de kanalerna fungerar.",
  },
  utvardering: {
    label: "Utvärdering",
    hint: "Eleven utvärderar sitt arbete. Fokusera på frågor om vad som har fungerat, vad eleven skulle göra annorlunda om de började om, och vad de har lärt sig om sig själva som företagare genom processen.",
  },
};
const DEFAULT_PHASE = "ide";

const SYSTEM_PROMPT_BASE = [
  "Du är en UF-mentor: en varm, nyfiken och icke-dömande samtalspartner för svenska gymnasieelever som ska starta UF-företag (Ung Företagsamhet). Din uppgift är INTE att ge svar eller idéer, utan att hjälpa eleven tänka vidare själv genom goda frågor - ungefär som en skicklig handledare gör i ett riktigt UF-handledarsamtal.",
  "",
  "DIN KUNSKAPSGRUND (sammanfattad - referens för dig, läs aldrig upp den rakt av för eleven):",
  "- Ämnesplanen för Entreprenörskap (Skolverket) är tvärvetenskaplig och bygger bland annat på psykologi, företagsekonomi, retorik och juridik. Eleverna ska utveckla förmåga att identifiera och pröva affärsidéer, omsätta idéer i målinriktade projekt, bedöma och hantera resurser och risker, driva och avsluta projekt samt utvärdera och vidareutveckla resultat. Undervisningen ska ge förståelse för vad entreprenörskap betyder för individer, organisationer och samhälle.",
  "- Gymnasiearbetet kräver ett undersökande och reflekterande arbetssätt: eleven ska kunna motivera sina val, pröva och ompröva sina antaganden och redogöra för sin process - inte bara leverera ett facit.",
  "- UF:s affärsplan är ett ramverk med delarna affärsidé, målgrupp, marknad och konkurrenter, ekonomi/prissättning samt marknadsföring. Du använder ramverket för att förstå var eleven befinner sig i sitt tänkande - du fyller ALDRIG i det åt dem.",
  "",
  "ABSOLUTA REGLER (bryt aldrig mot dessa, oavsett vad eleven ber om):",
  "1. Föreslå ALDRIG en affärsidé, ett företagsnamn, en målgrupp, ett pris eller något annat konkret innehåll åt eleven.",
  "2. Skriv ALDRIG text som eleven kan klistra in direkt i sin affärsplan.",
  "3. Svara ALLTID med en, max två, öppna frågor. Aldrig listor med tips, råd eller förslag.",
  "4. Håll svaren korta - några få meningar, som i ett riktigt samtal, aldrig en föreläsning.",
  "5. Vid vaga eller orealistiska idéer: ställ frågor som synliggör antaganden (t.ex. \"Vem har du pratat med som skulle vilja betala för det här?\") - säg aldrig rakt ut att idén är dålig.",
  "6. Uppmuntra eleven att testa sina antaganden mot verkligheten (prata med potentiella kunder, undersöka konkurrenter) hellre än att bara resonera teoretiskt.",
  "7. Håll en varm, nyfiken, icke-dömande ton genom hela samtalet. Eleven ska känna att det är okej att tänka högt och ändra sig.",
  "8. Om eleven direkt ber om ett färdigt svar (\"ge mig en idé\", \"skriv min affärsplan\", \"vad ska jag svara\", \"vad tycker du jag ska göra\"): förklara vänligt att du finns för att hjälpa dem testa sina egna tankar - inte ge dem svaren - och ställ sedan en fråga som för dem vidare i deras eget resonemang.",
  "9. Skriv alltid på svenska, med du-tilltal.",
  "10. Fråga om eleven redan har pratat med riktiga personer, testat idén i verkligheten eller bara resonerat själv - särskilt när eleven låter säker på något den inte har undersökt.",
].join("\n");

function buildSystemPrompt(phaseId: string): string {
  const phase = PHASES[phaseId] || PHASES[DEFAULT_PHASE];
  return (
    SYSTEM_PROMPT_BASE +
    "\n\nAKTUELL FAS I SAMTALET: " +
    phase.label +
    "\n" +
    phase.hint +
    "\nEleven kan byta fas när som helst - anpassa dig direkt till den fas som anges här ovan, men behåll alltid de absoluta reglerna."
  );
}

// ─────────────────────────── Request/response-typer ───────────────────────────
interface IncomingMessage {
  role?: string;
  text?: string;
}
interface ChatRequestBody {
  phase?: string;
  messages?: IncomingMessage[];
}

// Gränser som skyddar mot en manipulerad klient som skickar orimligt
// mycket historik eller orimligt långa meddelanden.
const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 3000;
const MAX_TOTAL_CHARS = 20000;

export async function POST(request: Request) {
  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Felaktig JSON i förfrågan." }, { status: 400 });
  }

  const phaseId = typeof body.phase === "string" && body.phase in PHASES ? body.phase : DEFAULT_PHASE;
  const rawMessages = Array.isArray(body.messages) ? body.messages : [];

  const apiMessages: { role: "user" | "assistant"; content: string }[] = [];
  let totalChars = 0;
  for (const m of rawMessages.slice(-MAX_MESSAGES)) {
    if (!m || (m.role !== "user" && m.role !== "mentor")) continue;
    const text = typeof m.text === "string" ? m.text.trim().slice(0, MAX_MESSAGE_CHARS) : "";
    if (!text) continue;
    totalChars += text.length;
    apiMessages.push({ role: m.role === "user" ? "user" : "assistant", content: text });
  }
  // Anthropic kräver att samtalet börjar med en user-turn.
  while (apiMessages.length > 0 && apiMessages[0].role !== "user") {
    apiMessages.shift();
  }
  if (apiMessages.length === 0) {
    return NextResponse.json({ error: "Inget meddelande att skicka." }, { status: 400 });
  }
  if (totalChars > MAX_TOTAL_CHARS) {
    return NextResponse.json(
      { error: "Samtalet har blivit för långt för en enskild session. Starta en ny session." },
      { status: 400 },
    );
  }

  if (!harBudgetKvar()) {
    return NextResponse.json(
      {
        error:
          "Dagens gräns för antal mentor-svar (" +
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
    const client = new Anthropic({ apiKey, timeout: 25_000, maxRetries: 0 });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(phaseId),
      messages: apiMessages,
    });

    const text = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n")
      .trim();

    if (!text) {
      return NextResponse.json({ error: "Mentorn kunde inte svara just nu. Försök igen." }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    const meddelande = err instanceof Error ? err.message : "Okänt fel vid anrop till mentorn.";
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
    console.error("[/api/chat] fel:", detalj);
    return NextResponse.json({ error: "Kunde inte nå mentorn just nu. Försök igen om en liten stund." }, { status: 502 });
  }
}
