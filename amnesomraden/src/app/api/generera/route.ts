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
    // Plocka ut ev. HTTP-status/namn/underliggande orsak för felsökning.
    const e = err as { status?: number; name?: string; cause?: unknown };
    const orsak =
      e.cause instanceof Error
        ? e.cause.message
        : e.cause
          ? String(e.cause)
          : null;
    // Maskera ev. API-nyckel innan felet loggas eller returneras, så att en
    // felaktigt inklistrad nyckel aldrig läcker via svaret.
    const redacta = (s: string) =>
      s.replace(/sk-ant-[A-Za-z0-9_-]+/g, "sk-ant-***MASKERAD***");
    const detalj = redacta(
      [
        e.name,
        e.status ? `status ${e.status}` : null,
        meddelande,
        orsak ? `orsak: ${orsak}` : null,
      ]
        .filter(Boolean)
        .join(" – "),
    );
    console.error("[/api/generera] fel:", detalj);
    const status = meddelande.includes("ANTHROPIC_API_KEY") ? 500 : 502;
    return NextResponse.json(
      { error: "Kunde inte generera arbetsområden.", detalj },
      { status },
    );
  }
}
