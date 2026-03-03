"use client";

import { useState } from "react";
import { themes, getQuestionText } from "@/lib/questions";

interface AnswerData {
  questionId: string;
  answerText: string;
}

interface SubmissionData {
  id: number;
  createdAt: string;
  answers: AnswerData[];
}

type TeamsData = Record<string, SubmissionData[]>;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [teams, setTeams] = useState<TeamsData>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Fel lösenord");
      }
      setTeams(data.teams);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Inloggning misslyckades");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setTeams(data.teams);
      }
    } finally {
      setLoading(false);
    }
  }

  function generateExport(): string {
    let text = "# AI-workshop – Sammanställning av svar\n";
    text += `Exporterad: ${new Date().toLocaleString("sv-SE")}\n\n`;

    const teamNames = Object.keys(teams).sort();

    for (const teamName of teamNames) {
      text += `${"=".repeat(60)}\n`;
      text += `## ${teamName}\n`;
      text += `${"=".repeat(60)}\n\n`;

      const submissions = teams[teamName];

      for (const theme of themes) {
        text += `### ${theme.title}\n`;
        if (theme.subtitle) text += `*(${theme.subtitle})*\n`;
        text += "\n";

        for (const question of theme.questions) {
          text += `**${question.text}**\n\n`;

          for (const sub of submissions) {
            const answer = sub.answers.find(
              (a) => a.questionId === question.id
            );
            if (answer) {
              const time = new Date(sub.createdAt).toLocaleString("sv-SE");
              text += `> Svar (${time}):\n`;
              text += `> ${answer.answerText}\n\n`;
            }
          }
        }

        text += "\n";
      }

      text += "\n";
    }

    return text;
  }

  function handleExport() {
    const text = generateExport();
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `workshop-sammanstallning-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    const text = generateExport();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8">
  <title>Workshop-sammanställning</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; }
    h1 { font-size: 1.5rem; border-bottom: 2px solid #333; padding-bottom: 0.5rem; }
    h2 { font-size: 1.3rem; color: #1d4ed8; margin-top: 2rem; }
    h3 { font-size: 1.1rem; color: #374151; }
    blockquote { border-left: 3px solid #93c5fd; padding-left: 1rem; margin-left: 0; color: #4b5563; }
    pre { white-space: pre-wrap; font-family: inherit; }
    hr { border: none; border-top: 1px solid #d1d5db; margin: 1.5rem 0; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body><pre>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body>
</html>`);
    printWindow.document.close();
    printWindow.print();
  }

  // Login screen
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Admin</h1>
          <p className="text-gray-500 text-center mb-6">
            Logga in för att se workshop-svaren
          </p>

          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-4"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </div>
      </main>
    );
  }

  const teamNames = Object.keys(teams).sort();
  const totalSubmissions = Object.values(teams).reduce(
    (sum, subs) => sum + subs.length,
    0
  );

  // Admin dashboard
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Workshop-admin</h1>
            <p className="text-gray-500 mt-1">
              {teamNames.length} arbetslag, {totalSubmissions} inskickade svar
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? "Laddar..." : "Uppdatera"}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Exportera (.md)
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Skriv ut
            </button>
          </div>
        </div>

        {teamNames.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-gray-400 text-lg">
              Inga svar har skickats in ännu.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {teamNames.map((teamName) => (
              <section
                key={teamName}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="bg-blue-600 text-white px-6 py-4">
                  <h2 className="text-lg font-bold">{teamName}</h2>
                  <p className="text-blue-100 text-sm">
                    {teams[teamName].length} svar
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {themes.map((theme) => {
                    const hasAnswers = teams[teamName].some((sub) =>
                      sub.answers.some(
                        (a) =>
                          theme.questions.some((q) => q.id === a.questionId)
                      )
                    );
                    if (!hasAnswers) return null;

                    return (
                      <div key={theme.id}>
                        <h3 className="font-bold text-blue-700 mb-3">
                          {theme.title}
                        </h3>
                        <div className="space-y-4">
                          {theme.questions.map((question) => {
                            const relevantAnswers = teams[teamName]
                              .flatMap((sub) =>
                                sub.answers
                                  .filter((a) => a.questionId === question.id)
                                  .map((a) => ({
                                    text: a.answerText,
                                    time: sub.createdAt,
                                  }))
                              );

                            if (relevantAnswers.length === 0) return null;

                            return (
                              <div
                                key={question.id}
                                className="border-l-4 border-blue-200 pl-4"
                              >
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                  {question.text}
                                </p>
                                {relevantAnswers.map((ans, i) => (
                                  <div
                                    key={i}
                                    className="bg-gray-50 rounded-lg p-3 mb-2"
                                  >
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                      {ans.text}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {new Date(ans.time).toLocaleString("sv-SE")}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
