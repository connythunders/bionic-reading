'use client'

import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Question, ExamSession } from '@/lib/types'
import type { CheatEvent } from '@/lib/types'

interface LocalAnswer {
  questionId: string
  text: string
  wordCount: number
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function WriteExamPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = use(params)
  const router = useRouter()

  const [session, setSession] = useState<ExamSession | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<LocalAnswer[]>([])
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [examTitle, setExamTitle] = useState('')
  const [cheatCount, setCheatCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const sessionIdRef = useRef<string | null>(null)
  const autosaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Log a cheat event
  const logCheat = useCallback(
    async (type: CheatEvent['type'], detail?: string) => {
      const sessionId = sessionIdRef.current
      if (!sessionId) return
      setCheatCount((c) => c + 1)
      await fetch('/api/log-cheat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          type,
          detail,
          timestamp: new Date().toISOString(),
        }),
      })
    },
    []
  )

  // Autosave current answer
  const autosave = useCallback(
    async (questionId: string, text: string, wordCount: number) => {
      const sessionId = sessionIdRef.current
      if (!sessionId || !questionId) return
      await fetch('/api/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, questionId, text, wordCount }),
      })
    },
    []
  )

  // Anti-cheat handlers
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      logCheat('paste', 'Inklistning blockerad')
    }

    const handleCopy = () => {
      logCheat('copy')
    }

    const handleBlur = () => {
      logCheat('blur', 'Fönster tappade fokus')
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      logCheat('context_menu')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && ['c', 'v', 'a', 'x'].includes(e.key.toLowerCase())) {
        if (e.key.toLowerCase() === 'v') {
          e.preventDefault()
        }
        logCheat('keyboard_shortcut', `Ctrl/Cmd+${e.key.toUpperCase()}`)
      }
    }

    document.addEventListener('paste', handlePaste)
    document.addEventListener('copy', handleCopy)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('paste', handlePaste)
      document.removeEventListener('copy', handleCopy)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [logCheat])

  // Load session and questions
  useEffect(() => {
    async function load() {
      // Try localStorage first
      const storedSessionId = localStorage.getItem(`examai_session_${code}`)

      const res = await fetch(`/api/session-for-code?code=${encodeURIComponent(code)}`)
      if (!res.ok) {
        setError('Kunde inte ladda provet. Kontrollera att din kod är giltig.')
        setLoading(false)
        return
      }

      const data = await res.json()
      const loadedSession: ExamSession = data.session
      const loadedQuestions: Question[] = data.questions ?? []

      if (!loadedSession) {
        setError('Ingen aktiv session hittades.')
        setLoading(false)
        return
      }

      // Prefer sessionId from localStorage if it matches
      if (storedSessionId && storedSessionId === loadedSession.id) {
        sessionIdRef.current = storedSessionId
      } else {
        sessionIdRef.current = loadedSession.id
        localStorage.setItem(`examai_session_${code}`, loadedSession.id)
      }

      setSession(loadedSession)
      setQuestions(loadedQuestions)

      // Fetch exam info for title and time limit
      const examRes = await fetch(`/api/exam-info?code=${encodeURIComponent(code)}`)
      if (examRes.ok) {
        const examData = await examRes.json()
        setExamTitle(examData.exam.title)
        setTimeLeft(examData.exam.time_limit_minutes * 60)
      }

      // Initialize empty answers
      const initialAnswers: LocalAnswer[] = loadedQuestions.map((q) => ({
        questionId: q.id,
        text: '',
        wordCount: 0,
      }))
      setAnswers(initialAnswers)
      setLoading(false)
    }
    load()
  }, [code])

  // Countdown timer – only starts once timeLeft is set (i.e. not null)
  const timerStarted = timeLeft !== null
  useEffect(() => {
    if (!timerStarted) return
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!)
          router.push(`/exam/${code}/submit`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerStarted, code, router])

  // Autosave every 30s
  useEffect(() => {
    autosaveTimerRef.current = setInterval(() => {
      const q = questions[currentIndex]
      if (!q) return
      const answer = answers.find((a) => a.questionId === q.id)
      if (answer) {
        autosave(answer.questionId, answer.text, answer.wordCount)
      }
    }, 30000)

    return () => {
      if (autosaveTimerRef.current) clearInterval(autosaveTimerRef.current)
    }
  }, [questions, currentIndex, answers, autosave])

  function handleTextChange(text: string) {
    const wc = countWords(text)
    setAnswers((prev) =>
      prev.map((a, i) =>
        i === currentIndex ? { ...a, text, wordCount: wc } : a
      )
    )
  }

  async function handleNext() {
    // Save current answer before moving on
    const q = questions[currentIndex]
    const answer = answers[currentIndex]
    if (q && answer) {
      await autosave(answer.questionId, answer.text, answer.wordCount)
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      // Last question – go to submit
      router.push(`/exam/${code}/submit`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-muted)' }}>Laddar provet...</p>
      </div>
    )
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center max-w-sm w-full">
          <p className="font-semibold mb-2">
            {error || 'Inga frågor hittades för vald nivå.'}
          </p>
          <a href="/" className="btn-secondary inline-block mt-4">
            Tillbaka
          </a>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentIndex] ?? { text: '', wordCount: 0 }
  const isLast = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isTimeLow = timeLeft !== null && timeLeft < 300

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
        className="px-4 py-3"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm truncate">{examTitle}</span>
            <span
              className="font-mono text-lg font-bold tabular-nums"
              style={{ color: isTimeLow ? '#f87171' : 'var(--text)' }}
            >
              {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
            </span>
          </div>
          {/* Progress bar */}
          <div
            className="rounded-full h-1.5"
            style={{ background: 'var(--surface2)' }}
          >
            <div
              className="h-1.5 rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background: 'var(--accent)',
              }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Fråga {currentIndex + 1} av {questions.length}
          </p>
        </div>
      </header>

      {/* Cheat warning */}
      {cheatCount > 0 && (
        <div
          className="px-4 py-2 text-sm text-center"
          style={{ background: '#2e2400', color: '#fbbf24' }}
        >
          Varning: aktivitet loggad ({cheatCount} händelse
          {cheatCount !== 1 ? 'r' : ''})
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col">
        {/* Question */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`badge badge-${session?.chosen_level?.toLowerCase() ?? 'e'}`}
            >
              {session?.chosen_level ?? ''}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {currentQuestion.points} poäng
            </span>
          </div>
          <p className="text-lg leading-relaxed">{currentQuestion.text}</p>
        </div>

        {/* Answer textarea */}
        <div className="flex-1 flex flex-col">
          <textarea
            className="input flex-1 resize-none text-base leading-relaxed"
            style={{ minHeight: 240 }}
            placeholder="Skriv ditt svar här..."
            value={currentAnswer.text}
            onChange={(e) => handleTextChange(e.target.value)}
            autoFocus
          />
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            {currentAnswer.wordCount} ord
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            className="btn-secondary"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            ← Föregående
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {isLast ? 'Förhandsgranska svar →' : 'Nästa fråga →'}
          </button>
        </div>
      </main>
    </div>
  )
}
