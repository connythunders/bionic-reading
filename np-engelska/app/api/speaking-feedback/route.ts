import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { transcript, taskTitle, taskContext, taskType } = await request.json();

    if (!transcript || transcript.trim().length < 10) {
      return NextResponse.json(
        { error: "Transcript is too short to evaluate." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an experienced English language examiner for Swedish year 9 students (approximately 15 years old) taking Nationella Provet (National Test) in English. Your role is to provide encouraging, constructive, and specific feedback in Swedish on spoken English.

You evaluate speaking according to these Swedish national test criteria:
- Kommunikation (Communication): Does the student get their message across effectively?
- Flyt (Fluency): Is the speech reasonably smooth, or very hesitant?
- Ordförråd (Vocabulary): Does the student use appropriate and varied vocabulary?
- Grammatik (Grammar): Are structures reasonably accurate?
- Uttal (Pronunciation): Is the speech understandable?

Always be encouraging and supportive. Note that you are evaluating a transcript of spoken language - some informality and imperfection is expected and normal.

Respond in valid JSON with this structure:
{
  "overallScore": "A" | "B" | "C" | "D" | "E" | "F",
  "overallFeedback": "2-3 sentences in Swedish summarising overall performance",
  "strengths": ["2-4 specific strengths observed in the speech"],
  "improvements": ["2-3 specific, actionable suggestions in Swedish"],
  "vocabularySuggestions": ["2-3 alternative words or phrases they could use"],
  "grammarNote": "One brief grammar tip if relevant, otherwise null",
  "encouragement": "A short motivating message in Swedish",
  "cefrLevel": "A2" | "B1" | "B1+" | "B2"
}`;

    const userMessage = `Task: ${taskTitle}
Task type: ${taskType}
Context: ${taskContext}

Student's spoken response (transcript):
"${transcript}"

Please evaluate this response according to the Swedish national test criteria for year 9 English speaking.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Parse the JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from response");
    }

    const feedback = JSON.parse(jsonMatch[0]);
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Speaking feedback error:", error);
    return NextResponse.json(
      { error: "Failed to generate feedback. Please try again." },
      { status: 500 }
    );
  }
}
