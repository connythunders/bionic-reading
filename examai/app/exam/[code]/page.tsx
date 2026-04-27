'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Level } from '@/lib/types'

interface ExamInfo {
  id: string
  title: string
  subject: string
  time_limit_minutes: number
  adaptive: boolean
}

const LEVEL_DESCRIPTIONS: Record<Level, { title: string; desc: string }> = {
  E: {
    title: 'Grundläggande',
    desc: 'Du visar att du förstår det viktigaste',
  },
  C: {
    title: 'Tillämpande',
    desc: 'Du visar att du kan använda kunskapen',
  },
  A: {
    title: 'Analyserande',
    desc: 'Du visar djup förståelse och kan resonera',
  },
}

export default function ExamLandingPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = use(params)
  const router = useRouter()

  const [exam, setExam] = useState<ExamInfo | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<Level>('E')
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchExam() {
      const res = await fetch(`/api/exam-info?code=${encodeURIComponent(code)}`)
      if (!res.ok) {
        setError('Ogiltig eller utgången kod.')
        setLoading(false)
        return
      }
      const data = await res.json()
      setExam(data.exam)
      setLoading(false)
    }
    fetchExam()
  }, [code])

  async function handleStart() {
    setStarting(true)
    setError('')

    const res = await fetch('/api/start-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, level: selectedLevel }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Kunde inte starta provet.')
      setStarting(false)
      return
    }

    // Store sessionId in localStorage for the write page
    localStorage.setItem(`examai_session_${code}`, data.sessionId)
    router.push(`/exam/${code}/write`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-muted)' }}>Laddar...</p>
      </div>
    )
  }

  if (!exam || error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center max-w-sm w-full">
          <p className="text-lg font-semibold mb-2">Ogiltig kod</p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            {error || 'Det gick inte att hitta ett prov för den här koden.'}
          </p>
          <a href="/" className="btn-secondary inline-block">
            Tillbaka
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Exam info */}
        <div className="card mb-6 text-center">
          <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--accent)' }}>
            {exam.subject}
          </p>
          <h1 className="text-2xl font-bold mb-1">{exam.title}</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Tid: {exam.time_limit_minutes} minuter
            {exam.adaptive && ' &middot; Adaptivt prov'}
          </p>
          <p
            className="text-xs mt-2 font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            Kod: {code}
          </p>
        </div>

        {/* Level selection */}
        <div className="card mb-6">
          <h2 className="font-semibold mb-4">Välj din nivå</h2>
          <div className="space-y-3">
            {(['E', 'C', 'A'] as Level[]).map((level) => {
              const { title, desc } = LEVEL_DESCRIPTIONS[level]
              const isSelected = selectedLevel === level
              return (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className="w-full text-left rounded-lg p-4 transition-colors"
                  style={{
                    border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    background: isSelected
                      ? 'rgba(124,111,205,0.08)'
                      : 'var(--surface2)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`badge badge-${level.toLowerCase()}`}>{level}</span>
                    <div>
                      <p className="font-medium text-sm">{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {desc}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="ml-auto">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {error && (
          <p className="text-sm mb-4 text-center" style={{ color: '#f87171' }}>
            {error}
          </p>
        )}

        <button
          className="btn-primary w-full text-lg py-3"
          onClick={handleStart}
          disabled={starting}
        >
          {starting ? 'Startar...' : 'Starta provet'}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: 'var(--text-muted)' }}>
          När du startat kan du inte byta nivå. Se till att du är redo.
        </p>
      </div>
    </main>
  )
}
