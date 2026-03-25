import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, taskTitle, genre, wordCountMin, wordCountMax, assessmentCriteria } =
      await request.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Text is too short to evaluate." },
        { status: 400 }
      );
    }

    const wordCount = text.trim().split(/\s+/).length;

    const systemPrompt = `You are an experienced English language examiner for Swedish gymnasium students (17–19 years old) taking Nationella Provet (National Test) in Engelska 6. Your role is to give detailed, encouraging, and constructive written feedback in Swedish at B2-C1 CEFR level.

The Swedish national test for Gymnasiet (Gy11, Engelska 6) awards grades E, C, and A:
- E (Godkänd): Student writes a comprehensible text that fulfils the communicative purpose at B2 level; adequate structure; vocabulary and grammar mostly appropriate with some errors
- C (Väl godkänd): Student writes a well-organised and coherent text; varied and largely accurate language at B2-C1 level; good genre awareness and adaptation to purpose and audience
- A (Mycket väl godkänd): Student writes a fluent, sophisticated, well-structured text with C1-level vocabulary and grammar; precise genre adaptation; nuanced, persuasive or analytical content as appropriate

Always start by identifying what the student does well before pointing out weaknesses.

You evaluate writing according to Engelska 6 / Gy11 kunskapskrav:
- Innehåll (Content): Is the content relevant, developed, and appropriate for the task and genre? Is argumentation or analysis present where expected?
- Struktur (Structure): Is the text logically organised with clear paragraphs and cohesive devices appropriate for the genre?
- Språk (Language): Is the vocabulary varied and sophisticated? Are grammatical structures accurate, varied and appropriate for B2-C1 level?
- Anpassning (Register/Adaptation): Is the text appropriately adapted for the genre, purpose and audience at gymnasium level?

Always be constructive and encouraging. Note that this is a gymnasium student of English as a foreign language – some errors are expected and normal.

Respond in valid JSON with this structure:
{
  "overallScore": "E" | "C" | "A",
  "wordCountFeedback": "brief comment on text length",
  "overallFeedback": "2-3 sentences in Swedish summarising overall writing quality",
  "contentScore": "E" | "C" | "A",
  "contentFeedback": "specific feedback on content in Swedish",
  "structureScore": "E" | "C" | "A",
  "structureFeedback": "specific feedback on structure in Swedish",
  "languageScore": "E" | "C" | "A",
  "languageFeedback": "specific feedback on vocabulary and grammar in Swedish",
  "registerScore": "E" | "C" | "A",
  "registerFeedback": "specific feedback on register/style adaptation in Swedish",
  "corrections": [
    {
      "original": "exact phrase from student text",
      "suggested": "improved version",
      "explanation": "brief explanation in Swedish"
    }
  ],
  "strengths": ["2-4 specific things done well"],
  "improvements": ["2-3 prioritised improvements with specific examples"],
  "modelSentence": "One example sentence showing improved language use",
  "encouragement": "Motivating closing message in Swedish",
  "cefrLevel": "B1+" | "B2" | "B2+" | "C1"
}`;

    const userMessage = `Writing task: ${taskTitle}
Genre: ${genre}
Target word count: ${wordCountMin}–${wordCountMax} words
Actual word count: ${wordCount} words

Assessment criteria:
- Content: ${assessmentCriteria.content}
- Language: ${assessmentCriteria.language}
- Structure: ${assessmentCriteria.structure}

Student's writing:
---
${text}
---

Please provide detailed, constructive feedback according to Swedish national test criteria for Engelska 6 (Gymnasiet, Gy11) writing at B2-C1 level.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from response");
    }

    const feedback = JSON.parse(jsonMatch[0]);
    feedback.wordCount = wordCount;
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Writing feedback error:", error);
    return NextResponse.json(
      { error: "Failed to generate feedback. Please try again." },
      { status: 500 }
    );
  }
}
