import { NextResponse } from "next/server";

import { generera } from "@/lib/generera";
import type { GenereraRequest, GenereraSvar } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/generera
 * Body: { ankaramne: string, tema: string, program: string[] }
 *
 * Bygger Skolverket-grundning, anropar Anthropic och returnerar strukturerad
 * JSON med 3–4 ämnesövergripande arbetsområden.
 */
export async function POST(request: Request) {
  let body: GenereraRequest;
  try {
    body = (await request.json()) as GenereraRequest;
  } catch {
    return NextResponse.json(
      { error: "Felaktig JSON i förfrågan." },
      { status: 400 },
    );
  }

  const ankaramne = (body.ankaramne || "").trim();
  const tema = (body.tema || "").trim();
  const program = Array.isArray(body.program)
    ? body.program.filter((p) => typeof p === "string" && p.trim())
    : [];

  if (!tema) {
    return NextResponse.json(
      { error: "Ange ett tema." },
      { status: 400 },
    );
  }
  if (program.length === 0) {
    return NextResponse.json(
      { error: "Välj minst ett program." },
      { status: 400 },
    );
  }

  try {
    const { arbetsomraden, kallor } = await generera(ankaramne, tema, program);
    const svar: GenereraSvar = {
      arbetsomraden,
      kallor,
      meta: { tema, ankaramne, program },
    };
    return NextResponse.json(svar);
  } catch (err) {
    const meddelande =
      err instanceof Error ? err.message : "Okänt fel vid generering.";
    const status = meddelande.includes("ANTHROPIC_API_KEY") ? 500 : 502;
    return NextResponse.json(
      { error: "Kunde inte generera arbetsområden.", detalj: meddelande },
      { status },
    );
  }
}
