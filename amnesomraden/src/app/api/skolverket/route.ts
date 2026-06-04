import { NextResponse } from "next/server";

import { byggGrundning } from "@/lib/skolverket";

export const runtime = "nodejs";
// Läroplansdata ändras sällan – låt plattformen cacha svaret en tid.
export const revalidate = 86400;

/**
 * GET /api/skolverket?ankaramne=HIS&program=BA,NB
 *
 * Hämtar och cachar relevant centralt innehåll/betygskriterier för de valda
 * programmens karaktärsämnen + lärarens ankarämne. Alla Skolverket-anrop sker
 * server-side (CORS antas blockera webbläsaren).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ankaramne = searchParams.get("ankaramne") || "HIS";
  const program = (searchParams.get("program") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const grundning = await byggGrundning(ankaramne, program);
    return NextResponse.json(grundning);
  } catch (err) {
    const meddelande =
      err instanceof Error ? err.message : "Okänt fel vid hämtning.";
    return NextResponse.json(
      { error: "Kunde inte hämta Skolverket-data.", detalj: meddelande },
      { status: 502 },
    );
  }
}
