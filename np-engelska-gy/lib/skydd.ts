// Enkelt skydd mot att de öppna API-vägarna missbrukas och drar kostnad
// på skolans API-nycklar. Räknaren lever i minnet per serverinstans och
// nollställs vid omstart, så det är ett grovt skydd och ingen exakt gräns.
const raknare: Record<string, { datum: string; antal: number }> = {};

export function harBudgetKvar(namn: string, maxPerDag: number): boolean {
  const idag = new Date().toDateString();
  const r = raknare[namn];
  if (!r || r.datum !== idag) {
    raknare[namn] = { datum: idag, antal: 1 };
    return true;
  }
  if (r.antal >= maxPerDag) return false;
  r.antal++;
  return true;
}

// Säkerställer att ett fält är en sträng och kapar orimligt långa värden.
export function kapa(varde: unknown, maxTecken: number): string {
  return typeof varde === "string" ? varde.slice(0, maxTecken) : "";
}

export const FULLT_SVAR = {
  error: "Tjänsten har använts väldigt mycket i dag. Försök igen i morgon eller säg till din lärare.",
};
