// Gemensamma typer för appen.

export type ProgramGrupp =
  | "yrkesprogram"
  | "hogskoleforberedande"
  | "anpassad"
  | "ovriga";

export interface Karaktarsamne {
  /** Visningsnamn, t.ex. "Husbyggnad". */
  namn: string;
  /**
   * Best-effort ämneskod hos Skolverket (Syllabus API). Används för att
   * grunda förslagen i centralt innehåll. Om koden saknas eller inte kan
   * hämtas faller appen tillbaka på karaktärsområdes-texten.
   */
  subjectCode?: string;
}

export interface SkolProgram {
  /** Stabilt internt id, t.ex. "BA". */
  id: string;
  /** Kort kod som visas i gränssnittet. */
  kod: string;
  namn: string;
  grupp: ProgramGrupp;
  inriktningar?: string[];
  /** Parentestexten från kravet – yrkeskontext för AI-grundningen. */
  karaktarsomraden: string[];
  /** Karaktärsämnen för Skolverket-grundning. */
  karaktarsamnen: Karaktarsamne[];
  /** Best-effort programkod hos Skolverket. */
  skolverketProgramCode?: string;
}

export interface AnkarAmne {
  /** Ämneskod hos Skolverket, t.ex. "HIS". */
  kod: string;
  namn: string;
  /** Hint om vanliga kurser, visas inte men kan stötta prompten. */
  exempelkurser?: string[];
}

export type Reform = "Gy25" | "Gy11" | "okand";
export type Kalla = "skolverket-api" | "exempeldata" | "statisk-kontext";

export interface AmnesGrundning {
  subjectCode: string;
  subjectNamn: string;
  kurser: { kod: string; namn: string }[];
  centraltInnehall: string[];
  betygskriterier: string[];
  reform: Reform;
  kalla: Kalla;
}

export interface ProgramKontext {
  programId: string;
  namn: string;
  karaktarsomraden: string[];
}

export interface Grundning {
  ankaramne: AmnesGrundning | null;
  programAmnen: AmnesGrundning[];
  programKontext: ProgramKontext[];
  kallor: string[];
}

export interface Arbetsomrade {
  titel: string;
  kort_beskrivning: string;
  amnen_kurser: string[];
  koppling_centralt_innehall: string;
  varfor_passar_eleverna: string;
  elevuppgift: string;
  bedomningside: string;
}

export interface GenereraRequest {
  ankaramne: string; // ämneskod
  tema: string;
  program: string[]; // program-id:n
}

export interface GenereraSvar {
  arbetsomraden: Arbetsomrade[];
  kallor: string[];
  meta: {
    tema: string;
    ankaramne: string;
    program: string[];
  };
}
