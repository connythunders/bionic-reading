'use client'

import { use, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { ExamSession, Answer, Question, Exam } from '@/lib/types'

interface SessionRow extends ExamSession {
  answers: Answer[]
  wordCountTotal: number
}

export default function SubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const [exam, setExam] = useState<Exam | null>(null)
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    const { data: examData } = await supabase
      .from('exams')
      .select('*')
      .eq('id', id)
      .single()

    if (examData) setExam(examData as Exam)

    const { data: questionsData } = await supabase
      .from('questions')
      .select('*')
      .eq('exam_id', id)
      .order('order_index', { ascending: true })

    setQuestions((questionsData ?? []) as Question[])

    const { data: sessionsData } = await supabase
      .from('exam_sessions')
      .select('*, answers(*)')
      .eq('exam_id', id)
      .order('started_at', { ascending: false })

    const mapped: SessionRow[] = (sessionsData ?? []).map((s) => {
      const answers: Answer[] = Array.isArray(s.answers) ? (s.answers as Answer[]) : []
      const wordCountTotal = answers.reduce((sum, a) => sum + (a.word_count ?? 0), 0)
      return {
        ...s,
        answers,
        wordCountTotal,
      } as SessionRow
    })

    setSessions(mapped)
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function formatDate(iso: string | null) {
    if (!iso) return '–'
    return new Date(iso).toLocaleString('sv-SE', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  function getAnswerForQuestion(session: SessionRow, questionId: string) {
    return session.answers.find((a) => a.question_id === questionId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-muted)' }}>Laddar...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        className="px-6 py-3 flex items-center gap-4"
      >
        <Link href="/teacher/dashboard" style={{ color: 'var(--text-muted)' }} className="text-sm">
          ← Tillbaka
        </Link>
        <span className="text-xl font-bold">
          Exam<span style={{ color: 'var(--accent)' }}>AI</span>
        </span>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{exam?.title ?? 'Prov'}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {exam?.subject} &middot; {sessions.length} inlämning
            {sessions.length !== 1 ? 'ar' : ''}
          </p>
        </div>

        {sessions.length === 0 ? (
          <div className="card text-center py-12">
            <p style={{ color: 'var(--text-muted)' }}>Inga inlämningar ännu.</p>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            {/* Table header */}
            <div
              className="grid text-xs font-semibold uppercase px-4 py-3"
              style={{
                gridTemplateColumns: '1fr 1fr 1fr 80px 80px 90px',
                background: 'var(--surface)',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span>Elevkod</span>
              <span>Startad</span>
              <span>Inlämnad</span>
              <span>Nivå</span>
              <span>Ord</span>
              <span>Fusk</span>
            </div>

            {sessions.map((session) => {
              const hasCheats = session.cheat_log && session.cheat_log.length > 0
              const isExpanded = expandedId === session.id

              return (
                <div key={session.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  {/* Row */}
                  <button
                    className="w-full text-left"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : session.id)
                    }
                  >
                    <div
                      className="grid items-center px-4 py-3 text-sm transition-colors"
                      style={{
                        gridTemplateColumns: '1fr 1fr 1fr 80px 80px 90px',
                        background: isExpanded ? 'var(--surface2)' : 'transparent',
                      }}
                    >
                      <span className="font-mono font-semibold">{session.student_code}</span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {formatDate(session.started_at)}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {formatDate(session.submitted_at)}
                      </span>
                      <span>
                        <span
                          className={`badge badge-${session.chosen_level.toLowerCase()}`}
                        >
                          {session.chosen_level}
                        </span>
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {session.wordCountTotal}
                      </span>
                      <span>
                        {hasCheats ? (
                          <span className="badge badge-red">
                            {session.cheat_log.length} händelse
                            {session.cheat_log.length !== 1 ? 'r' : ''}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>–</span>
                        )}
                      </span>
                    </div>
                  </button>

                  {/* Expanded answers */}
                  {isExpanded && (
                    <div
                      className="px-4 pb-4 space-y-4"
                      style={{ background: 'var(--surface2)' }}
                    >
                      {hasCheats && (
                        <div
                          className="rounded-lg p-3 text-sm"
                          style={{ background: '#2e1a1a', border: '1px solid #4a2020' }}
                        >
                          <p className="font-semibold mb-2" style={{ color: '#f87171' }}>
                            Loggade fuskförsök
                          </p>
                          <ul className="space-y-1">
                            {session.cheat_log.map((ev, i) => (
                              <li key={i} style={{ color: '#fca5a5' }} className="text-xs">
                                {new Date(ev.timestamp).toLocaleTimeString('sv-SE')} –{' '}
                                {ev.type}
                                {ev.detail ? ` (${ev.detail})` : ''}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-3">
                        {questions.map((q, qi) => {
                          const answer = getAnswerForQuestion(session, q.id)
                          return (
                            <div key={q.id} className="card">
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                                  Fråga {qi + 1}
                                </span>
                                <span className={`badge badge-${q.level.toLowerCase()} text-xs`}>
                                  {q.level}
                                </span>
                              </div>
                              <p className="text-sm font-medium mb-2">{q.text}</p>
                              {answer ? (
                                <>
                                  <p
                                    className="text-sm rounded p-3"
                                    style={{
                                      background: 'var(--surface2)',
                                      color: 'var(--text)',
                                      whiteSpace: 'pre-wrap',
                                    }}
                                  >
                                    {answer.text || '(tomt svar)'}
                                  </p>
                                  <p
                                    className="text-xs mt-1"
                                    style={{ color: 'var(--text-muted)' }}
                                  >
                                    {answer.word_count} ord
                                  </p>
                                </>
                              ) : (
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                  Inget svar
                                </p>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
