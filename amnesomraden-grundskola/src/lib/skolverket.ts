import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import sample from "@/data/skolverket-sample.json";
import { ankaramneByKod, vavAmneById } from "./amnen";
import type { AmnesGrundning, Grundning, Kalla } from "./types";

/**
 * Klient mot Skolverkets Syllabus API för grundskolans ämnen (Lgr22).
 *
 * Bas:   https://api.skolverket.se/syllabus
 * Ämne:  GET /v1/subjects/{code}?timespan=CURRENT
 *
 * Grundskoleämnen (schoolType GR) saknar kurser – det centrala innehållet och
 * betygskriterierna är i stället indelade per stadium ("year": "1-3", "4-6",
 * "7-9"). Vi filtrerar alltid till årskurs 7-9.
 *
 * Öppen data, ingen API-nyckel. CORS antas blockera webbläsaren – därför
 * anropas API:et endast server-side. Data ändras sällan, så vi cachar.
 */

const BAS = "https://api.skolverket.se/syllabus";
const TIMEOUT_MS = 6000;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 1 vecka
const LIVE = process.env.SKOLVERKET_LIVE !== "0";
const MALSTADIUM_INNEHALL = "7-9";
const MALSTADIUM_KRITERIER = "9";

type SampleSubjects = Record<
  string,
  {
    subjectCode: string;
    subjectNamn: string;
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
  return path.join(os.tmpdir(), `skolverket-gr-${safe}.json`);
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

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Bryter ut varje <li>-punkt ur en HTML-blob. Faller tillbaka på hela texten. */
function liPunkter(html: string): string[] {
  const traff = html.match(/<li>([\s\S]*?)<\/li>/g);
  if (!traff || traff.length === 0) {
    const t = stripHtml(html);
    return t ? [t] : [];
  }
  return traff
    .map((li) => stripHtml(li.replace(/<\/?li>/g, "")))
    .filter(Boolean);
}

function avkorta(arr: string[], max: number): string[] {
  const unika = Array.from(new Set(arr.filter(Boolean)));
  return unika.slice(0, max);
}

/**
 * Plockar ut centralt innehåll (årskurs 7-9) och betygskriterier (E och A,
 * slutet av årskurs 9) ur ett subject-svar på ett defensivt sätt.
 */
function normalisera(
  raw: unknown,
  subjectCode: string,
): AmnesGrundning | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const subject = (obj.subject ?? obj) as Record<string, unknown>;

  const namn =
    (typeof subject.name === "string" && subject.name) ||
    (typeof subject.title === "string" && subject.title) ||
    subjectCode;

  const centraltInnehall: string[] = [];
  const centralContents = subject.centralContents;
  if (Array.isArray(centralContents)) {
    for (const block of centralContents) {
      if (!block || typeof block !== "object") continue;
      const b = block as Record<string, unknown>;
      if (b.year !== MALSTADIUM_INNEHALL) continue;
      if (typeof b.text === "string") centraltInnehall.push(...liPunkter(b.text));
    }
  }

  const betygskriterier: string[] = [];
  const knowledgeRequirements = subject.knowledgeRequirements;
  if (Array.isArray(knowledgeRequirements)) {
    for (const krav of knowledgeRequirements) {
      if (!krav || typeof krav !== "object") continue;
      const k = krav as Record<string, unknown>;
      if (k.year !== MALSTADIUM_KRITERIER) continue;
      if (k.gradeStep !== "E" && k.gradeStep !== "A") continue;
      if (typeof k.text === "string") {
        const t = stripHtml(k.text);
        if (t) betygskriterier.push(t);
      }
    }
  }

  if (centraltInnehall.length === 0 && betygskriterier.length === 0) {
    return null;
  }

  return {
    subjectCode,
    subjectNamn: namn,
    centraltInnehall: avkorta(centraltInnehall, 8),
    betygskriterier: avkorta(betygskriterier, 2),
    kalla: "skolverket-api",
  };
}

// ───────────────────── Ämne (med fallback) ─────────────────────

function franSample(id: string): AmnesGrundning | null {
  const s = SAMPLE[id];
  if (!s) return null;
  return {
    subjectCode: s.subjectCode,
    subjectNamn: s.subjectNamn,
    centraltInnehall: s.centraltInnehall,
    betygskriterier: s.betygskriterier,
    kalla: "exempeldata",
  };
}

/**
 * Hämtar ett ämne (grundskolans centrala innehåll/betygskriterier för åk
 * 7-9). Faller tillbaka på medföljande exempeldata om live-API:et inte kan
 * nås eller inte ger tolkbart svar. Returnerar null om inget finns.
 */
export async function hamtaAmne(
  amneId: string | undefined,
): Promise<AmnesGrundning | null> {
  if (!amneId) return null;
  const amne = vavAmneById(amneId);
  const subjectCode = amne?.subjectCode;
  if (!subjectCode) return franSample(amneId);

  const cacheNyckel = `subject-${subjectCode}`;
  const cachad = await cacheLas<AmnesGrundning>(cacheNyckel);
  if (cachad) return cachad;

  if (LIVE) {
    const url = `${BAS}/v1/subjects/${encodeURIComponent(subjectCode)}?timespan=CURRENT`;
    const raw = await hamtaJson(url);
    const norm = normalisera(raw, subjectCode);
    if (norm) {
      await cacheSkriv(cacheNyckel, norm);
      return norm;
    }
  }

  const fb = franSample(amneId);
  if (fb) await cacheSkriv(cacheNyckel, fb);
  return fb;
}

// ─────────────────── Grundning för generering ───────────────────

/**
 * Bygger fullständig Skolverket-grundning för ankarämne + valda
 * väv-in-ämnen. Detta är det objekt som skickas in i AI-prompten.
 */
export async function byggGrundning(
  ankaramneKod: string,
  amnesIds: string[],
): Promise<Grundning> {
  const kallor = new Set<string>();

  const ankarKod = ankaramneByKod(ankaramneKod)?.kod ?? ankaramneKod;
  const unikaAmnesIds = Array.from(new Set(amnesIds));

  // Hämta ankarämne + alla valda ämnen parallellt (snabbare, undviker
  // timeout på serverless-funktionen vid kall cache).
  const [ankaramne, ...amnesResultat] = await Promise.all([
    hamtaAmne(ankarKod),
    ...unikaAmnesIds.map((id) => hamtaAmne(id)),
  ]);

  if (ankaramne) kallor.add(kallaText(ankaramne.kalla));

  const vavAmnen: AmnesGrundning[] = [];
  for (const amne of amnesResultat) {
    if (amne) {
      vavAmnen.push(amne);
      kallor.add(kallaText(amne.kalla));
    }
  }

  return {
    ankaramne,
    vavAmnen,
    kallor: Array.from(kallor),
  };
}

function kallaText(k: Kalla): string {
  switch (k) {
    case "skolverket-api":
      return "Skolverkets öppna data (Syllabus API, live)";
    case "exempeldata":
      return "Skolverket-baserad exempeldata (fallback)";
  }
}
