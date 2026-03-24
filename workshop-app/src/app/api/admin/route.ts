import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "workshop2025";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (password !== ADMIN_PASSWORD) {
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
