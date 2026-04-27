'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Exam } from '@/lib/types'

interface ExamWithCount extends Exam {
  question_count: number
}

interface Stats {
  totalExams: number
  totalSubmissions: number
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [teacherName, setTeacherName] = useState('')
  const [exams, setExams] = useState<ExamWithCount[]>([])
  const [stats, setStats] = useState<Stats>({ totalExams: 0, totalSubmissions: 0 })
  const [loading, setLoading] = useState(true)

  // Filters
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [showArchived, setShowArchived] = useState(false)

  // Modal state
  const [codeModalExamId, setCodeModalExamId] = useState<string | null>(null)
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  const fetchData = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      router.push('/')
      return
    }

    const user = session.user
    setTeacherName(user.user_metadata?.name ?? user.email ?? 'Lärare')

    const { data: examsData } = await supabase
      .from('exams')
      .select('*, questions(count)')
      .eq('teacher_id', user.id)
      .order('created_at', { ascending: false })

    const mapped: ExamWithCount[] = (examsData ?? []).map((e) => ({
      ...e,
      question_count: Array.isArray(e.questions) ? (e.questions[0] as { count: number })?.count ?? 0 : 0,
    }))

    const { count: submissionCount } = await supabase
      .from('exam_sessions')
      .select('id', { count: 'exact', head: true })
      .in('exam_id', mapped.map((e) => e.id))

    setExams(mapped)
    setStats({
      totalExams: mapped.length,
      totalSubmissions: submissionCount ?? 0,
    })
    setLoading(false)
  }, [router])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handleArchiveToggle(exam: ExamWithCount) {
    await supabase.from('exams').update({ archived: !exam.archived }).eq('id', exam.id)
    setExams((prev) =>
      prev.map((e) => (e.id === exam.id ? { ...e, archived: !e.archived } : e))
    )
  }

  async function handleGenerateCode(examId: string) {
    setCodeModalExamId(examId)
    setGeneratedCode(null)
    setCodeLoading(true)
    setCodeCopied(false)
    const res = await fetch('/api/student-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examId }),
    })
    const data = await res.json()
    setGeneratedCode(data.code ?? null)
    setCodeLoading(false)
  }

  function handleCopyCode() {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode)
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    }
  }

  const allSubjects = Array.from(new Set(exams.map((e) => e.subject).filter(Boolean)))

  const filtered = exams.filter((e) => {
    if (!showArchived && e.archived) return false
    if (subjectFilter && e.subject !== subjectFilter) return false
    if (
      search &&
      !e.title.toLowerCase().includes(search.toLowerCase()) &&
      !e.subject.toLowerCase().includes(search.toLowerCase())
    )
      return false
    return true
  })

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
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
        className="px-6 py-3 flex items-center justify-between"
      >
        <span className="text-xl font-bold">
          Exam<span style={{ color: 'var(--accent)' }}>AI</span>
        </span>
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--text-muted)' }} className="text-sm">
            {teacherName}
          </span>
          <button onClick={handleLogout} className="btn-secondary text-sm py-1.5">
            Logga ut
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mina prov</h1>
          <Link href="/teacher/exams/new" className="btn-primary">
            + Skapa nytt prov
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              {stats.totalExams}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Skapade prov
            </p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              {stats.totalSubmissions}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Inlämningar totalt
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            className="input"
            style={{ maxWidth: 260 }}
            placeholder="Sök prov..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input"
            style={{ maxWidth: 200 }}
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">Alla ämnen</option>
            {allSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-muted)' }}>
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
              className="accent-purple-500"
            />
            Visa arkiverade
          </label>
        </div>

        {/* Exam list */}
        {filtered.length === 0 ? (
          <div className="card text-center py-12">
            <p style={{ color: 'var(--text-muted)' }}>
              {exams.length === 0 ? 'Inga prov ännu. Skapa ditt första!' : 'Inga prov matchar filtret.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((exam) => (
              <div key={exam.id} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h2 className="font-semibold text-lg truncate">{exam.title}</h2>
                      {exam.adaptive && (
                        <span className="badge" style={{ background: 'rgba(124,111,205,0.2)', color: 'var(--accent)' }}>
                          Adaptivt
                        </span>
                      )}
                      {exam.archived && (
                        <span className="badge" style={{ background: 'var(--surface2)', color: 'var(--text-muted)' }}>
                          Arkiverat
                        </span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {exam.subject} &middot; {exam.question_count} frågor &middot;{' '}
                      {exam.time_limit_minutes} min &middot;{' '}
                      {new Date(exam.created_at).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Link
                      href={`/teacher/exams/${exam.id}/submissions`}
                      className="btn-secondary text-sm py-1.5"
                    >
                      Inlämningar
                    </Link>
                    <button
                      onClick={() => handleGenerateCode(exam.id)}
                      className="btn-secondary text-sm py-1.5"
                    >
                      Generera kod
                    </button>
                    <button
                      onClick={() => handleArchiveToggle(exam)}
                      className="btn-secondary text-sm py-1.5"
                    >
                      {exam.archived ? 'Återställ' : 'Arkivera'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Code modal */}
      {codeModalExamId && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setCodeModalExamId(null)}
        >
          <div
            className="card w-full max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Elevkod genererad</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Ge denna kod till eleven. Den kan bara användas en gång.
            </p>
            {codeLoading ? (
              <p style={{ color: 'var(--text-muted)' }}>Genererar...</p>
            ) : (
              <>
                <div
                  className="rounded-lg py-4 px-6 mb-4 font-mono text-3xl font-bold tracking-widest"
                  style={{
                    background: 'var(--surface2)',
                    color: 'var(--accent)',
                    letterSpacing: '0.2em',
                  }}
                >
                  {generatedCode}
                </div>
                <button onClick={handleCopyCode} className="btn-primary w-full mb-3">
                  {codeCopied ? 'Kopierad!' : 'Kopiera kod'}
                </button>
              </>
            )}
            <button
              onClick={() => setCodeModalExamId(null)}
              className="btn-secondary w-full text-sm"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
