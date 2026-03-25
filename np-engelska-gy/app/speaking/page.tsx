"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
  CheckCircle,
  AlertCircle,
  Volume2,
  BookOpen,
  Star,
} from "lucide-react";
import { speakingTasks } from "@/lib/content/speaking";

interface Feedback {
  overallScore: string;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  vocabularySuggestions: string[];
  grammarNote: string | null;
  encouragement: string;
  cefrLevel: string;
}

// NP grading: A = Mycket väl godkänd, C = Väl godkänd, E = Godkänd
const scoreColors: Record<string, string> = {
  A: "bg-green-100 text-green-800 border-green-200",
  C: "bg-violet-100 text-violet-800 border-violet-200",
  E: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export default function SpeakingPage() {
  const [taskIndex, setTaskIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "prep" | "recording" | "review" | "feedback">(
    "intro"
  );
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prepTime, setPrepTime] = useState(60);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const task = speakingTasks[taskIndex];

  const startRecording = useCallback(() => {
    setError(null);
    setTranscript("");
    setInterimTranscript("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setError(
        "Din webbläsare stöder inte röstinspelning. Försök med Google Chrome."
      );
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new SpeechRecognitionAPI() as any;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }
      setTranscript((prev) => prev + final);
      setInterimTranscript(interim);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        setError(`Mikrofonsfel: ${event.error}. Kontrollera att mikrofonen fungerar.`);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setRecordingTime(0);
    setPhase("recording");

    timerRef.current = setInterval(() => {
      setRecordingTime((t) => {
        if (t >= task.timeLimit) {
          stopRecording();
          return t;
        }
        return t + 1;
      });
    }, 1000);
  }, [task.timeLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setInterimTranscript("");
    setPhase("review");
  }, []);

  const startPrep = () => {
    setPhase("prep");
    setPrepTime(60);
    prepTimerRef.current = setInterval(() => {
      setPrepTime((t) => {
        if (t <= 1) {
          clearInterval(prepTimerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const getFeedback = async () => {
    if (!transcript.trim() || transcript.trim().length < 10) {
      setError(
        "Inspelningen är för kort för att analysera. Tala mer och försök igen."
      );
      return;
    }

    setIsLoadingFeedback(true);
    setError(null);

    try {
      const response = await fetch("/api/speaking-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          taskTitle: task.title,
          taskContext: task.situation,
          taskType: task.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Feedback request failed");
      }

      const data = await response.json();
      setFeedback(data);
      setPhase("feedback");
    } catch {
      setError("Kunde inte hämta feedback. Kontrollera din API-nyckel och försök igen.");
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const reset = () => {
    setPhase("intro");
    setTranscript("");
    setInterimTranscript("");
    setFeedback(null);
    setError(null);
    setRecordingTime(0);
    setPrepTime(60);
    if (timerRef.current) clearInterval(timerRef.current);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
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
            <div className="w-7 h-7 bg-violet-500 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Speaking – Delprov A</span>
          </div>
          <div className="flex items-center gap-2">
            {speakingTasks.map((_, i) => (
              <button
                key={i}
                onClick={() => { reset(); setTaskIndex(i); }}
                className={`w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                  i === taskIndex
                    ? "bg-violet-500 text-white"
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
        {/* Task card header */}
        <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">
                  {task.part}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mt-2">{task.title}</h1>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 flex-shrink-0">
              <Volume2 className="w-4 h-4" />
              <span>{formatTime(task.timeLimit)}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{task.situation}</p>
          {task.pairNote && (
            <p className="mt-2 text-xs text-violet-600 bg-violet-50 rounded-lg px-3 py-2 italic">
              ℹ️ {task.pairNote}
            </p>
          )}
        </div>

        {/* Phase: Intro */}
        {phase === "intro" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-violet-500" />
                Din uppgift
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {task.taskCard}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Användbara fraser</h2>
              <div className="flex flex-wrap gap-2">
                {task.usefulPhrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="bg-violet-50 text-violet-700 text-sm px-3 py-1.5 rounded-lg border border-violet-100"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Bedömningsfokus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {task.assessmentFocus.map((focus) => (
                  <div key={focus} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {focus}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={startPrep}
              className="w-full bg-violet-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-violet-700 transition-colors shadow-sm"
            >
              Starta förberedelsetid (60 sek)
            </button>
          </div>
        )}

        {/* Phase: Prep */}
        {phase === "prep" && (
          <div className="bg-white rounded-2xl border border-violet-200 shadow-sm p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Förberedelsetid</h2>
            <p className="text-gray-500 text-sm mb-6">Läs uppgiften noggrant och planera vad du ska säga</p>
            <div
              className={`text-7xl font-black mb-6 tabular-nums ${
                prepTime <= 10 ? "text-red-500" : "text-violet-600"
              }`}
            >
              {prepTime}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed text-left mb-6">
              {task.taskCard}
            </div>
            <button
              onClick={startRecording}
              className="bg-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
            >
              Börja prata nu
            </button>
          </div>
        )}

        {/* Phase: Recording */}
        {phase === "recording" && (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center recording-active shadow-lg">
                  <Mic className="w-10 h-10 text-white" />
                </div>
              </div>
              <p className="text-red-600 font-semibold">Spelar in...</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="wave-bar w-1.5 bg-red-400 rounded-full"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <div className="mt-3 text-2xl font-mono font-bold text-gray-700">
                {formatTime(recordingTime)} / {formatTime(task.timeLimit)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3 max-w-xs mx-auto">
                <div
                  className="bg-red-500 h-2 rounded-full progress-bar"
                  style={{ width: `${Math.min((recordingTime / task.timeLimit) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Live transcript */}
            <div className="bg-gray-50 rounded-xl p-4 min-h-24 mb-4 text-sm text-gray-700">
              <p className="text-xs text-gray-400 mb-2 font-medium">TRANSKRIPTION (live)</p>
              <p>
                {transcript}
                {interimTranscript && (
                  <span className="text-gray-400 italic">{interimTranscript}</span>
                )}
                {!transcript && !interimTranscript && (
                  <span className="text-gray-400 italic">Börja prata nu...</span>
                )}
              </p>
            </div>

            <button
              onClick={stopRecording}
              className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <MicOff className="w-5 h-5" />
              Avsluta inspelning
            </button>
          </div>
        )}

        {/* Phase: Review */}
        {phase === "review" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-3">Din inspelning – transkription</h2>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed min-h-20">
                {transcript || (
                  <span className="text-gray-400 italic">
                    Ingen transkription tillgänglig. Se till att du pratat tillräckligt.
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Tid: {formatTime(recordingTime)} · Ord (ungefär):{" "}
                {transcript.trim().split(/\s+/).filter(Boolean).length}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Försök igen
              </button>
              <button
                onClick={getFeedback}
                disabled={isLoadingFeedback || !transcript.trim()}
                className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoadingFeedback ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyserar...
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
        )}

        {/* Phase: Feedback */}
        {phase === "feedback" && feedback && (
          <div className="space-y-4">
            {/* Score banner */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">Din feedback</h2>
                  <p className="text-gray-500 text-sm">{task.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-xl border-2 font-black text-2xl ${scoreColors[feedback.overallScore] || scoreColors.C}`}>
                    {feedback.overallScore}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">CEFR-nivå</p>
                    <p className="font-bold text-gray-700">{feedback.cefrLevel}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{feedback.overallFeedback}</p>
            </div>

            {/* Strengths */}
            <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Det gick bra
              </h3>
              <ul className="space-y-2">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <h3 className="font-bold text-amber-800 mb-3">Så kan du förbättra dig</h3>
              <ul className="space-y-2">
                {feedback.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">→</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vocabulary */}
            {feedback.vocabularySuggestions.length > 0 && (
              <div className="bg-violet-50 rounded-2xl border border-violet-200 p-5">
                <h3 className="font-bold text-violet-800 mb-3">Bättre ordval</h3>
                <div className="flex flex-wrap gap-2">
                  {feedback.vocabularySuggestions.map((s, i) => (
                    <span key={i} className="bg-white border border-violet-200 text-violet-700 text-sm px-3 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Grammar */}
            {feedback.grammarNote && (
              <div className="bg-purple-50 rounded-2xl border border-purple-200 p-5">
                <h3 className="font-bold text-purple-800 mb-2">Grammatiktips</h3>
                <p className="text-sm text-purple-700">{feedback.grammarNote}</p>
              </div>
            )}

            {/* Encouragement */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-5 text-white">
              <p className="font-semibold text-lg">{feedback.encouragement}</p>
            </div>

            {/* Your transcript */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Din transkription</h3>
              <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{transcript}&rdquo;</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Försök igen
              </button>
              {taskIndex < speakingTasks.length - 1 && (
                <button
                  onClick={() => { reset(); setTaskIndex((i) => i + 1); }}
                  className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
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
