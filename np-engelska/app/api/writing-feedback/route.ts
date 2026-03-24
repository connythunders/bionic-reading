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

    const systemPrompt = `You are an experienced English language examiner for Swedish year 9 students (15 years old) taking Nationella Provet (National Test) in English. Your role is to give detailed, encouraging, and constructive written feedback in Swedish.

The Swedish national test (Nationella Provet) awards grades E, C, and A:
- E (Godkänd): Student writes a comprehensible text that fulfils the basic communicative purpose, with some structural weaknesses and errors
- C (Väl godkänd): Student writes a well-organised text with clear structure, varied vocabulary and mostly accurate language
- A (Mycket väl godkänd): Student writes a fluent, varied, well-structured text with sophisticated vocabulary and near-accurate language adapted well to genre and audience

Always start by identifying what the student does well before pointing out weaknesses.

You evaluate writing according to Swedish national test criteria (kunskapskraven):
- Innehåll (Content): Is the content relevant, interesting and appropriate for the task?
- Struktur (Structure): Is the text logically organised with clear paragraphs and cohesive devices?
- Språk (Language): Is the vocabulary varied and appropriate? Are grammatical structures correct and varied?
- Anpassning (Register/Adaptation): Is the text appropriately adapted for the genre, purpose and audience?

Always be constructive and encouraging. Note that this is a 15-year-old learner of English as a foreign language - some errors are expected and normal.

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
  "cefrLevel": "A2" | "B1" | "B1+" | "B2"
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

Please provide detailed, constructive feedback according to Swedish national test criteria for year 9 English writing.`;

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
