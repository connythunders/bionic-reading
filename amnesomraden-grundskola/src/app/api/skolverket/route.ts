import { NextResponse } from "next/server";

import { byggGrundning } from "@/lib/skolverket";

export const runtime = "nodejs";
// Läroplansdata ändras sällan – låt plattformen cacha svaret en tid.
export const revalidate = 86400;

/**
 * GET /api/skolverket?ankaramne=SVE&amnen=HIS,SAM
 *
 * Hämtar och cachar relevant centralt innehåll/betygskriterier (Lgr22, åk
 * 7-9) för lärarens ankarämne och de valda ämnena. Alla Skolverket-anrop sker
 * server-side (CORS antas blockera webbläsaren).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ankaramne = searchParams.get("ankaramne") || "SVE";
  const amnen = (searchParams.get("amnen") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const grundning = await byggGrundning(ankaramne, amnen);
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
