"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PenLine,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  RotateCcw,
  BookOpen,
  Star,
  AlertCircle,
} from "lucide-react";
import { writingTasks } from "@/lib/content/writing";

interface ScoreBlock {
  score: string;
  feedback: string;
}

interface Correction {
  original: string;
  suggested: string;
  explanation: string;
}

interface WritingFeedback {
  overallScore: string;
  wordCountFeedback: string;
  wordCount: number;
  overallFeedback: string;
  contentScore: string;
  contentFeedback: string;
  structureScore: string;
  structureFeedback: string;
  languageScore: string;
  languageFeedback: string;
  registerScore: string;
  registerFeedback: string;
  corrections: Correction[];
  strengths: string[];
  improvements: string[];
  modelSentence: string;
  encouragement: string;
  cefrLevel: string;
}

const scoreColors: Record<string, string> = {
  A: "bg-green-100 text-green-800 border-green-300",
  B: "bg-blue-100 text-blue-800 border-blue-300",
  C: "bg-yellow-100 text-yellow-800 border-yellow-300",
  D: "bg-orange-100 text-orange-800 border-orange-300",
  E: "bg-red-100 text-red-700 border-red-300",
};

function ScorePill({ score }: { score: string }) {
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border-2 font-black text-sm ${scoreColors[score] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
      {score}
    </span>
  );
}

export default function WritingPage() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "writing" | "feedback">("intro");
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);

  const task = writingTasks[taskIndex];

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(text.trim() ? words : 0);
  }, [text]);

  const submitForFeedback = async () => {
    if (wordCount < 20) {
      setError("Skriv minst 20 ord innan du skickar in.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/writing-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          taskTitle: task.title,
          genre: task.genre,
          wordCountMin: task.wordCount.min,
          wordCountMax: task.wordCount.max,
          assessmentCriteria: task.assessmentCriteria,
        }),
      });

      if (!response.ok) {
        throw new Error("Feedback request failed");
      }

      const data = await response.json();
      setFeedback(data);
      setPhase("feedback");
    } catch {
      setError("Kunde inte hämta feedback. Kontrollera att API-nyckeln är konfigurerad.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setPhase("intro");
    setText("");
    setFeedback(null);
    setError(null);
    setWordCount(0);
  };

  const wordCountColor =
    wordCount < task.wordCount.min
      ? "text-red-500"
      : wordCount > task.wordCount.max
      ? "text-orange-500"
      : "text-green-600";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Tillbaka
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
              <PenLine className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Writing – Delprov C</span>
          </div>
          <div className="flex items-center gap-2">
            {writingTasks.map((_, i) => (
              <button
                key={i}
                onClick={() => { reset(); setTaskIndex(i); }}
                className={`w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                  i === taskIndex
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Task header */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                {task.delprov}
              </span>
              <h1 className="text-xl font-bold text-gray-900 mt-2">{task.title}</h1>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full flex-shrink-0">
              {task.genre} · {task.wordCount.min}–{task.wordCount.max} ord
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-orange-200 pl-3">
            {task.situation}
          </p>
        </div>

        {/* Phase: Intro */}
        {phase === "intro" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                Uppgiftsinstruktion
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{task.prompt}</p>
              {task.exampleOpener && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-orange-700 mb-1">Exempelöppning:</p>
                  <p className="text-sm text-orange-800 italic whitespace-pre-line">{task.exampleOpener}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Skrivtips</h2>
              <ul className="space-y-2">
                {task.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Bedömningskriterier</h2>
              <div className="grid gap-3">
                {[
                  { label: "Innehåll", value: task.assessmentCriteria.content },
                  { label: "Språk", value: task.assessmentCriteria.language },
                  { label: "Struktur", value: task.assessmentCriteria.structure },
                ].map((c) => (
                  <div key={c.label} className="flex gap-3 text-sm">
                    <span className="font-semibold text-gray-700 w-20 flex-shrink-0">{c.label}:</span>
                    <span className="text-gray-600">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPhase("writing")}
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-orange-700 transition-colors shadow-sm"
            >
              Börja skriva
            </button>
          </div>
        )}

        {/* Phase: Writing */}
        {phase === "writing" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">{task.title}</p>
                  <span className={`text-sm font-mono font-semibold ${wordCountColor}`}>
                    {wordCount} / {task.wordCount.min}–{task.wordCount.max} ord
                  </span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Skriv din text här på engelska..."
                  className="w-full p-4 text-gray-800 text-sm leading-relaxed resize-none focus:outline-none min-h-64"
                  rows={20}
                  autoFocus
                  spellCheck={false}
                  lang="en"
                />
                <div className="border-t border-gray-100 px-4 py-2">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        wordCount >= task.wordCount.min && wordCount <= task.wordCount.max
                          ? "bg-green-500"
                          : wordCount > task.wordCount.max
                          ? "bg-orange-500"
                          : "bg-blue-400"
                      }`}
                      style={{
                        width: `${Math.min((wordCount / task.wordCount.max) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={reset}
                  className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Börja om
                </button>
                <button
                  onClick={submitForFeedback}
                  disabled={isLoading || wordCount < 20}
                  className="flex-1 bg-orange-600 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyserar din text...
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4" />
                      Få AI-feedback
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-20">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Uppgiften</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{task.prompt}</p>

                <div className="border-t pt-3">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">Tips</h3>
                  <ul className="space-y-1.5">
                    {task.tips.slice(0, 4).map((tip) => (
                      <li key={tip} className="text-xs text-gray-500 flex items-start gap-1.5">
                        <span className="text-orange-400 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase: Feedback */}
        {phase === "feedback" && feedback && (
          <div className="space-y-4">
            {/* Overall score */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Din feedback</h2>
                  <p className="text-gray-500 text-sm">{task.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{feedback.wordCountFeedback}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className={`px-4 py-2 rounded-xl border-2 font-black text-2xl ${scoreColors[feedback.overallScore] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
                    {feedback.overallScore}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">CEFR</p>
                    <p className="font-bold text-gray-700">{feedback.cefrLevel}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{feedback.overallFeedback}</p>
            </div>

            {/* Detailed scores */}
            <div className="grid grid-cols-2 gap-3">
              {([
                { label: "Innehåll", score: feedback.contentScore, fb: feedback.contentFeedback },
                { label: "Struktur", score: feedback.structureScore, fb: feedback.structureFeedback },
                { label: "Språk", score: feedback.languageScore, fb: feedback.languageFeedback },
                { label: "Register", score: feedback.registerScore, fb: feedback.registerFeedback },
              ] as Array<{ label: string; score: string; fb: string }>).map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
                    <ScorePill score={item.score} />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.fb}</p>
                </div>
              ))}
            </div>

            {/* Corrections */}
            {feedback.corrections && feedback.corrections.length > 0 && (
              <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3">Språkliga korrigeringar</h3>
                <div className="space-y-3">
                  {feedback.corrections.map((c, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-red-500 line-through text-xs bg-red-50 px-2 py-0.5 rounded">
                          {c.original}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className="text-green-700 text-xs bg-green-50 px-2 py-0.5 rounded font-medium">
                          {c.suggested}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 ml-1">{c.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Det gick bra
              </h3>
              <ul className="space-y-1.5">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <h3 className="font-bold text-amber-800 mb-3">Prioriterade förbättringar</h3>
              <ul className="space-y-1.5">
                {feedback.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">→</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Model sentence */}
            {feedback.modelSentence && (
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
                <h3 className="font-bold text-blue-800 mb-2">Exempel på bättre formulering</h3>
                <p className="text-sm text-blue-700 italic">&ldquo;{feedback.modelSentence}&rdquo;</p>
              </div>
            )}

            {/* Encouragement */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white">
              <p className="font-semibold">{feedback.encouragement}</p>
            </div>

            {/* Your text */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700 text-sm">Din text ({feedback.wordCount} ord)</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setPhase("writing"); setFeedback(null); }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Skriv om
              </button>
              {taskIndex < writingTasks.length - 1 && (
                <button
                  onClick={() => { reset(); setTaskIndex((i) => i + 1); }}
                  className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  Nästa uppgift <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
