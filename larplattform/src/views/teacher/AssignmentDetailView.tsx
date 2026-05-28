import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, Users, ChevronDown, ChevronUp, Sparkles, Loader2, Save } from 'lucide-react'
import { assignments } from '@/data/assignments'
import { getSubmissionsForAssignment, type Submission } from '@/data/submissions'
import { cn } from '@/lib/utils'

const GRADES = ['A', 'B', 'C', 'D', 'E', 'F']

const feedbackByGrade: Record<string, string> = {
  A: 'Utmärkt arbete! Du visar en djup och nyanserad förståelse för ämnet. Din analys är välstrukturerad och du ger relevanta exempel från undervisningen. Fortsätt på samma spår!',
  B: 'Bra arbete! Du visar god förståelse och ger relevanta exempel. För att nå högsta betyg kan du fördjupa din analys ytterligare och göra fler kopplingar till källmaterial.',
  C: 'Godkänt arbete! Du visar förståelse för ämnet och har en tydlig struktur. Arbeta på att fördjupa dina resonemang och ge fler konkreta exempel.',
  D: 'Du visar grundläggande förståelse men arbetet behöver mer djup. Försök att förklara mer utförligt och koppla tydligare till det vi gått igenom.',
  E: 'Du uppfyller grundkraven men det finns mycket att förbättra. Fokusera på att svara mer utförligt och visa att du förstår sammanhanget.',
  F: 'Arbetet uppfyller tyvärr inte kunskapskraven. Jag rekommenderar att vi tar ett enskilt samtal om hur du kan förbättra ditt arbete.',
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const AVATAR_COLORS: Record<string, string> = {
  'u-002': '#7c3aed',
  'u-003': '#0369a1',
  'u-004': '#b45309',
}

function SubmissionRow({ sub }: { sub: Submission }) {
  const [expanded, setExpanded] = useState(false)
  const [grade, setGrade] = useState(sub.grade ?? '')
  const [feedback, setFeedback] = useState(sub.feedback ?? '')
  const [saved, setSaved] = useState(false)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackAiGenerated, setFeedbackAiGenerated] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleGenerateFeedback() {
    if (!grade || feedbackLoading) return
    setFeedbackLoading(true)
    setFeedbackAiGenerated(false)
    setTimeout(() => {
      setFeedback(feedbackByGrade[grade] ?? '')
      setFeedbackLoading(false)
      setFeedbackAiGenerated(true)
    }, 1200)
  }

  const statusColor = {
    submitted:     'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    graded:        'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800',
    not_submitted: 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700',
  }[sub.status]

  const statusLabel = { submitted: 'Inlämnad', graded: 'Rättad', not_submitted: 'Ej inlämnad' }[sub.status]
  const avatarColor = AVATAR_COLORS[sub.studentId] ?? '#64748b'
  const canAI = grade.length > 0

  return (
    <li className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden">
      {/* Row header */}
      <button
        onClick={() => sub.status !== 'not_submitted' && setExpanded(e => !e)}
        className={cn(
          'flex items-center justify-between w-full text-left px-4 py-3.5 transition-colors',
          sub.status !== 'not_submitted'
            ? 'hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer'
            : 'cursor-default',
          expanded ? 'bg-gray-50 dark:bg-gray-800/40' : ''
        )}
        aria-expanded={expanded}
        aria-disabled={sub.status === 'not_submitted'}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-bold flex-shrink-0 shadow-sm"
            style={{ backgroundColor: avatarColor }}
            aria-hidden="true"
          >
            {sub.studentInitials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{sub.studentName}</p>
            {sub.submittedAt ? (
              <p className="text-xs text-gray-400 dark:text-gray-500">{formatDateTime(sub.submittedAt)}</p>
            ) : (
              <p className="text-xs text-gray-400 dark:text-gray-500">Inte inlämnad</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {sub.grade && (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-700 text-white text-xs font-bold shadow-sm">
              {sub.grade}
            </span>
          )}
          <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', statusColor)}>
            {statusLabel}
          </span>
          {sub.status !== 'not_submitted' && (
            expanded
              ? <ChevronUp size={16} className="text-gray-400" aria-hidden="true" />
              : <ChevronDown size={16} className="text-gray-400" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Expanded: submission + feedback form */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800">
          {/* Student's answer */}
          <div className="px-5 py-4">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
              Elevens svar
            </p>
            <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border-l-4 border-green-200 dark:border-green-800 italic">
              {sub.text}
            </blockquote>
          </div>

          {/* Feedback form */}
          <div className="px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Återkoppling
            </p>

            {/* Grade selector */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Betyg</label>
              <div className="flex gap-2 flex-wrap items-center" role="radiogroup" aria-label="Välj betyg">
                {GRADES.map(g => (
                  <label
                    key={g}
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all duration-150',
                      grade === g
                        ? 'bg-green-700 border-green-700 text-white shadow-sm scale-105'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10'
                    )}
                  >
                    <input
                      type="radio"
                      name={`grade-${sub.id}`}
                      value={g}
                      checked={grade === g}
                      onChange={() => { setGrade(g); setFeedbackAiGenerated(false) }}
                      className="sr-only"
                      aria-label={`Betyg ${g}`}
                    />
                    {g}
                  </label>
                ))}
                {grade && (
                  <button
                    onClick={() => { setGrade(''); setFeedbackAiGenerated(false) }}
                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 hover:underline"
                    aria-label="Rensa betyg"
                  >
                    Rensa
                  </button>
                )}
              </div>
            </div>

            {/* AI feedback button + textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <label htmlFor={`feedback-${sub.id}`} className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Kommentar
                  </label>
                  {feedbackAiGenerated && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-full">
                      <CheckCircle size={10} aria-hidden="true" />
                      AI-genererad
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleGenerateFeedback}
                  disabled={!canAI || feedbackLoading}
                  title={!canAI ? 'Välj ett betyg först' : 'Föreslå feedback med AI'}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors',
                    canAI && !feedbackLoading
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                  )}
                  aria-disabled={!canAI || feedbackLoading}
                >
                  {feedbackLoading
                    ? <Loader2 size={11} className="animate-spin" aria-hidden="true" />
                    : <Sparkles size={11} aria-hidden="true" />
                  }
                  {feedbackLoading ? 'Genererar…' : 'AI – Föreslå feedback'}
                </button>
              </div>
              <textarea
                id={`feedback-${sub.id}`}
                value={feedback}
                onChange={e => { setFeedback(e.target.value); setFeedbackAiGenerated(false) }}
                rows={4}
                placeholder="Skriv din återkoppling till eleven…"
                className={cn(
                  'w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400',
                  'bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y leading-relaxed',
                  feedbackAiGenerated
                    ? 'border-purple-200 dark:border-purple-800'
                    : 'border-gray-200 dark:border-gray-700'
                )}
                aria-label="Återkoppling till eleven"
              />
            </div>

            <button
              onClick={handleSave}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                saved
                  ? 'bg-green-50 text-green-700 border border-green-600 dark:bg-green-900/20 dark:text-green-300'
                  : 'bg-green-700 hover:bg-green-800 text-white shadow-sm'
              )}
            >
              <Save size={14} aria-hidden="true" />
              {saved ? 'Sparat! ✓' : 'Spara återkoppling'}
            </button>
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
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Tillbaka till uppgiftslistan"
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
        <div className="max-w-2xl space-y-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users,       label: 'Elever', value: assignment.total,   color: 'text-blue-600 dark:text-blue-400',  bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: CheckCircle, label: 'Inlämnade', value: submitted.length, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
              { icon: Clock,       label: 'Rättade',  value: graded.length,    color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-4 text-center"
              >
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2', stat.bg)}>
                  <stat.icon size={16} className={stat.color} aria-hidden="true" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          {submitted.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-4">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="font-medium text-gray-700 dark:text-gray-300">Rättningsframsteg</span>
                <span className="text-gray-500 dark:text-gray-400 tabular-nums">
                  {graded.length} / {submitted.length}
                  <span className="ml-1 text-green-700 dark:text-green-400 font-semibold">({pct}%)</span>
                </span>
              </div>
              <div
                className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${pct}% rättade`}
              >
                <div
                  className="h-full bg-green-600 dark:bg-green-500 rounded-full transition-all duration-500"
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
              <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">Inga inlämningar ännu.</p>
            ) : (
              <ul className="space-y-2.5 list-none m-0 p-0" role="list">
                {subs.map(sub => <SubmissionRow key={sub.id} sub={sub} />)}
              </ul>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
