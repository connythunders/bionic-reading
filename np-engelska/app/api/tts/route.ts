import { NextRequest, NextResponse } from "next/server";
import { harBudgetKvar, kapa, FULLT_SVAR } from "@/lib/skydd";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_FEMALE = process.env.ELEVENLABS_VOICE_FEMALE || "XB0fDUnXU5powFXDhCwa"; // Charlotte
const VOICE_MALE = process.env.ELEVENLABS_VOICE_MALE || "onwK4e9ZLuTAKqWW03F9"; // Daniel

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = kapa(body.text, 4000);
    const voice = body.voice === "male" ? "male" : "female";

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 503 }
      );
    }

    if (!harBudgetKvar("tts", Number(process.env.MAX_TTS_PER_DAY) || 600)) {
      return NextResponse.json(FULLT_SVAR, { status: 429 });
    }

    const voiceId = voice === "male" ? VOICE_MALE : VOICE_FEMALE;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("ElevenLabs error:", response.status, error);
      return NextResponse.json(
        { error: `TTS generation failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("TTS route error:", error);
    return NextResponse.json(
      { error: "Failed to generate audio. Please try again." },
      { status: 500 }
    );
  }
}
