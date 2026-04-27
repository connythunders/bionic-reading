'use client'

import { use, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { ExamSession, Question, Answer } from '@/lib/types'

interface LocalAnswer {
  questionId: string
  text: string
  wordCount: number
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

export default function SubmitExamPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = use(params)
  const router = useRouter()

  const [session, setSession] = useState<ExamSession | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<LocalAnswer[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedAt, setSubmittedAt] = useState('')
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    const res = await fetch(`/api/session-for-code?code=${encodeURIComponent(code)}`)
    if (!res.ok) {
      setError('Kunde inte ladda provsessionen.')
      setLoading(false)
      return
    }

    const data = await res.json()
    const loadedSession: ExamSession = data.session
    const loadedQuestions: Question[] = data.questions ?? []

    setSession(loadedSession)
    setQuestions(loadedQuestions)

    // If session is already submitted, show the confirmation screen
    if (loadedSession.submitted_at) {
      setSubmitted(true)
      setSubmittedAt(loadedSession.submitted_at)
      setLoading(false)
      return
    }

    // Try to fetch existing saved answers from Supabase
    const sessionId = loadedSession.id
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: savedAnswers } = await supabaseClient
      .from('answers')
      .select('question_id, text, word_count')
      .eq('session_id', sessionId)

    const localAnswers: LocalAnswer[] = loadedQuestions.map((q) => {
      const saved = (savedAnswers ?? []).find(
        (a: { question_id: string; text: string; word_count: number }) =>
          a.question_id === q.id
      )
      return {
        questionId: q.id,
        text: saved?.text ?? '',
        wordCount: saved?.word_count ?? 0,
      }
    })

    setAnswers(localAnswers)
    setLoading(false)
  }, [code])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleSubmit() {
    if (!session) return
    const confirmed = window.confirm(
      'Är du säker på att du vill lämna in provet? Det går inte att ändra efteråt.'
    )
    if (!confirmed) return

    setSubmitting(true)
    setError('')

    const res = await fetch('/api/submit-exam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: session.id,
        answers: answers.map((a) => ({
          questionId: a.questionId,
          text: a.text,
          wordCount: a.wordCount,
        })),
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Kunde inte lämna in provet.')
      setSubmitting(false)
      return
    }

    // Clear session from localStorage
    localStorage.removeItem(`examai_session_${code}`)
    setSubmittedAt(data.submittedAt ?? new Date().toISOString())
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-muted)' }}>Laddar...</p>
      </div>
    )
  }

  // Confirmation screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center max-w-md w-full">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#1a2e1a' }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Ditt prov är inlämnat</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Inlämnat:{' '}
            {new Date(submittedAt).toLocaleString('sv-SE', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </p>
          <div
            className="rounded-xl py-5 px-6 mb-6"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
              Din elevkod
            </p>
            <p
              className="text-4xl font-bold font-mono tracking-widest"
              style={{ color: 'var(--accent)', letterSpacing: '0.18em' }}
            >
              {session?.student_code ?? code}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Spara denna kod som bevis på inlämning
            </p>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Du kan nu stänga den här sidan.
          </p>
        </div>
      </div>
    )
  }

  const totalWords = answers.reduce((sum, a) => sum + a.wordCount, 0)

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        className="px-6 py-3 flex items-center gap-4"
      >
        <button
          onClick={() => router.back()}
          style={{ color: 'var(--text-muted)' }}
          className="text-sm"
        >
          ← Tillbaka
        </button>
        <span className="text-xl font-bold">
          Exam<span style={{ color: 'var(--accent)' }}>AI</span>
        </span>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Granska dina svar</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {questions.length} frågor &middot; {totalWords} ord totalt
          </p>
        </div>

        {/* Answer review */}
        <div className="space-y-4 mb-8">
          {questions.map((q, idx) => {
            const answer = answers.find((a) => a.questionId === q.id)
            return (
              <div key={q.id} className="card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    Fråga {idx + 1}
                  </span>
                  <span className={`badge badge-${q.level.toLowerCase()}`}>
                    {q.level}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {q.points} p
                  </span>
                </div>
                <p className="text-sm font-medium mb-3">{q.text}</p>
                <div
                  className="rounded-lg p-3 text-sm"
                  style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    whiteSpace: 'pre-wrap',
                    color: answer?.text ? 'var(--text)' : 'var(--text-muted)',
                    minHeight: 64,
                  }}
                >
                  {answer?.text || '(inget svar)'}
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {answer?.wordCount ?? 0} ord
                </p>
              </div>
            )
          })}
        </div>

        {error && (
          <p className="text-sm mb-4" style={{ color: '#f87171' }}>
            {error}
          </p>
        )}

        <div
          className="card"
          style={{ border: '1px solid var(--border)' }}
        >
          <h2 className="font-semibold mb-2">Redo att lämna in?</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            När du lämnar in kan du inte göra ändringar. Kontrollera att du är
            nöjd med dina svar.
          </p>
          <button
            className="btn-primary w-full text-base py-3"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Lämnar in...' : 'Lämna in provet'}
          </button>
        </div>
      </main>
    </div>
  )
}
