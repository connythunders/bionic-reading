// Gemensamma typer för appen.

export type AmnesGrupp = "sprak" | "so" | "no" | "praktisk-estetiskt" | "ovriga";

export interface VavAmne {
  /** Stabilt internt id, t.ex. "HIS". */
  id: string;
  /** Kort kod som visas i gränssnittet. */
  kod: string;
  namn: string;
  grupp: AmnesGrupp;
  /** Ämneskod hos Skolverket (Syllabus API), t.ex. "GRGRHIS01". */
  subjectCode: string;
}

export interface AnkarAmne {
  /** Internt id/kod, t.ex. "HIS". Motsvarar ett VavAmne-id. */
  kod: string;
  namn: string;
}

export type Kalla = "skolverket-api" | "exempeldata";

export interface AmnesGrundning {
  subjectCode: string;
  subjectNamn: string;
  /** Centralt innehåll för årskurs 7–9, ett stycke per punkt. */
  centraltInnehall: string[];
  /** Betygskriterier (E och A) i slutet av årskurs 9. */
  betygskriterier: string[];
  kalla: Kalla;
}

export interface Grundning {
  ankaramne: AmnesGrundning | null;
  vavAmnen: AmnesGrundning[];
  kallor: string[];
}

export interface Arbetsomrade {
  titel: string;
  kort_beskrivning: string;
  berorda_amnen: string[];
  koppling_centralt_innehall: string;
  varfor_passar_eleverna: string;
  elevuppgift: string;
  bedomningside: string;
}

export interface GenereraRequest {
  ankaramne: string; // ämnes-id
  tema: string;
  amnen: string[]; // vav-ämnes-id:n
}

export interface GenereraSvar {
  arbetsomraden: Arbetsomrade[];
  kallor: string[];
  meta: {
    tema: string;
    ankaramne: string;
    amnen: string[];
  };
}
