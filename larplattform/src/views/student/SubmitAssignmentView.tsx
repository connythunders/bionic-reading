import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, SendHorizontal, Star } from 'lucide-react'
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

export function SubmitAssignmentView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const assignment = assignments.find(a => a.id === id)
  const existingSub = id ? getSubmissionForStudent(id, studentUser.id) : undefined

  const [text, setText] = useState(existingSub?.text ?? '')
  const [submitted, setSubmitted] = useState(existingSub?.status === 'submitted' || existingSub?.status === 'graded')
  const [submittedAt, setSubmittedAt] = useState(existingSub?.submittedAt)

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

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/uppgifter')}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Tillbaka till uppgifter"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{assignment.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.groupName}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-2xl space-y-6">

          {/* Deadline + status bar */}
          <div className={cn(
            'flex items-center justify-between p-4 rounded-xl border',
            isOverdue
              ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              : daysLeft <= 2
              ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800'
              : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
          )}>
            <div className="flex items-center gap-2">
              <Clock size={16} className={isOverdue ? 'text-red-600' : daysLeft <= 2 ? 'text-orange-600' : 'text-green-700'} aria-hidden="true" />
              <div>
                <p className={`text-sm font-semibold ${isOverdue ? 'text-red-800 dark:text-red-300' : daysLeft <= 2 ? 'text-orange-800 dark:text-orange-300' : 'text-green-800 dark:text-green-300'}`}>
                  {isOverdue ? 'Deadline passerad' : daysLeft === 0 ? 'Deadline idag!' : `${daysLeft} dag${daysLeft > 1 ? 'ar' : ''} kvar`}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{formatDate(assignment.dueDate)}</p>
              </div>
            </div>
            {submitted ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400">
                <CheckCircle size={16} aria-hidden="true" />
                Inlämnad
              </span>
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">Ej inlämnad</span>
            )}
          </div>

          {/* Feedback from teacher (if graded) */}
          {existingSub?.status === 'graded' && existingSub.feedback && (
            <section aria-labelledby="feedback-heading" className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h2 id="feedback-heading" className="text-sm font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-2 mb-2">
                <Star size={15} aria-hidden="true" /> Lärarens återkoppling
              </h2>
              {existingSub.grade && (
                <p className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-1">
                  Betyg: {existingSub.grade}
                </p>
              )}
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                {existingSub.feedback}
              </p>
            </section>
          )}

          {/* Assignment instructions */}
          <section aria-labelledby="instructions-heading" className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 id="instructions-heading" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Instruktioner
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Skriv ett kortare reflekterande svar om ämnet. Tänk på att använda egna ord och koppla till det vi gått igenom i klassen.
            </p>
          </section>

          {/* Text submission area */}
          <section aria-labelledby="answer-heading">
            <h2 id="answer-heading" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ditt svar
            </h2>
            {submitted ? (
              <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-green-700 dark:text-green-400 flex items-center gap-1.5">
                    <CheckCircle size={13} aria-hidden="true" />
                    Inlämnad {submittedAt ? formatDateTime(submittedAt) : ''}
                  </span>
                  {existingSub?.status !== 'graded' && (
                    <button
                      onClick={handleRetract}
                      className="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:underline transition-colors"
                    >
                      Dra tillbaka
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {text}
                </p>
              </div>
            ) : (
              <>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className={cn(
                    'w-full min-h-[200px] p-4 rounded-xl border text-sm leading-relaxed resize-y',
                    'border-gray-200 dark:border-gray-600',
                    'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
                    'placeholder-gray-400 dark:placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  )}
                  placeholder="Skriv ditt svar här…"
                  aria-label="Ditt svar på uppgiften"
                  aria-required="true"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {text.length} tecken
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                      text.trim()
                        ? 'bg-green-700 hover:bg-green-800 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    )}
                    aria-disabled={!text.trim()}
                  >
                    <SendHorizontal size={15} aria-hidden="true" />
                    Lämna in
                  </button>
                </div>
              </>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
