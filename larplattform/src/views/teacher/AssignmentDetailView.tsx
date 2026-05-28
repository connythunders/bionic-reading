import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, Users, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'
import { assignments } from '@/data/assignments'
import { getSubmissionsForAssignment, type Submission } from '@/data/submissions'
import { cn } from '@/lib/utils'

const GRADES = ['A', 'B', 'C', 'D', 'E', 'F']

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function SubmissionRow({ sub }: { sub: Submission }) {
  const [expanded, setExpanded] = useState(false)
  const [grade, setGrade] = useState(sub.grade ?? '')
  const [feedback, setFeedback] = useState(sub.feedback ?? '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const statusColor = {
    submitted: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    graded:    'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    not_submitted: 'bg-gray-50 text-gray-500 dark:bg-gray-700/30 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  }[sub.status]

  const statusLabel = { submitted: 'Inlämnad', graded: 'Rättad', not_submitted: 'Ej inlämnad' }[sub.status]

  return (
    <li className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      {/* Row header */}
      <button
        onClick={() => sub.status !== 'not_submitted' && setExpanded(e => !e)}
        className={cn(
          'flex items-center justify-between w-full text-left px-4 py-3 transition-colors',
          sub.status !== 'not_submitted' ? 'hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer' : 'cursor-default',
          expanded ? 'bg-gray-50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800'
        )}
        aria-expanded={expanded}
        aria-disabled={sub.status === 'not_submitted'}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: sub.studentId === 'u-002' ? '#7c3aed' : sub.studentId === 'u-003' ? '#0369a1' : '#b45309' }}
            aria-hidden="true"
          >
            {sub.studentInitials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{sub.studentName}</p>
            {sub.submittedAt && (
              <p className="text-xs text-gray-400 dark:text-gray-500">{formatDateTime(sub.submittedAt)}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {sub.grade && (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-700 text-white text-xs font-bold">
              {sub.grade}
            </span>
          )}
          <span className={cn('text-xs px-2 py-1 rounded-full border font-medium', statusColor)}>
            {statusLabel}
          </span>
          {sub.status !== 'not_submitted' && (
            expanded ? <ChevronUp size={16} className="text-gray-400" aria-hidden="true" /> : <ChevronDown size={16} className="text-gray-400" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Expanded: submission + feedback form */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4 bg-white dark:bg-gray-800">
          {/* Student's answer */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Elevens svar</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3">
              {sub.text}
            </p>
          </div>

          {/* Feedback form */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Återkoppling
            </p>

            {/* Grade selector */}
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1.5">Betyg</label>
              <div className="flex gap-1.5 flex-wrap" role="radiogroup" aria-label="Välj betyg">
                {GRADES.map(g => (
                  <label key={g} className={cn(
                    'flex items-center justify-center w-9 h-9 rounded-lg border font-bold text-sm cursor-pointer transition-colors',
                    grade === g
                      ? 'bg-green-700 border-green-700 text-white'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}>
                    <input
                      type="radio"
                      name={`grade-${sub.id}`}
                      value={g}
                      checked={grade === g}
                      onChange={() => setGrade(g)}
                      className="sr-only"
                      aria-label={`Betyg ${g}`}
                    />
                    {g}
                  </label>
                ))}
                {grade && (
                  <button
                    onClick={() => setGrade('')}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 hover:underline"
                    aria-label="Rensa betyg"
                  >
                    Rensa
                  </button>
                )}
              </div>
            </div>

            {/* Feedback textarea */}
            <div>
              <label htmlFor={`feedback-${sub.id}`} className="block text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                Kommentar
              </label>
              <textarea
                id={`feedback-${sub.id}`}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                rows={3}
                placeholder="Skriv din återkoppling till eleven…"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y leading-relaxed"
                aria-label="Återkoppling till eleven"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  saved
                    ? 'bg-green-50 text-green-700 border border-green-600 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-green-700 hover:bg-green-800 text-white'
                )}
              >
                <MessageSquare size={14} aria-hidden="true" />
                {saved ? 'Sparat!' : 'Spara återkoppling'}
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

export function AssignmentDetailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const assignment = assignments.find(a => a.id === id)
  const subs = id ? getSubmissionsForAssignment(id) : []

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500 dark:text-gray-400">Uppgiften hittades inte.</p>
        <button onClick={() => navigate('/uppgifter')} className="text-sm text-green-700 hover:underline">← Tillbaka</button>
      </div>
    )
  }

  const submitted = subs.filter(s => s.status !== 'not_submitted')
  const graded    = subs.filter(s => s.status === 'graded')
  const pct = submitted.length > 0 ? Math.round((graded.length / submitted.length) * 100) : 0

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/uppgifter')}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Tillbaka till uppgiftslistan"
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

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Users,        label: 'Elever i gruppen', value: assignment.total },
              { icon: CheckCircle,  label: 'Inlämningar',      value: submitted.length },
              { icon: Clock,        label: 'Rättade',          value: graded.length },
            ].map(stat => (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
                <stat.icon size={18} className="mx-auto text-gray-400 dark:text-gray-500 mb-1" aria-hidden="true" />
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          {submitted.length > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Rättningsframsteg</span>
                <span>{graded.length} / {submitted.length} ({pct}%)</span>
              </div>
              <div
                className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${pct}% rättade`}
              >
                <div
                  className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}

          {/* Submission list */}
          <section aria-labelledby="submissions-heading">
            <h2 id="submissions-heading" className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
              Inlämningar ({subs.length})
            </h2>
            {subs.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">Inga inlämningar ännu.</p>
            ) : (
              <ul className="space-y-2 list-none m-0 p-0" role="list">
                {subs.map(sub => <SubmissionRow key={sub.id} sub={sub} />)}
              </ul>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
