"use client";

import { useState } from "react";
import { themes } from "@/lib/questions";

const TEAM_OPTIONS = [
  "Lag 1",
  "Lag 2",
  "Lag 3",
  "Lag 4",
  "Lag 5",
];

export default function Home() {
  const [step, setStep] = useState<"login" | "form" | "done">("login");
  const [teamName, setTeamName] = useState("");
  const [customTeam, setCustomTeam] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const effectiveTeam = useCustom ? customTeam : teamName;

  function handleTeamConfirm() {
    if (!effectiveTeam.trim()) {
      setError("Ange ditt arbetslag för att fortsätta.");
      return;
    }
    setError("");
    setStep("form");
  }

  function handleAnswerChange(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName: effectiveTeam.trim(), answers }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Något gick fel");
      }
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte skicka svaren");
    } finally {
      setSubmitting(false);
    }
  }

  // Login step
  if (step === "login") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">
            AI-workshop för lärare
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Välj ditt arbetslag för att börja
          </p>

          <div className="space-y-3 mb-4">
            {TEAM_OPTIONS.map((team) => (
              <button
                key={team}
                onClick={() => {
                  setTeamName(team);
                  setUseCustom(false);
                  setError("");
                }}
                className={`w-full px-4 py-3 rounded-lg border-2 text-left transition-colors ${
                  !useCustom && teamName === team
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {team}
              </button>
            ))}
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-400">eller</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="Skriv ditt arbetslags namn..."
            value={customTeam}
            onChange={(e) => {
              setCustomTeam(e.target.value);
              setUseCustom(true);
              setTeamName("");
              setError("");
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-4"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleTeamConfirm}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Fortsätt
          </button>
        </div>
      </main>
    );
  }

  // Thank you step
  if (step === "done") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-bold mb-2">Tack för era svar!</h1>
          <p className="text-gray-500 mb-6">
            Era reflektioner har sparats. Ni kan stänga den här sidan.
          </p>
          <p className="text-sm text-gray-400">
            Arbetslag: {effectiveTeam}
          </p>
        </div>
      </main>
    );
  }

  // Form step
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">AI-workshop för lärare</h1>
          <p className="text-gray-500 mt-1">
            Arbetslag: <span className="font-medium text-gray-700">{effectiveTeam}</span>
          </p>
        </div>

        <div className="space-y-10">
          {themes.map((theme) => (
            <section key={theme.id} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-blue-700 mb-1">
                {theme.title}
              </h2>
              {theme.subtitle && (
                <p className="text-sm font-medium text-blue-500 mb-3">
                  {theme.subtitle}
                </p>
              )}
              {theme.description && (
                <blockquote className="border-l-4 border-blue-200 pl-4 text-gray-600 italic mb-6 text-sm">
                  {theme.description}
                </blockquote>
              )}

              <div className="space-y-6">
                {theme.questions.map((q, idx) => (
                  <div key={q.id}>
                    <label
                      htmlFor={q.id}
                      className="block text-gray-800 font-medium mb-2"
                    >
                      {idx + 1}. {q.text}
                    </label>
                    <textarea
                      id={q.id}
                      rows={4}
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder="Skriv ert svar här..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-y text-sm"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        <div className="mt-8 mb-12">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Skickar..." : "Skicka svar"}
          </button>
        </div>
      </div>
    </main>
  );
}
