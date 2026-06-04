import Anthropic from "@anthropic-ai/sdk";

import { ankaramneByKod, programById } from "./program";
import { byggGrundning } from "./skolverket";
import type { Arbetsomrade, Grundning } from "./types";

// Standardmodell: Haiku är snabb nog att hinna generera inom Vercels
// funktionsgräns (60s på Hobby-planen). Vill man ha Sonnet (högre kvalitet)
// sätts ANTHROPIC_MODEL – men då kan generering ibland slå i 60s-taket om man
// inte har en plan med längre maxDuration.
const MODELL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const MAX_TOKENS = 3000;

const SYSTEMPROMPT = `Du är en erfaren svensk gymnasielärare och läroplansexpert på Stiernhööksgymnasiet i Rättvik. Din uppgift är att föreslå ämnesövergripande arbetsområden som binder ihop ett ankarämne (oftast Historia eller Svenska) med karaktärsämnena på skolans yrkes- och högskoleförberedande program.

Regler:
- Förankra VARJE förslag i den medskickade Skolverket-datan (centralt innehåll och betygskriterier). Hitta INTE på kurser eller centralt innehåll som inte finns i underlaget.
- Anpassa ton och exempel till de valda programmens yrkesvardag och yrkesutgång. Till exempel: imperialism + Bygg → infrastruktur, järnvägar och materialtransport i kolonierna; imperialism + Lantbruk → råvaror, plantageekonomi, boskap och markanvändning.
- Skriv allt på svenska, konkret och direkt. Korta, tydliga meningar.
- GDPR: inga personuppgifter om elever ska förekomma.
- Returnera ENBART giltig JSON enligt schemat – ingen markdown, inga kodstaket, ingen inledande eller avslutande text.

Returnera ett JSON-objekt med exakt denna form:
{
  "arbetsomraden": [
    {
      "titel": "kort, konkret titel",
      "kort_beskrivning": "1–2 meningar om arbetsområdet",
      "amnen_kurser": ["Historia 1a1", "Svenska 1"],
      "koppling_centralt_innehall": "vilket centralt innehåll/betygskriterier det vilar på, hämtat från Skolverket-datan",
      "varfor_passar_eleverna": "varför detta tilltalar eleverna på det valda programmet, kopplat till deras yrkesvardag/yrkesutgång",
      "elevuppgift": "en konkret uppgift eleverna gör",
      "bedomningside": "kort förslag på hur det kan bedömas"
    }
  ]
}

Generera 3–4 arbetsområden i "arbetsomraden".`;

function byggUnderlag(
  ankaramneKod: string,
  tema: string,
  programIds: string[],
  grundning: Grundning,
): string {
  const ankarNamn = ankaramneByKod(ankaramneKod)?.namn ?? ankaramneKod;
  const programNamn = programIds
    .map((id) => programById(id)?.namn ?? id)
    .join(", ");

  const rader: string[] = [];
  rader.push(`ANKARÄMNE: ${ankarNamn}`);
  rader.push(`TEMA: ${tema}`);
  rader.push(`VALDA PROGRAM: ${programNamn}`);
  rader.push("");

  if (grundning.ankaramne) {
    const a = grundning.ankaramne;
    rader.push(`SKOLVERKET – ANKARÄMNE ${a.subjectNamn} (${a.reform}):`);
    if (a.kurser.length)
      rader.push(`  Kurser: ${a.kurser.map((k) => k.namn).join(", ")}`);
    for (const ci of a.centraltInnehall) rader.push(`  • CI: ${ci}`);
    for (const bk of a.betygskriterier) rader.push(`  • Betygskriterier: ${bk}`);
    rader.push("");
  }

  if (grundning.programAmnen.length) {
    rader.push("SKOLVERKET – KARAKTÄRSÄMNEN PÅ VALDA PROGRAM:");
    for (const a of grundning.programAmnen) {
      rader.push(`- ${a.subjectNamn} (${a.reform}):`);
      for (const ci of a.centraltInnehall.slice(0, 4))
        rader.push(`    • CI: ${ci}`);
      for (const bk of a.betygskriterier.slice(0, 2))
        rader.push(`    • Betygskriterier: ${bk}`);
    }
    rader.push("");
  }

  if (grundning.programKontext.length) {
    rader.push("PROGRAMMENS YRKESKONTEXT (karaktärsområden):");
    for (const p of grundning.programKontext) {
      rader.push(`- ${p.namn}: ${p.karaktarsomraden.join(", ")}`);
    }
    rader.push("");
  }

  rader.push(
    "Utifrån detta underlag: skapa 3–4 ämnesövergripande arbetsområden som binder ihop ankarämnet och temat med de valda programmens karaktärsämnen och yrkeskontext. Varje arbetsområde ska tydligt visa vilka ämnen/kurser det binder ihop och vila på det centrala innehållet ovan. Svara endast med JSON.",
  );

  return rader.join("\n");
}

/** Plockar ut och parsar JSON även om modellen råkar lägga text/kodstaket runt. */
export function parseArbetsomraden(text: string): Arbetsomrade[] {
  let t = text.trim();

  // Ta bort ev. markdown-kodstaket.
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();

  const kandidater: string[] = [];
  kandidater.push(t);

  // Första {...} eller [...]-blocket.
  const objMatch = t.match(/\{[\s\S]*\}/);
  if (objMatch) kandidater.push(objMatch[0]);
  const arrMatch = t.match(/\[[\s\S]*\]/);
  if (arrMatch) kandidater.push(arrMatch[0]);

  for (const k of kandidater) {
    try {
      const data = JSON.parse(k);
      const lista = Array.isArray(data) ? data : data?.arbetsomraden;
      if (Array.isArray(lista) && lista.length) {
        return lista.map(normaliseraArbetsomrade);
      }
    } catch {
      /* prova nästa kandidat */
    }
  }
  throw new Error("Kunde inte tolka modellens svar som JSON.");
}

function strOf(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function normaliseraArbetsomrade(raw: unknown): Arbetsomrade {
  const o = (raw ?? {}) as Record<string, unknown>;
  const amnen = o.amnen_kurser;
  return {
    titel: strOf(o.titel),
    kort_beskrivning: strOf(o.kort_beskrivning),
    amnen_kurser: Array.isArray(amnen)
      ? amnen.map((x) => strOf(x)).filter(Boolean)
      : strOf(amnen)
        ? [strOf(amnen)]
        : [],
    koppling_centralt_innehall: strOf(o.koppling_centralt_innehall),
    varfor_passar_eleverna: strOf(o.varfor_passar_eleverna),
    elevuppgift: strOf(o.elevuppgift),
    bedomningside: strOf(o.bedomningside),
  };
}

export interface GenereraResultat {
  arbetsomraden: Arbetsomrade[];
  kallor: string[];
}

export async function generera(
  ankaramneKod: string,
  tema: string,
  programIds: string[],
): Promise<GenereraResultat> {
  const rawKey = process.env.ANTHROPIC_API_KEY;
  if (!rawKey || !rawKey.trim()) {
    throw new Error(
      "ANTHROPIC_API_KEY saknas. Lägg in den som server-side miljövariabel.",
    );
  }
  const apiKey = rawKey.trim();
  // Vanligt misstag: hela curl-exemplet från dokumentationen klistras in i
  // stället för enbart nyckeln. Då innehåller värdet blanksteg/radbrytningar
  // som gör att HTTP-headern blir ogiltig. Fånga det med ett tydligt fel –
  // och eka ALDRIG tillbaka själva värdet (det kan innehålla nyckeln).
  if (/\s/.test(apiKey) || !apiKey.startsWith("sk-")) {
    throw new Error(
      "ANTHROPIC_API_KEY ser felaktig ut: värdet ska vara ENBART nyckeln " +
        "(börjar med sk-ant-…), utan extra text, citattecken eller radbrytningar.",
    );
  }

  const grundning = await byggGrundning(ankaramneKod, programIds);
  const underlag = byggUnderlag(ankaramneKod, tema, programIds, grundning);

  // Inga retries (en retry kan dubbla tiden och slå i funktionsgränsen) och
  // timeout strax under maxDuration (60s) så vi får ett tydligt fel i stället
  // för en plattforms-timeout (504).
  const client = new Anthropic({ apiKey, timeout: 57_000, maxRetries: 0 });
  const svar = await client.messages.create({
    model: MODELL,
    max_tokens: MAX_TOKENS,
    system: SYSTEMPROMPT,
    messages: [{ role: "user", content: underlag }],
  });

  const text = svar.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const arbetsomraden = parseArbetsomraden(text);
  return { arbetsomraden, kallor: grundning.kallor };
}
