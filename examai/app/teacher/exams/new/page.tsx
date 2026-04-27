'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Level, Question } from '@/lib/types'

type Tab = 'ai' | 'file' | 'manual'

interface PreviewQuestion {
  text: string
  level: Level
  points: number
}

interface ManualQuestion {
  text: string
  level: Level
  points: number
}

export default function NewExamPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('ai')

  // AI tab
  const [topic, setTopic] = useState('')
  const [aiSubject, setAiSubject] = useState('')
  const [instructions, setInstructions] = useState('')
  const [levels, setLevels] = useState<Level[]>(['E', 'C', 'A'])
  const [aiAdaptive, setAiAdaptive] = useState(false)

  // File tab
  const [fileSubject, setFileSubject] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Manual tab
  const [manualQuestions, setManualQuestions] = useState<ManualQuestion[]>([
    { text: '', level: 'E', points: 1 },
  ])

  // Shared preview / save state
  const [previewQuestions, setPreviewQuestions] = useState<PreviewQuestion[]>([])
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')

  const [examTitle, setExamTitle] = useState('')
  const [timeLimit, setTimeLimit] = useState(45)
  const [saveAdaptive, setSaveAdaptive] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  function toggleLevel(l: Level) {
    setLevels((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]
    )
  }

  async function handleGenerate() {
    setGenerating(true)
    setGenError('')
    setPreviewQuestions([])

    const body: Record<string, unknown> = {
      subject: aiSubject || fileSubject,
      levels,
    }

    if (tab === 'ai') {
      body.topic = topic
      if (instructions) body.instructions = instructions
    } else if (tab === 'file') {
      if (!uploadedFile) {
        setGenError('Välj en fil först.')
        setGenerating(false)
        return
      }
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const uploadRes = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      })
      if (!uploadRes.ok) {
        setGenError('Kunde inte läsa filen.')
        setGenerating(false)
        return
      }
      const { text: fileText } = await uploadRes.json()
      body.fileText = fileText
    }

    const res = await fetch('/api/generate-exam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) {
      setGenError(data.error ?? 'Kunde inte generera frågor.')
      setGenerating(false)
      return
    }

    setPreviewQuestions(data.questions ?? [])
    setGenerating(false)
  }

  function handleManualAdd() {
    setManualQuestions((prev) => [...prev, { text: '', level: 'E', points: 1 }])
  }

  function handleManualMove(index: number, dir: -1 | 1) {
    setManualQuestions((prev) => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  function handleManualRemove(index: number) {
    setManualQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  function handleManualChange(
    index: number,
    field: keyof ManualQuestion,
    value: string | number
  ) {
    setManualQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    )
  }

  function getQuestionsToSave(): PreviewQuestion[] {
    if (tab === 'manual') {
      return manualQuestions.filter((q) => q.text.trim().length > 0)
    }
    return previewQuestions
  }

  async function handleSave() {
    const questions = getQuestionsToSave()
    if (!examTitle.trim()) {
      setSaveError('Ange en titel.')
      return
    }
    if (questions.length === 0) {
      setSaveError('Inga frågor att spara.')
      return
    }

    setSaving(true)
    setSaveError('')

    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      router.push('/')
      return
    }

    const subject = tab === 'file' ? fileSubject : aiSubject || 'Okänt ämne'

    const { data: exam, error: examError } = await supabase
      .from('exams')
      .insert({
        teacher_id: session.user.id,
        title: examTitle.trim(),
        subject,
        level: 'E',
        adaptive: saveAdaptive || (tab === 'ai' && aiAdaptive),
        archived: false,
        time_limit_minutes: timeLimit,
      })
      .select('id')
      .single()

    if (examError || !exam) {
      setSaveError(examError?.message ?? 'Kunde inte spara provet.')
      setSaving(false)
      return
    }

    const questionRows = questions.map((q, idx) => ({
      exam_id: exam.id,
      text: q.text,
      level: q.level,
      points: q.points,
      order_index: idx,
    }))

    const { error: questionsError } = await supabase
      .from('questions')
      .insert(questionRows)

    if (questionsError) {
      setSaveError(questionsError.message)
      setSaving(false)
      return
    }

    router.push('/teacher/dashboard')
  }

  const questionsForSave = getQuestionsToSave()
  const hasPreview = tab === 'manual' ? manualQuestions.some((q) => q.text.trim()) : previewQuestions.length > 0

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        className="px-6 py-3 flex items-center gap-4"
      >
        <a href="/teacher/dashboard" style={{ color: 'var(--text-muted)' }} className="text-sm">
          ← Tillbaka
        </a>
        <span className="text-xl font-bold">
          Exam<span style={{ color: 'var(--accent)' }}>AI</span>
        </span>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Skapa nytt prov</h1>

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-lg mb-6"
          style={{ background: 'var(--surface)' }}
        >
          {(['ai', 'file', 'manual'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPreviewQuestions([]) }}
              className="flex-1 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                background: tab === t ? 'var(--accent)' : 'transparent',
                color: tab === t ? 'white' : 'var(--text-muted)',
              }}
            >
              {t === 'ai' ? 'AI-generera' : t === 'file' ? 'Från fil' : 'Manuellt'}
            </button>
          ))}
        </div>

        {/* AI Tab */}
        {tab === 'ai' && (
          <div className="card space-y-4">
            <div>
              <label className="label">Ämne</label>
              <input
                type="text"
                className="input"
                value={aiSubject}
                onChange={(e) => setAiSubject(e.target.value)}
                placeholder="t.ex. Historia, Biologi..."
              />
            </div>
            <div>
              <label className="label">Ämnesområde / tema</label>
              <input
                type="text"
                className="input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="t.ex. Första världskriget, Fotosyntesen..."
              />
            </div>
            <div>
              <label className="label">
                Instruktioner till AI{' '}
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(valfritt)</span>
              </label>
              <textarea
                className="input"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="t.ex. Fokusera på orsaker och konsekvenser..."
              />
            </div>
            <div>
              <label className="label">Nivåer att inkludera</label>
              <div className="flex gap-3">
                {(['E', 'C', 'A'] as Level[]).map((l) => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={levels.includes(l)}
                      onChange={() => toggleLevel(l)}
                    />
                    <span className={`badge badge-${l.toLowerCase()}`}>{l}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={aiAdaptive}
                onChange={(e) => setAiAdaptive(e.target.checked)}
              />
              <span>Adaptivt prov (anpassas efter elevens prestationer)</span>
            </label>
            {genError && <p className="text-sm" style={{ color: '#f87171' }}>{genError}</p>}
            <button
              className="btn-primary"
              onClick={handleGenerate}
              disabled={generating || !topic.trim() || !aiSubject.trim()}
            >
              {generating ? 'Genererar...' : 'Generera frågor'}
            </button>
          </div>
        )}

        {/* File Tab */}
        {tab === 'file' && (
          <div className="card space-y-4">
            <div>
              <label className="label">Ämne</label>
              <input
                type="text"
                className="input"
                value={fileSubject}
                onChange={(e) => setFileSubject(e.target.value)}
                placeholder="t.ex. Historia, Biologi..."
              />
            </div>
            <div>
              <label className="label">Ladda upp fil (PDF eller Word)</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                  const f = e.dataTransfer.files[0]
                  if (f) setUploadedFile(f)
                }}
                onClick={() => document.getElementById('file-input')?.click()}
                className="rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors"
                style={{
                  borderColor: dragOver ? 'var(--accent)' : 'var(--border)',
                  background: dragOver ? 'rgba(124,111,205,0.05)' : 'var(--surface2)',
                }}
              >
                {uploadedFile ? (
                  <p className="text-sm font-medium">{uploadedFile.name}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">Dra och släpp fil här</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      eller klicka för att bläddra
                    </p>
                  </>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) setUploadedFile(f)
                  }}
                />
              </div>
            </div>
            {genError && <p className="text-sm" style={{ color: '#f87171' }}>{genError}</p>}
            <button
              className="btn-primary"
              onClick={handleGenerate}
              disabled={generating || !uploadedFile || !fileSubject.trim()}
            >
              {generating ? 'Analyserar...' : 'Generera frågor från fil'}
            </button>
          </div>
        )}

        {/* Manual Tab */}
        {tab === 'manual' && (
          <div className="card space-y-4">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Lägg till frågor manuellt. Använd pilarna för att ändra ordning.
            </p>
            {manualQuestions.map((q, idx) => (
              <div
                key={idx}
                className="rounded-lg p-4 space-y-3"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                    Fråga {idx + 1}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleManualMove(idx, -1)}
                      disabled={idx === 0}
                      className="btn-secondary py-1 px-2 text-xs"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleManualMove(idx, 1)}
                      disabled={idx === manualQuestions.length - 1}
                      className="btn-secondary py-1 px-2 text-xs"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleManualRemove(idx)}
                      className="btn-secondary py-1 px-2 text-xs"
                      style={{ color: '#f87171' }}
                    >
                      Ta bort
                    </button>
                  </div>
                </div>
                <textarea
                  className="input"
                  rows={2}
                  placeholder="Frågetext..."
                  value={q.text}
                  onChange={(e) => handleManualChange(idx, 'text', e.target.value)}
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="label">Nivå</label>
                    <select
                      className="input"
                      value={q.level}
                      onChange={(e) => handleManualChange(idx, 'level', e.target.value as Level)}
                    >
                      <option value="E">E – Grundläggande</option>
                      <option value="C">C – Tillämpande</option>
                      <option value="A">A – Analyserande</option>
                    </select>
                  </div>
                  <div style={{ width: 100 }}>
                    <label className="label">Poäng</label>
                    <input
                      type="number"
                      className="input"
                      min={1}
                      max={10}
                      value={q.points}
                      onChange={(e) => handleManualChange(idx, 'points', parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={handleManualAdd} className="btn-secondary w-full">
              + Lägg till fråga
            </button>
          </div>
        )}

        {/* Preview */}
        {tab !== 'manual' && previewQuestions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Förhandsgranskning</h2>
            <div className="space-y-3">
              {previewQuestions.map((q, idx) => (
                <div key={idx} className="card">
                  <div className="flex items-start gap-3">
                    <span
                      className={`badge badge-${q.level.toLowerCase()} shrink-0 mt-0.5`}
                    >
                      {q.level}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm">{q.text}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {q.points} poäng
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save section */}
        {hasPreview && (
          <div className="card mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Spara provet</h2>
            <div>
              <label className="label">Provtitel</label>
              <input
                type="text"
                className="input"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="t.ex. Prov – Första världskriget"
              />
            </div>
            <div>
              <label className="label">Tidsgräns (minuter)</label>
              <input
                type="number"
                className="input"
                style={{ maxWidth: 120 }}
                min={5}
                max={240}
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 45)}
              />
            </div>
            {tab !== 'manual' && (
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={saveAdaptive}
                  onChange={(e) => setSaveAdaptive(e.target.checked)}
                />
                <span>Adaptivt prov</span>
              </label>
            )}
            {saveError && (
              <p className="text-sm" style={{ color: '#f87171' }}>
                {saveError}
              </p>
            )}
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {questionsForSave.length} frågor kommer att sparas.
            </p>
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Sparar...' : 'Spara prov'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
