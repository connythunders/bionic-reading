import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamName, answers } = body as {
      teamName: string;
      answers: Record<string, string>;
    };

    if (!teamName || !answers) {
      return NextResponse.json(
        { error: "Arbetslag och svar krävs" },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        teamName: teamName.trim(),
        answers: {
          create: Object.entries(answers)
            .filter(([, text]) => text.trim().length > 0)
            .map(([questionId, answerText]) => ({
              questionId,
              answerText: answerText.trim(),
            })),
        },
      },
      include: { answers: true },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Kunde inte spara svaren" },
      { status: 500 }
    );
  }
}
