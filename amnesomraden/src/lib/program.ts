import type { AnkarAmne, SkolProgram } from "./types";

/**
 * Stiernhööksgymnasiets egna program. Programväljaren förifylls ENBART med
 * dessa – inga andra av Sveriges program ska visas.
 *
 * Notera: `subjectCode`/`skolverketProgramCode` är best-effort-koder för att
 * grunda förslagen i Skolverkets centrala innehåll. Om en kod är fel eller
 * data saknas faller appen tillbaka på `karaktarsomraden`-texten, så att
 * AI-prompten ändå får rätt yrkeskontext.
 */
export const PROGRAM: SkolProgram[] = [
  // ───────────────────────── Yrkesprogram ─────────────────────────
  {
    id: "BA",
    kod: "BA",
    namn: "Bygg- och anläggningsprogrammet",
    grupp: "yrkesprogram",
    skolverketProgramCode: "BA",
    karaktarsomraden: ["husbyggnad", "anläggning", "mark", "måleri", "plåt"],
    karaktarsamnen: [
      { namn: "Bygg och anläggning", subjectCode: "BYG" },
      { namn: "Husbyggnad", subjectCode: "HUS" },
      { namn: "Anläggning", subjectCode: "ANL" },
      { namn: "Måleri", subjectCode: "MÅL" },
      { namn: "Plåtslageri", subjectCode: "PLÅ" },
      { namn: "Mark och anläggning", subjectCode: "MotR" },
    ],
  },
  {
    id: "EE",
    kod: "EE",
    namn: "El- och energiprogrammet",
    grupp: "yrkesprogram",
    skolverketProgramCode: "EE",
    karaktarsomraden: [
      "elteknik",
      "automation",
      "energiteknik",
      "dator- och kommunikationsteknik",
    ],
    karaktarsamnen: [
      { namn: "Elektroteknik", subjectCode: "ELL" },
      { namn: "Automationsteknik", subjectCode: "AUUT" },
      { namn: "Energiteknik", subjectCode: "ENMENG" },
      { namn: "Dator- och kommunikationsteknik", subjectCode: "DAT" },
    ],
  },
  {
    id: "NB",
    kod: "NB",
    namn: "Naturbruksprogrammet",
    grupp: "yrkesprogram",
    skolverketProgramCode: "NB",
    inriktningar: ["Djur", "Häst", "Lantbruk", "Naturvetenskap"],
    karaktarsomraden: [
      "djurhållning",
      "växtodling",
      "lantbruksmaskiner",
      "biologi",
      "skog och mark",
    ],
    karaktarsamnen: [
      { namn: "Naturbruk", subjectCode: "NABNAU0" },
      { namn: "Djur", subjectCode: "DJU" },
      { namn: "Hästkunskap", subjectCode: "HÄS" },
      { namn: "Lantbruksdjur", subjectCode: "LAN" },
      { namn: "Växtodling", subjectCode: "VÄX" },
      { namn: "Lantbruksmaskiner", subjectCode: "LAB" },
      { namn: "Biologi", subjectCode: "BIO" },
      { namn: "Skogsbruk", subjectCode: "SKG" },
    ],
  },

  // ─────────────────── Högskoleförberedande ───────────────────
  {
    id: "NA",
    kod: "NA",
    namn: "Naturvetenskapsprogrammet",
    grupp: "hogskoleforberedande",
    skolverketProgramCode: "NA",
    karaktarsomraden: ["biologi", "fysik", "kemi", "matematik"],
    karaktarsamnen: [
      { namn: "Biologi", subjectCode: "BIO" },
      { namn: "Fysik", subjectCode: "FYS" },
      { namn: "Kemi", subjectCode: "KEM" },
      { namn: "Matematik", subjectCode: "MAT" },
    ],
  },
  {
    id: "SA",
    kod: "SA",
    namn: "Samhällsvetenskapsprogrammet",
    grupp: "hogskoleforberedande",
    skolverketProgramCode: "SA",
    karaktarsomraden: [
      "samhällskunskap",
      "humaniora",
      "medier och kommunikation",
      "beteendevetenskap",
    ],
    karaktarsamnen: [
      { namn: "Samhällskunskap", subjectCode: "SAM" },
      { namn: "Psykologi", subjectCode: "PSK" },
      { namn: "Sociologi", subjectCode: "SCI" },
      { namn: "Geografi", subjectCode: "GEO" },
    ],
  },
  {
    id: "EK",
    kod: "EK",
    namn: "Ekonomiprogrammet",
    grupp: "hogskoleforberedande",
    skolverketProgramCode: "EK",
    karaktarsomraden: ["ekonomi", "företagande", "juridik"],
    karaktarsamnen: [
      { namn: "Företagsekonomi", subjectCode: "FÖR" },
      { namn: "Juridik", subjectCode: "JUR" },
      { namn: "Entreprenörskap", subjectCode: "ENR" },
      { namn: "Samhällskunskap", subjectCode: "SAM" },
    ],
  },

  // ─────────────────── Anpassad gymnasieskola ───────────────────
  {
    id: "AGFAB",
    kod: "FAB",
    namn: "Programmet för fastighet, anläggning och byggnation",
    grupp: "anpassad",
    karaktarsomraden: [
      "fastighetsskötsel",
      "anläggning",
      "byggnation",
      "mark",
    ],
    karaktarsamnen: [
      { namn: "Bygg och anläggning" },
      { namn: "Fastighetsskötsel" },
      { namn: "Mark och anläggning" },
    ],
  },
  {
    id: "AGSMD",
    kod: "SMD",
    namn: "Programmet för skog, mark och djur",
    grupp: "anpassad",
    karaktarsomraden: ["skog", "mark", "djurhållning", "växtodling"],
    karaktarsamnen: [
      { namn: "Naturbruk" },
      { namn: "Djur" },
      { namn: "Skogsbruk" },
      { namn: "Växtodling" },
    ],
  },

  // ───────────────────────── Övriga ─────────────────────────
  {
    id: "BF",
    kod: "BF",
    namn: "Barn- och fritidsprogrammet (lärling)",
    grupp: "ovriga",
    skolverketProgramCode: "BF",
    karaktarsomraden: ["pedagogik", "barn och fritid", "bemötande"],
    karaktarsamnen: [
      { namn: "Pedagogiskt arbete", subjectCode: "PEG" },
      { namn: "Barn- och fritidskunskap" },
    ],
  },
  {
    id: "VO",
    kod: "VO",
    namn: "Vård- och omsorgsprogrammet (lärling)",
    grupp: "ovriga",
    skolverketProgramCode: "VO",
    karaktarsomraden: ["vård", "omsorg", "hälsa", "bemötande"],
    karaktarsamnen: [
      { namn: "Vård och omsorg", subjectCode: "VÅD" },
      { namn: "Hälsa", subjectCode: "HÄL" },
    ],
  },
  {
    id: "IM",
    kod: "IM",
    namn: "Introduktionsprogram",
    grupp: "ovriga",
    skolverketProgramCode: "IM",
    karaktarsomraden: [
      "individuellt anpassat",
      "grundskoleämnen",
      "yrkesintroduktion",
    ],
    karaktarsamnen: [{ namn: "Svenska som andraspråk", subjectCode: "SVA" }],
  },
];

/** Ankarämnen läraren kan utgå ifrån. Default: Historia. */
export const ANKARAMNEN: AnkarAmne[] = [
  { kod: "HIS", namn: "Historia", exempelkurser: ["Historia 1a1", "Historia 1b"] },
  { kod: "SVE", namn: "Svenska", exempelkurser: ["Svenska 1", "Svenska 2"] },
  { kod: "SAM", namn: "Samhällskunskap", exempelkurser: ["Samhällskunskap 1a1"] },
  { kod: "REL", namn: "Religionskunskap", exempelkurser: ["Religionskunskap 1"] },
  { kod: "GEO", namn: "Geografi", exempelkurser: ["Geografi 1"] },
  { kod: "ENG", namn: "Engelska", exempelkurser: ["Engelska 5"] },
];

export const DEFAULT_ANKARAMNE = "HIS";

export const GRUPP_RUBRIK: Record<SkolProgram["grupp"], string> = {
  yrkesprogram: "Yrkesprogram",
  hogskoleforberedande: "Högskoleförberedande",
  anpassad: "Anpassad gymnasieskola",
  ovriga: "Övriga (lärling och introduktionsprogram)",
};

export const GRUPP_ORDNING: SkolProgram["grupp"][] = [
  "yrkesprogram",
  "hogskoleforberedande",
  "anpassad",
  "ovriga",
];

export function programById(id: string): SkolProgram | undefined {
  return PROGRAM.find((p) => p.id === id);
}

export function ankaramneByKod(kod: string): AnkarAmne | undefined {
  return ANKARAMNEN.find((a) => a.kod === kod);
}
