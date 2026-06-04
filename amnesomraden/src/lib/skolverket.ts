import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import sample from "@/data/skolverket-sample.json";
import { ankaramneByKod, programById } from "./program";
import type {
  AmnesGrundning,
  Grundning,
  Karaktarsamne,
  Reform,
  SkolProgram,
} from "./types";

/**
 * Klient mot Skolverkets Syllabus API.
 *
 * Verifierad bas och endpoints (via OpenAPI/Swagger, 2026-06):
 *   Bas:        https://api.skolverket.se/syllabus
 *   Ämnen:      GET /v1/subjects, GET /v1/subjects/{code}
 *   Program:    GET /v1/programs, GET /v1/programs/{code}
 *   Kurser:     GET /v1/courses
 *   Query:      schoolType, timespan (CURRENT|FUTURE|EXPIRED|CANCELED),
 *               date, reform (Gy25|Gy11|Gyan13)
 *
 * Öppen data, ingen API-nyckel. CORS antas blockera webbläsaren – därför
 * anropas API:et endast server-side. Data ändras sällan, så vi cachar.
 */

const BAS = "https://api.skolverket.se/syllabus";
const TIMEOUT_MS = 6000;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 1 vecka
const LIVE = process.env.SKOLVERKET_LIVE !== "0";

type SampleSubjects = Record<
  string,
  {
    subjectNamn: string;
    reform: string;
    kurser: { kod: string; namn: string }[];
    centraltInnehall: string[];
    betygskriterier: string[];
  }
>;
const SAMPLE: SampleSubjects = (sample as { subjects: SampleSubjects }).subjects;

// ───────────────────────────── Cache ─────────────────────────────
// In-memory + JSON på disk (tmp, skrivbart även på Vercel).

interface CacheValue<T> {
  ts: number;
  data: T;
}
const minne = new Map<string, CacheValue<unknown>>();

function cacheFil(nyckel: string): string {
  const safe = nyckel.replace(/[^a-z0-9_-]/gi, "_");
  return path.join(os.tmpdir(), `skolverket-${safe}.json`);
}

async function cacheLas<T>(nyckel: string): Promise<T | null> {
  const i = minne.get(nyckel) as CacheValue<T> | undefined;
  if (i && Date.now() - i.ts < CACHE_TTL_MS) return i.data;
  try {
    const raw = await fs.readFile(cacheFil(nyckel), "utf8");
    const v = JSON.parse(raw) as CacheValue<T>;
    if (Date.now() - v.ts < CACHE_TTL_MS) {
      minne.set(nyckel, v);
      return v.data;
    }
  } catch {
    /* ingen cache på disk */
  }
  return null;
}

async function cacheSkriv<T>(nyckel: string, data: T): Promise<void> {
  const v: CacheValue<T> = { ts: Date.now(), data };
  minne.set(nyckel, v);
  try {
    await fs.writeFile(cacheFil(nyckel), JSON.stringify(v), "utf8");
  } catch {
    /* disk ej skrivbar – minnescache räcker */
  }
}

// ─────────────────────────── Hämtning ───────────────────────────

async function hamtaJson(url: string): Promise<unknown | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/**
 * Plockar ut centralt innehåll och betygskriterier ur ett subject-svar på ett
 * defensivt sätt. API:ets exakta fältnamn kan variera mellan Gy11/Gy25, så vi
 * letar brett efter rimliga fält och faller tillbaka tomt vid behov.
 */
function normalisera(
  raw: unknown,
  subjectCode: string,
): AmnesGrundning | null {
  if (!raw || typeof raw !== "object") return null;
  // Svaret kan vara { subject: {...} } eller direkt {...}.
  const obj = raw as Record<string, unknown>;
  const subject = (obj.subject ?? obj) as Record<string, unknown>;

  const namn =
    (typeof subject.name === "string" && subject.name) ||
    (typeof subject.title === "string" && subject.title) ||
    subjectCode;

  const reform = lasReform(subject);
  const kurser: { kod: string; namn: string }[] = [];
  const centraltInnehall: string[] = [];
  const betygskriterier: string[] = [];

  const courses = (subject.courses ??
    subject.coursesAndLevels ??
    []) as unknown[];
  for (const c of Array.isArray(courses) ? courses : []) {
    if (!c || typeof c !== "object") continue;
    const course = c as Record<string, unknown>;
    const kkod =
      (typeof course.code === "string" && course.code) ||
      (typeof course.courseCode === "string" && course.courseCode) ||
      "";
    const knamn =
      (typeof course.name === "string" && course.name) ||
      (typeof course.title === "string" && course.title) ||
      kkod;
    if (kkod || knamn) kurser.push({ kod: kkod, namn: knamn });

    samlaText(course.centralContent, centraltInnehall);
    samlaText(course.centralContents, centraltInnehall);
    samlaText(course.knowledgeRequirements, betygskriterier);
    samlaText(course.gradingCriteria, betygskriterier);
    samlaText(course.gradeCriteria, betygskriterier);
  }

  // Ämnesnivå (Gy25 lägger ofta innehållet på ämnet, inte kursen).
  samlaText(subject.centralContent, centraltInnehall);
  samlaText(subject.centralContents, centraltInnehall);
  samlaText(subject.gradingCriteria, betygskriterier);

  if (centraltInnehall.length === 0 && betygskriterier.length === 0) {
    return null;
  }

  return {
    subjectCode,
    subjectNamn: namn,
    kurser: kurser.slice(0, 8),
    centraltInnehall: avkorta(centraltInnehall, 8),
    betygskriterier: avkorta(betygskriterier, 6),
    reform,
    kalla: "skolverket-api",
  };
}

function lasReform(subject: Record<string, unknown>): Reform {
  const r = String(
    subject.reform ?? subject.schoolType ?? subject.version ?? "",
  ).toLowerCase();
  if (r.includes("gy25")) return "Gy25";
  if (r.includes("gy11")) return "Gy11";
  return "okand";
}

function samlaText(varde: unknown, ut: string[]): void {
  if (!varde) return;
  if (typeof varde === "string") {
    const t = stripHtml(varde);
    if (t) ut.push(t);
    return;
  }
  if (Array.isArray(varde)) {
    for (const v of varde) samlaText(v, ut);
    return;
  }
  if (typeof varde === "object") {
    const o = varde as Record<string, unknown>;
    // vanliga textbärande fält
    for (const k of ["text", "value", "content", "description", "name"]) {
      if (typeof o[k] === "string") {
        const t = stripHtml(o[k] as string);
        if (t) ut.push(t);
      }
    }
  }
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function avkorta(arr: string[], max: number): string[] {
  const unika = Array.from(new Set(arr.filter(Boolean)));
  return unika.slice(0, max);
}

// ───────────────────── Ämne (med fallback) ─────────────────────

function franSample(subjectCode: string): AmnesGrundning | null {
  const s = SAMPLE[subjectCode];
  if (!s) return null;
  const reform: Reform =
    s.reform === "Gy25" ? "Gy25" : s.reform === "Gy11" ? "Gy11" : "okand";
  return {
    subjectCode,
    subjectNamn: s.subjectNamn,
    kurser: s.kurser,
    centraltInnehall: s.centraltInnehall,
    betygskriterier: s.betygskriterier,
    reform,
    kalla: "exempeldata",
  };
}

/**
 * Param-kombinationer som provas i tur och ordning för ett ämne. Gy25 först,
 * sedan Gy11. Eftersom Gy11-ämnen ofta är "canceled" (utgår i.o.m. Gy25) tar
 * vi även med EXPIRED-varianter så att t.ex. Historia hittas. Första
 * kombinationen som ger tolkbart innehåll vinner.
 */
const PARAM_FORSOK = [
  "timespan=CURRENT&reform=Gy25",
  "timespan=CURRENT&reform=Gy11",
  "timespan=CURRENT",
  "reform=Gy11",
  "timespan=EXPIRED&reform=Gy11",
];

/**
 * Hämtar ett ämne. Försöker flera param-kombinationer (Gy25 → Gy11 → utgångna)
 * och faller till sist tillbaka på medföljande exempeldata. Returnerar null om
 * inget finns.
 */
export async function hamtaAmne(
  subjectCode: string | undefined,
): Promise<AmnesGrundning | null> {
  if (!subjectCode) return null;

  const cacheNyckel = `subject-${subjectCode}`;
  const cachad = await cacheLas<AmnesGrundning>(cacheNyckel);
  if (cachad) return cachad;

  if (LIVE) {
    for (const params of PARAM_FORSOK) {
      const url =
        `${BAS}/v1/subjects/${encodeURIComponent(subjectCode)}?${params}`;
      const raw = await hamtaJson(url);
      const norm = normalisera(raw, subjectCode);
      if (norm) {
        await cacheSkriv(cacheNyckel, norm);
        return norm;
      }
    }
  }

  const fb = franSample(subjectCode);
  if (fb) await cacheSkriv(cacheNyckel, fb);
  return fb;
}

// ─────────────────── Grundning för generering ───────────────────

/** Väljer de mest relevanta karaktärsämnena per program (max några stycken). */
function valdaKaraktarsamnen(program: SkolProgram): Karaktarsamne[] {
  return program.karaktarsamnen.slice(0, 3);
}

/**
 * Bygger fullständig Skolverket-grundning för ankarämne + valda program.
 * Detta är det objekt som skickas in i AI-prompten.
 */
export async function byggGrundning(
  ankaramneKod: string,
  programIds: string[],
): Promise<Grundning> {
  const kallor = new Set<string>();

  const program = programIds
    .map((id) => programById(id))
    .filter((p): p is SkolProgram => Boolean(p));

  // Samla unika ämneskoder från valda programs karaktärsämnen.
  const programKoder: string[] = [];
  const sedda = new Set<string>();
  for (const p of program) {
    for (const ks of valdaKaraktarsamnen(p)) {
      if (!ks.subjectCode || sedda.has(ks.subjectCode)) continue;
      sedda.add(ks.subjectCode);
      programKoder.push(ks.subjectCode);
    }
  }

  // Hämta ankarämne + alla programämnen parallellt (snabbare, undviker
  // timeout på serverless-funktionen vid kall cache).
  const ankarKod = ankaramneByKod(ankaramneKod)?.kod ?? ankaramneKod;
  const [ankaramne, ...programResultat] = await Promise.all([
    hamtaAmne(ankarKod),
    ...programKoder.map((kod) => hamtaAmne(kod)),
  ]);

  if (ankaramne) kallor.add(kallaText(ankaramne.kalla));

  const programAmnen: AmnesGrundning[] = [];
  for (const amne of programResultat) {
    if (amne) {
      programAmnen.push(amne);
      kallor.add(kallaText(amne.kalla));
    }
  }

  const programKontext = program.map((p) => ({
    programId: p.id,
    namn: p.namn,
    karaktarsomraden: p.karaktarsomraden,
  }));
  if (programKontext.length) kallor.add(kallaText("statisk-kontext"));

  return {
    ankaramne,
    programAmnen,
    programKontext,
    kallor: Array.from(kallor),
  };
}

function kallaText(k: AmnesGrundning["kalla"]): string {
  switch (k) {
    case "skolverket-api":
      return "Skolverkets öppna data (Syllabus API, live)";
    case "exempeldata":
      return "Skolverket-baserad exempeldata (fallback)";
    case "statisk-kontext":
      return "Skolans programdata (karaktärsområden)";
  }
}
