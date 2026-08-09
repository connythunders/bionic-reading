import type { AmnesGrupp, AnkarAmne, VavAmne } from "./types";

/**
 * Grundskolans (åk 7–9) kärnämnen enligt Lgr22. `subjectCode` är Skolverkets
 * ämneskod i Syllabus API (schoolType GR) och används för att grunda
 * förslagen i det centrala innehållet för årskurs 7–9.
 */
export const VAV_AMNEN: VavAmne[] = [
  // ───────────────────────────── Språk ─────────────────────────────
  { id: "SVE", kod: "SVE", namn: "Svenska", grupp: "sprak", subjectCode: "GRGRSVE01" },
  { id: "ENG", kod: "ENG", namn: "Engelska", grupp: "sprak", subjectCode: "GRGRENG01" },
  { id: "MSP", kod: "M.SPR", namn: "Moderna språk", grupp: "sprak", subjectCode: "GRGRMSP01" },

  // ────────────────────── SO – samhällsorienterande ──────────────────────
  { id: "HIS", kod: "HIS", namn: "Historia", grupp: "so", subjectCode: "GRGRHIS01" },
  { id: "SAM", kod: "SAM", namn: "Samhällskunskap", grupp: "so", subjectCode: "GRGRSAM01" },
  { id: "REL", kod: "REL", namn: "Religionskunskap", grupp: "so", subjectCode: "GRGRREL01" },
  { id: "GEO", kod: "GEO", namn: "Geografi", grupp: "so", subjectCode: "GRGRGEO01" },

  // ────────────────────── NO – naturorienterande ──────────────────────
  { id: "BIO", kod: "BIO", namn: "Biologi", grupp: "no", subjectCode: "GRGRBIO01" },
  { id: "FYS", kod: "FYS", namn: "Fysik", grupp: "no", subjectCode: "GRGRFYS01" },
  { id: "KEM", kod: "KEM", namn: "Kemi", grupp: "no", subjectCode: "GRGRKEM01" },

  // ────────────────────── Praktisk-estetiska ämnen ──────────────────────
  { id: "BIL", kod: "BILD", namn: "Bild", grupp: "praktisk-estetiskt", subjectCode: "GRGRBIL01" },
  { id: "MUS", kod: "MUS", namn: "Musik", grupp: "praktisk-estetiskt", subjectCode: "GRGRMUS01" },
  { id: "SLJ", kod: "SLÖJD", namn: "Slöjd", grupp: "praktisk-estetiskt", subjectCode: "GRGRSLJ01" },
  { id: "IDR", kod: "IDH", namn: "Idrott och hälsa", grupp: "praktisk-estetiskt", subjectCode: "GRGRIDR01" },
  { id: "HKK", kod: "HKK", namn: "Hem- och konsumentkunskap", grupp: "praktisk-estetiskt", subjectCode: "GRGRHKK01" },

  // ───────────────────────────── Övriga ─────────────────────────────
  { id: "MAT", kod: "MAT", namn: "Matematik", grupp: "ovriga", subjectCode: "GRGRMAT01" },
  { id: "TEK", kod: "TEK", namn: "Teknik", grupp: "ovriga", subjectCode: "GRGRTEK01" },
];

/** Ämnen läraren kan utgå ifrån som ankarämne. Default: Svenska. */
export const ANKARAMNEN: AnkarAmne[] = VAV_AMNEN.map((a) => ({
  kod: a.id,
  namn: a.namn,
}));

export const DEFAULT_ANKARAMNE = "SVE";

export const GRUPP_RUBRIK: Record<AmnesGrupp, string> = {
  sprak: "Språk",
  so: "SO – samhällsorienterande ämnen",
  no: "NO – naturorienterande ämnen",
  "praktisk-estetiskt": "Praktisk-estetiska ämnen",
  ovriga: "Övriga ämnen",
};

export const GRUPP_ORDNING: AmnesGrupp[] = [
  "sprak",
  "so",
  "no",
  "praktisk-estetiskt",
  "ovriga",
];

export function vavAmneById(id: string): VavAmne | undefined {
  return VAV_AMNEN.find((a) => a.id === id);
}

export function ankaramneByKod(kod: string): AnkarAmne | undefined {
  return ANKARAMNEN.find((a) => a.kod === kod);
}
