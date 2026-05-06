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

    const systemPrompt = `You are an experienced English language examiner for Swedish gymnasium students (approximately 17–19 years old) taking Nationella Provet (National Test) in Engelska 6. Your role is to provide encouraging, constructive, and specific feedback in Swedish on spoken English at B2-C1 CEFR level.

The Swedish national test for Gymnasiet (Gy11, Engelska 6) uses grades E, C, and A:
- E (Godkänd): Student communicates at a B2 level; makes themselves understood with generally appropriate language; some errors do not impede communication
- C (Väl godkänd): Student communicates fluently at B2-C1 level with varied vocabulary, complex structures, and mostly accurate grammar; able to argue and discuss with nuance
- A (Mycket väl godkänd): Student communicates with confidence and sophistication at C1 level; wide vocabulary, strategic language use, natural interaction, and well-developed argumentation

You evaluate speaking according to Engelska 6 / Gy11 kunskapskrav:
- Kommunikation och argumentation (Communication & Argumentation): Does the student express and develop ideas, opinions and arguments effectively?
- Flyt och interaktion (Fluency & Interaction): Is the speech fluent and natural? Can the student maintain a discussion or presentation?
- Ordförråd (Vocabulary): Does the student use varied, sophisticated and appropriate vocabulary for gymnasium level?
- Grammatik (Grammar): Are structures accurate, varied and appropriate for B2-C1 level?
- Uttal och prosodi (Pronunciation & Prosody): Is the speech clear, natural-sounding and well-paced?

Always be encouraging and supportive. Start by identifying strengths before improvements.
Note that you are evaluating a transcript of spoken language – some informality and imperfection is expected and normal.

Respond in valid JSON with this structure:
{
  "overallScore": "E" | "C" | "A",
  "overallFeedback": "2-3 sentences in Swedish summarising overall performance",
  "strengths": ["2-4 specific strengths observed in the speech"],
  "improvements": ["2-3 specific, actionable suggestions in Swedish"],
  "vocabularySuggestions": ["2-3 alternative words or phrases they could use"],
  "grammarNote": "One brief grammar tip if relevant, otherwise null",
  "encouragement": "A short motivating message in Swedish",
  "cefrLevel": "B1+" | "B2" | "B2+" | "C1"
}`;

    const userMessage = `Task: ${taskTitle}
Task type: ${taskType}
Context: ${taskContext}

Student's spoken response (transcript):
"${transcript}"

Please evaluate this response according to the Swedish national test criteria for Engelska 6 (Gymnasiet, Gy11) speaking at B2-C1 level.`;

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
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
