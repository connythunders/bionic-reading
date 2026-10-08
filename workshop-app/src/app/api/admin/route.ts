import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { timingSafeEqual } from "crypto";

// Inget förvalt lösenord: ADMIN_PASSWORD måste sättas i miljön (.env).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function passwordMatches(input: unknown): boolean {
  if (!ADMIN_PASSWORD || typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(ADMIN_PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    if (!ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD saknas i miljön. Adminvyn är avstängd.");
      return NextResponse.json(
        { error: "Adminvyn är inte konfigurerad" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { password } = body as { password: string };

    if (!passwordMatches(password)) {
      return NextResponse.json(
        { error: "Fel lösenord" },
        { status: 401 }
      );
    }

    const submissions = await prisma.submission.findMany({
      include: { answers: true },
      orderBy: [{ teamName: "asc" }, { createdAt: "asc" }],
    });

    // Group by team name
    const grouped: Record<
      string,
      Array<{
        id: number;
        createdAt: string;
        answers: Array<{ questionId: string; answerText: string }>;
      }>
    > = {};

    for (const sub of submissions) {
      if (!grouped[sub.teamName]) {
        grouped[sub.teamName] = [];
      }
      grouped[sub.teamName].push({
        id: sub.id,
        createdAt: sub.createdAt.toISOString(),
        answers: sub.answers.map((a) => ({
          questionId: a.questionId,
          answerText: a.answerText,
        })),
      });
    }

    return NextResponse.json({ teams: grouped });
  } catch (error) {
    console.error("Admin error:", error);
    return NextResponse.json(
      { error: "Kunde inte hämta data" },
      { status: 500 }
    );
  }
}
