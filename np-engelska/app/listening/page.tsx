"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Headphones,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Volume2,
} from "lucide-react";
import { listeningTracks } from "@/lib/content/listening";

export default function ListeningPage() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "listening" | "questions" | "results">("intro");
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<{ id: string; correct: boolean; userAnswer: string | number }[]>([]);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [hasListened, setHasListened] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioBlobUrl = useRef<string | null>(null);

  const track = listeningTracks[trackIndex];

  const loadAudio = async () => {
    setIsLoadingAudio(true);
    setAudioError(null);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: track.script,
          voice: track.voice,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to load audio");
      }

      const blob = await response.blob();
      if (audioBlobUrl.current) {
        URL.revokeObjectURL(audioBlobUrl.current);
      }
      audioBlobUrl.current = URL.createObjectURL(blob);

      const audio = new Audio(audioBlobUrl.current);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setHasListened(true);
        setPlayCount((c) => c + 1);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setAudioError("Kunde inte spela upp ljudet. Försök igen.");
      };

      audio.play();
      setIsPlaying(true);
      setHasListened(false);
      setPhase("listening");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message.includes("API key")) {
        setAudioError("ElevenLabs API-nyckel saknas. Lägg till ELEVENLABS_API_KEY i .env.local");
      } else {
        setAudioError(`Kunde inte generera ljud: ${message}`);
      }
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const replayAudio = async () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount((c) => c + 1);
    } else {
      await loadAudio();
    }
  };

  const submitAnswers = () => {
    const results = track.questions.map((q) => {
      if (q.type === "multiple-choice") {
        const userAnswer = answers[q.id] ?? -1;
        return { id: q.id, correct: userAnswer === q.correctAnswer, userAnswer };
      } else {
        return {
          id: q.id,
          correct: true,
          userAnswer: shortAnswers[q.id] || "",
        };
      }
    });
    setSubmitted(results);
    setPhase("results");
  };

  const reset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioBlobUrl.current) {
      URL.revokeObjectURL(audioBlobUrl.current);
      audioBlobUrl.current = null;
    }
    setPhase("intro");
    setAnswers({});
    setShortAnswers({});
    setSubmitted([]);
    setIsPlaying(false);
    setHasListened(false);
    setPlayCount(0);
    setAudioError(null);
  };

  const mcAnswered = track.questions
    .filter((q) => q.type === "multiple-choice")
    .every((q) => answers[q.id] !== undefined);

  const score = submitted.filter(
    (a) => a.correct && track.questions.find((q) => q.id === a.id)?.type === "multiple-choice"
  ).length;
  const mcTotal = track.questions.filter((q) => q.type === "multiple-choice").length;

  const levelColors: Record<string, string> = {
    B1: "bg-teal-100 text-teal-700",
    "B1-B2": "bg-cyan-100 text-cyan-700",
    B2: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Tillbaka
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-500 rounded-lg flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Listening – Delprov B2</span>
          </div>
          <div className="flex items-center gap-2">
            {listeningTracks.map((_, i) => (
              <button
                key={i}
                onClick={() => { reset(); setTrackIndex(i); }}
                className={`w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                  i === trackIndex
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Track info */}
        <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[track.level] || "bg-gray-100 text-gray-600"}`}>
              {track.level}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {track.genre}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">{track.title}</h1>
          <p className="text-gray-500 text-sm">{track.description}</p>
        </div>

        {/* Phase: Intro */}
        {phase === "intro" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Lyssningsinstruktioner</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Du får lyssna <strong>max 2 gånger</strong> på inspelningen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Lyssna <strong>utan</strong> att läsa frågorna första gången</span>
                </li>
                <li className="flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Läs frågorna och lyssna en gång till om det behövs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Rösten är brittisk engelska (genererad av ElevenLabs AI)</span>
                </li>
              </ul>

              {audioError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{audioError}</p>
                </div>
              )}
            </div>

            <button
              onClick={loadAudio}
              disabled={isLoadingAudio}
              className="w-full bg-teal-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 shadow-sm"
            >
              {isLoadingAudio ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Genererar brittisk röst...
                </>
              ) : (
                <>
                  <Headphones className="w-5 h-5" />
                  Spela upp inspelningen
                </>
              )}
            </button>
          </div>
        )}

        {/* Phase: Listening */}
        {phase === "listening" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-teal-200 shadow-sm p-8 text-center">
              <div className="mb-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg ${isPlaying ? "bg-teal-500" : "bg-gray-200"}`}>
                  <Headphones className={`w-10 h-10 ${isPlaying ? "text-white" : "text-gray-400"}`} />
                </div>
              </div>

              {isPlaying && (
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="wave-bar w-1.5 bg-teal-400 rounded-full"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}

              <p className="text-lg font-semibold text-gray-800 mb-1">
                {isPlaying ? "Spelar upp..." : hasListened ? "Inspelning klar" : "Pausad"}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                {track.genre} · {track.voice === "female" ? "Brittisk kvinnlig röst" : "Brittisk manlig röst"}
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Lyssnat {playCount} gång{playCount !== 1 ? "er" : ""} (max 2)
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={togglePlayPause}
                  className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-teal-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pausa" : "Spela"}
                </button>
                {playCount < 2 && hasListened && (
                  <button
                    onClick={replayAudio}
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Lyssna igen
                  </button>
                )}
              </div>
            </div>

            {hasListened && (
              <button
                onClick={() => setPhase("questions")}
                className="w-full bg-teal-600 text-white py-3 rounded-2xl font-semibold hover:bg-teal-700 transition-colors"
              >
                Gå till frågorna →
              </button>
            )}
          </div>
        )}

        {/* Phase: Questions */}
        {phase === "questions" && (
          <div className="space-y-4">
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 flex items-center justify-between">
              <p className="text-sm text-teal-700 font-medium">{track.title}</p>
              {playCount < 2 && (
                <button
                  onClick={replayAudio}
                  className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1.5 border border-teal-300 rounded-lg px-3 py-1.5 bg-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Lyssna igen ({2 - playCount} kvar)
                </button>
              )}
            </div>

            {track.questions.map((q, qi) => (
              <div key={q.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <p className="font-medium text-gray-900 text-sm mb-3">
                  {qi + 1}. {q.question}
                </p>

                {q.type === "multiple-choice" && q.options && (
                  <div className="space-y-2">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                          answers[q.id] === i
                            ? "border-teal-500 bg-teal-50 text-teal-800 font-medium"
                            : "border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "short-answer" && (
                  <textarea
                    value={shortAnswers[q.id] || ""}
                    onChange={(e) =>
                      setShortAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    placeholder="Skriv ditt svar..."
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
                  />
                )}
              </div>
            ))}

            {!mcAnswered && (
              <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 rounded-xl p-3 border border-amber-200">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Svara på alla flervalsfrågor för att skicka in.
              </div>
            )}

            <button
              onClick={submitAnswers}
              disabled={!mcAnswered}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              Skicka in svar
            </button>
          </div>
        )}

        {/* Phase: Results */}
        {phase === "results" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ditt resultat</h2>
                  <p className="text-gray-500 text-sm">{track.title}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-teal-600">{score}/{mcTotal}</div>
                  <p className="text-xs text-gray-400">rätta svar</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-teal-500 h-3 rounded-full"
                  style={{ width: `${(score / mcTotal) * 100}%` }}
                />
              </div>
            </div>

            {track.questions.map((q, qi) => {
              const ans = submitted.find((a) => a.id === q.id);
              const isShort = q.type === "short-answer";
              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-xl border shadow-sm p-5 ${
                    isShort
                      ? "border-teal-100"
                      : ans?.correct
                      ? "border-green-200"
                      : "border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {!isShort && (
                      <div className="mt-0.5 flex-shrink-0">
                        {ans?.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm mb-2">
                        {qi + 1}. {q.question}
                      </p>

                      {q.type === "multiple-choice" && q.options && (
                        <div className="space-y-1 mb-3">
                          {q.options.map((opt, oi) => (
                            <div
                              key={oi}
                              className={`text-xs px-3 py-2 rounded-lg ${
                                oi === q.correctAnswer
                                  ? "bg-green-100 text-green-800 font-medium"
                                  : oi === ans?.userAnswer && !ans.correct
                                  ? "bg-red-100 text-red-700 line-through"
                                  : "text-gray-500"
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      {isShort && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Ditt svar:</p>
                          <p className="text-sm text-gray-700 italic bg-gray-50 rounded-lg p-2">
                            {(ans?.userAnswer as string) || "(inget svar)"}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 mb-1">Modellsvar:</p>
                          <p className="text-sm text-green-700 bg-green-50 rounded-lg p-2">
                            {q.correctAnswer as string}
                          </p>
                        </div>
                      )}

                      <div className="bg-teal-50 rounded-lg p-2.5 text-xs text-teal-700">
                        <strong>Förklaring:</strong> {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Försök igen
              </button>
              {trackIndex < listeningTracks.length - 1 && (
                <button
                  onClick={() => { reset(); setTrackIndex((i) => i + 1); }}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  Nästa spår <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
