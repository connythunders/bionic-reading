import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, SendHorizontal, Star, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { assignments } from '@/data/assignments'
import { getSubmissionForStudent } from '@/data/submissions'
import { studentUser } from '@/data/user'
import { cn } from '@/lib/utils'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const AI_WRITING_HINT = `Förslag på struktur för din text:

**1. Inledning** – Introducera ämnet kortfattat med egna ord.

**2. Huvuddel** – Fördjupa dig i ämnet. Koppla till det vi gått igenom i klassen och ge ett konkret exempel.

**3. Reflektion** – Vad tycker du? Vad lärde du dig? Hur kan du använda detta?

💡 Tips: Börja med att skriva fritt i 5 minuter utan att tänka på stavning.`

export function SubmitAssignmentView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const assignment = assignments.find(a => a.id === id)
  const existingSub = id ? getSubmissionForStudent(id, studentUser.id) : undefined

  const [text, setText] = useState(existingSub?.text ?? '')
  const [submitted, setSubmitted] = useState(existingSub?.status === 'submitted' || existingSub?.status === 'graded')
  const [submittedAt, setSubmittedAt] = useState(existingSub?.submittedAt)

  // AI writing hint state
  const [aiHintOpen, setAiHintOpen] = useState(false)

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500 dark:text-gray-400">Uppgiften hittades inte.</p>
        <button onClick={() => navigate('/uppgifter')} className="text-sm text-green-700 hover:underline">← Tillbaka</button>
      </div>
    )
  }

  const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - new Date('2026-03-28').getTime()) / 86400000)
  const isOverdue = daysLeft < 0

  function handleSubmit() {
    if (!text.trim()) return
    setSubmitted(true)
    setSubmittedAt(new Date().toISOString())
  }

  function handleRetract() {
    setSubmitted(false)
    setSubmittedAt(null)
  }

  const deadlineColor = isOverdue ? 'red' : daysLeft <= 2 ? 'orange' : 'green'

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/uppgifter')}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Tillbaka till uppgifter"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{assignment.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.groupName}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-2xl space-y-5">

          {/* Deadline status banner */}
          <div className={cn(
            'flex items-center justify-between p-4 rounded-2xl border',
            deadlineColor === 'red'
              ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              : deadlineColor === 'orange'
              ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800'
              : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
          )}>
            <div className="flex items-center gap-2.5">
              <div className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center',
                deadlineColor === 'red'    ? 'bg-red-100 dark:bg-red-900/30' :
                deadlineColor === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                             'bg-green-100 dark:bg-green-900/30'
              )}>
                <Clock
                  size={15}
                  className={
                    deadlineColor === 'red'    ? 'text-red-600' :
                    deadlineColor === 'orange' ? 'text-orange-600' :
                                                 'text-green-700'
                  }
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className={cn(
                  'text-sm font-semibold',
                  deadlineColor === 'red'    ? 'text-red-800 dark:text-red-300' :
                  deadlineColor === 'orange' ? 'text-orange-800 dark:text-orange-300' :
                                               'text-green-800 dark:text-green-300'
                )}>
                  {isOverdue
                    ? 'Deadline passerad'
                    : daysLeft === 0
                    ? 'Deadline idag!'
                    : `${daysLeft} dag${daysLeft > 1 ? 'ar' : ''} kvar`}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{formatDate(assignment.dueDate)}</p>
              </div>
            </div>
            {submitted ? (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-700 dark:text-green-400">
                <CheckCircle size={16} aria-hidden="true" />
                Inlämnad
              </span>
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Ej inlämnad</span>
            )}
          </div>

          {/* Feedback from teacher (if graded) */}
          {existingSub?.status === 'graded' && existingSub.feedback && (
            <section
              aria-labelledby="feedback-heading"
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5"
            >
              <div className="flex items-start gap-4">
                {/* Teacher avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-xs font-bold">CL</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 id="feedback-heading" className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                      <Star size={14} className="text-yellow-500" aria-hidden="true" />
                      Lärarens återkoppling
                    </h2>
                    {existingSub.grade && (
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-700 text-white text-base font-bold shadow-sm ml-auto">
                        {existingSub.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {existingSub.feedback}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Assignment instructions */}
          <section
            aria-labelledby="instructions-heading"
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5"
          >
            <h2 id="instructions-heading" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                <BookOpen size={12} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              Instruktioner
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Skriv ett kortare reflekterande svar om ämnet. Tänk på att använda egna ord och koppla till det vi gått igenom i klassen.
            </p>
          </section>

          {/* Text submission area */}
          <section aria-labelledby="answer-heading">
            <h2 id="answer-heading" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Ditt svar
            </h2>

            {submitted ? (
              /* Success state */
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden">
                {/* Green success banner */}
                <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* Animated checkmark */}
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-sm">
                        <CheckCircle size={16} className="text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                          Uppgift inlämnad!
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          {submittedAt ? formatDateTime(submittedAt) : ''}
                        </p>
                      </div>
                    </div>
                    {existingSub?.status !== 'graded' && (
                      <button
                        onClick={handleRetract}
                        className="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors font-medium"
                      >
                        Dra tillbaka
                      </button>
                    )}
                  </div>
                </div>
                {/* Submitted text */}
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {text}
                  </p>
                </div>
              </div>
            ) : (
              /* Writing state */
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className={cn(
                    'w-full min-h-[220px] p-4 text-sm leading-relaxed resize-y',
                    'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
                    'placeholder-gray-400 dark:placeholder-gray-500',
                    'focus:outline-none border-0 ring-0',
                    'border-b border-gray-100 dark:border-gray-800'
                  )}
                  placeholder="Skriv ditt svar här…"
                  aria-label="Ditt svar på uppgiften"
                  aria-required="true"
                />

                {/* Bottom toolbar */}
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                      {text.length} tecken
                    </p>

                    {/* AI writing help button */}
                    <button
                      type="button"
                      onClick={() => setAiHintOpen(o => !o)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                      aria-expanded={aiHintOpen}
                      aria-controls="ai-hint-panel"
                    >
                      <Sparkles size={11} aria-hidden="true" />
                      {aiHintOpen ? (
                        <>Dölj förslag <ChevronUp size={11} aria-hidden="true" /></>
                      ) : (
                        <>AI – Kom igång <ChevronDown size={11} aria-hidden="true" /></>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                      text.trim()
                        ? 'bg-green-700 hover:bg-green-800 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    )}
                    aria-disabled={!text.trim()}
                  >
                    <SendHorizontal size={14} aria-hidden="true" />
                    Lämna in
                  </button>
                </div>
              </div>
            )}

            {/* AI hint expandable panel */}
            {!submitted && aiHintOpen && (
              <div
                id="ai-hint-panel"
                role="region"
                aria-label="AI-skrivhjälp"
                className="mt-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 animate-fade-in"
                style={{ animationDuration: '250ms' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={12} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wide">
                    Skrivstöd från AI
                  </p>
                </div>
                <div className="text-sm text-purple-900 dark:text-purple-200 leading-relaxed space-y-2 whitespace-pre-wrap">
                  {AI_WRITING_HINT.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={i} className="font-semibold text-purple-800 dark:text-purple-300">
                          {line.replace(/\*\*/g, '')}
                        </p>
                      )
                    }
                    if (line.startsWith('**') && line.includes('**')) {
                      const parts = line.split('**')
                      return (
                        <p key={i}>
                          {parts.map((part, j) =>
                            j % 2 === 1
                              ? <strong key={j} className="font-semibold text-purple-800 dark:text-purple-300">{part}</strong>
                              : <span key={j}>{part}</span>
                          )}
                        </p>
                      )
                    }
                    if (line === '') return <div key={i} className="h-1" />
                    return <p key={i}>{line}</p>
                  })}
                </div>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
