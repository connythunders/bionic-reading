"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { readingTexts, Question } from "@/lib/content/reading";

interface Answer {
  questionId: string;
  userAnswer: string | number;
  isCorrect: boolean;
}

export default function ReadingPage() {
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<"reading" | "questions" | "results">("reading");
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Answer[]>([]);

  const text = readingTexts[textIndex];

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleShortAnswer = (questionId: string, value: string) => {
    setShortAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const submitAnswers = () => {
    const results: Answer[] = text.questions.map((q) => {
      if (q.type === "multiple-choice") {
        const userAnswer = answers[q.id] ?? -1;
        return {
          questionId: q.id,
          userAnswer,
          isCorrect: userAnswer === q.correctAnswer,
        };
      } else {
        // short answer – mark as manual review (we show explanation)
        return {
          questionId: q.id,
          userAnswer: shortAnswers[q.id] || "",
          isCorrect: true, // short answers reviewed by student with model answer
        };
      }
    });
    setSubmitted(results);
    setPhase("results");
  };

  const reset = () => {
    setPhase("reading");
    setAnswers({});
    setShortAnswers({});
    setSubmitted([]);
  };

  const mcAnswered = text.questions
    .filter((q) => q.type === "multiple-choice")
    .every((q) => answers[q.id] !== undefined);

  const score =
    submitted.filter(
      (a) =>
        a.isCorrect &&
        text.questions.find((q) => q.id === a.questionId)?.type === "multiple-choice"
    ).length;

  const mcTotal = text.questions.filter((q) => q.type === "multiple-choice").length;

  const levelColors: Record<string, string> = {
    B1: "bg-blue-100 text-blue-700",
    "B1-B2": "bg-indigo-100 text-indigo-700",
    B2: "bg-purple-100 text-purple-700",
  };

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
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Reading – Delprov B1</span>
          </div>
          <div className="flex items-center gap-2">
            {readingTexts.map((_, i) => (
              <button
                key={i}
                onClick={() => { reset(); setTextIndex(i); }}
                className={`w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                  i === textIndex
                    ? "bg-blue-500 text-white"
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
        {/* Text info */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[text.level] || "bg-gray-100 text-gray-600"}`}>
            {text.level}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {text.genre}
          </span>
          <span className="text-xs text-gray-400">{text.source}</span>
        </div>

        {/* Phase: Reading */}
        {phase === "reading" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{text.title}</h1>
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                  {text.text.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-20">
                <h2 className="font-bold text-gray-900 mb-2">Läsanvisningar</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">→</span>
                    Läs texten noggrant en gång
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">→</span>
                    Notera nyckelord och huvudbudskap
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">→</span>
                    Läs frågan noggrant innan du svarar
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">→</span>
                    Hänvisa alltid tillbaka till texten
                  </li>
                </ul>
                <p className="text-xs text-gray-400 mt-4 border-t pt-3">
                  {text.questions.length} frågor · {text.text.split(" ").length} ord
                </p>
                <button
                  onClick={() => setPhase("questions")}
                  className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Gå till frågorna →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase: Questions */}
        {phase === "questions" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scrollable text */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-h-[70vh] overflow-y-auto">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{text.title}</h2>
                <div className="text-gray-700 text-sm leading-relaxed">
                  {text.text.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-1 space-y-4">
              {text.questions.map((q, qi) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  index={qi + 1}
                  answer={answers[q.id]}
                  shortAnswer={shortAnswers[q.id] || ""}
                  onAnswer={(a) => handleAnswer(q.id, a)}
                  onShortAnswer={(v) => handleShortAnswer(q.id, v)}
                />
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
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Skicka in svar
              </button>
            </div>
          </div>
        )}

        {/* Phase: Results */}
        {phase === "results" && (
          <div className="space-y-4">
            {/* Score */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ditt resultat</h2>
                  <p className="text-gray-500 text-sm">{text.title}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-600">
                    {score}/{mcTotal}
                  </div>
                  <p className="text-xs text-gray-400">rätta svar</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${(score / mcTotal) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {Math.round((score / mcTotal) * 100)}%
              </p>
            </div>

            {/* Question reviews */}
            {text.questions.map((q, qi) => {
              const ans = submitted.find((a) => a.questionId === q.id);
              const isShort = q.type === "short-answer" || q.type === "true-false";
              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border shadow-sm p-5 ${
                    isShort
                      ? "border-blue-100"
                      : ans?.isCorrect
                      ? "border-green-200"
                      : "border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {!isShort && (
                      <div className="mt-0.5 flex-shrink-0">
                        {ans?.isCorrect ? (
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
                                  : oi === ans?.userAnswer && !ans.isCorrect
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

                      <div className="bg-blue-50 rounded-lg p-2.5 text-xs text-blue-700">
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
              {textIndex < readingTexts.length - 1 && (
                <button
                  onClick={() => { reset(); setTextIndex((i) => i + 1); }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Nästa text <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function QuestionCard({
  question,
  index,
  answer,
  shortAnswer,
  onAnswer,
  onShortAnswer,
}: {
  question: Question;
  index: number;
  answer: string | number | undefined;
  shortAnswer: string;
  onAnswer: (a: string | number) => void;
  onShortAnswer: (v: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <p className="font-medium text-gray-900 text-sm mb-3">
        {index}. {question.question}
      </p>

      {question.type === "multiple-choice" && question.options && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                answer === i
                  ? "border-blue-500 bg-blue-50 text-blue-800 font-medium"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === "short-answer" && (
        <textarea
          value={shortAnswer}
          onChange={(e) => onShortAnswer(e.target.value)}
          placeholder="Skriv ditt svar här..."
          rows={3}
          className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      )}
    </div>
  );
}
