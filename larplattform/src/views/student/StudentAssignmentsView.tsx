import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, Circle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { assignments } from '@/data/assignments'
import { submissions } from '@/data/submissions'
import { studentUser } from '@/data/user'
import { cn } from '@/lib/utils'

const STUDENT_ID = studentUser.id
const ENROLLED = studentUser.enrolledGroupIds

function daysUntil(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - new Date('2026-03-28').getTime()) / 86400000)
}

type AssignmentCardProps = {
  id: string
  title: string
  groupName: string
  dueDate: string
  grade?: string | null
  feedback?: string | null
  status: 'todo' | 'submitted' | 'graded' | 'overdue'
  days: number
  onClick: () => void
}

function AssignmentCard({ id, title, groupName, dueDate, grade, feedback, status, days, onClick }: AssignmentCardProps) {
  const iconConfig = {
    graded:    { icon: CheckCircle, color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20' },
    submitted: { icon: CheckCircle, color: 'text-blue-500 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/20' },
    overdue:   { icon: Clock,       color: 'text-red-500',                         bg: 'bg-red-50 dark:bg-red-900/20' },
    todo:      { icon: Circle,      color: days <= 2 ? 'text-orange-400' : 'text-gray-300 dark:text-gray-600', bg: days <= 2 ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-gray-100 dark:bg-gray-800' },
  }[status]

  const StatusIcon = iconConfig.icon

  const deadlineBadge = () => {
    if (status === 'graded' && grade) return null
    if (status === 'submitted') return (
      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
        Inlämnad
      </span>
    )
    if (status === 'overdue') return (
      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800">
        Försenad
      </span>
    )
    if (days <= 0) return (
      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">
        Idag!
      </span>
    )
    if (days <= 2) return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">
        <Clock size={10} aria-hidden="true" />{days} dag{days !== 1 ? 'ar' : ''} kvar
      </span>
    )
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700">
        <Clock size={10} aria-hidden="true" />{days} dagar kvar
      </span>
    )
  }

  const ariaLabel = `Uppgift: ${title}. Status: ${
    status === 'graded' ? `Rättad med betyg ${grade}` :
    status === 'submitted' ? 'Inlämnad' :
    status === 'overdue' ? 'Deadline passerad' :
    `${days} dagar kvar`
  }`

  return (
    <button
      key={id}
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer p-4"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-3">
        {/* Status icon circle */}
        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', iconConfig.bg)}>
          <StatusIcon size={20} className={iconConfig.color} aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">{title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{groupName}</p>
            </div>

            {/* Right side: grade circle OR deadline badge */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {status === 'graded' && grade ? (
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white text-base font-bold shadow-sm">
                  {grade}
                </span>
              ) : (
                deadlineBadge()
              )}
            </div>
          </div>

          {/* Deadline line */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
            Deadline: {new Date(dueDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })}
          </p>

          {/* Feedback chip */}
          {status === 'graded' && feedback && (
            <span className="inline-flex items-center gap-1 text-xs font-medium mt-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full">
              <MessageCircle size={10} aria-hidden="true" />
              Feedback tillgänglig
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function StudentAssignmentsView() {
  const navigate = useNavigate()
  const [submittedOpen, setSubmittedOpen] = useState(false)
  const myAssignments = assignments.filter(a => ENROLLED.includes(a.groupId))

  const categorized = myAssignments.map(a => {
    const sub = submissions.find(s => s.assignmentId === a.id && s.studentId === STUDENT_ID)
    const days = daysUntil(a.dueDate)
    const isGraded    = sub?.status === 'graded'
    const isSubmitted = sub && sub.status !== 'not_submitted' && !isGraded
    const isOverdue   = days < 0 && !isGraded && !isSubmitted
    const status: AssignmentCardProps['status'] = isGraded ? 'graded' : isSubmitted ? 'submitted' : isOverdue ? 'overdue' : 'todo'
    return { a, sub, days, status }
  })

  const todo      = categorized.filter(c => c.status === 'todo' || c.status === 'overdue')
  const submitted = categorized.filter(c => c.status === 'submitted')
  const graded    = categorized.filter(c => c.status === 'graded')

  const pendingCount = todo.length

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Mina uppgifter</h1>
          {pendingCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-red-500 text-white text-xs font-bold">
              {pendingCount}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {pendingCount === 0
            ? 'Allt är inlämnat – bra jobbat!'
            : `${pendingCount} uppgift${pendingCount !== 1 ? 'er' : ''} att lämna in`}
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        {myAssignments.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">Inga uppgifter.</p>
        ) : (
          <div className="max-w-2xl space-y-8">

            {/* Att göra */}
            {todo.length > 0 && (
              <section aria-labelledby="todo-heading">
                <h2 id="todo-heading" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Att göra
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                    {todo.length}
                  </span>
                </h2>
                <div className="space-y-2.5">
                  {todo.map(({ a, sub, days, status }) => (
                    <AssignmentCard
                      key={a.id}
                      id={a.id}
                      title={a.title}
                      groupName={a.groupName}
                      dueDate={a.dueDate}
                      grade={sub?.grade}
                      feedback={sub?.feedback}
                      status={status}
                      days={days}
                      onClick={() => navigate(`/uppgifter/${a.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Inlämnade (collapsible) */}
            {submitted.length > 0 && (
              <section aria-labelledby="submitted-heading">
                <button
                  className="flex items-center gap-2 mb-3 w-full text-left"
                  onClick={() => setSubmittedOpen(o => !o)}
                  aria-expanded={submittedOpen}
                  id="submitted-heading"
                >
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Inlämnade
                  </span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                    {submitted.length}
                  </span>
                  {submittedOpen
                    ? <ChevronUp size={14} className="text-gray-400 ml-auto" aria-hidden="true" />
                    : <ChevronDown size={14} className="text-gray-400 ml-auto" aria-hidden="true" />
                  }
                </button>
                {submittedOpen && (
                  <div className="space-y-2.5">
                    {submitted.map(({ a, sub, days, status }) => (
                      <AssignmentCard
                        key={a.id}
                        id={a.id}
                        title={a.title}
                        groupName={a.groupName}
                        dueDate={a.dueDate}
                        grade={sub?.grade}
                        feedback={sub?.feedback}
                        status={status}
                        days={days}
                        onClick={() => navigate(`/uppgifter/${a.id}`)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Rättade */}
            {graded.length > 0 && (
              <section aria-labelledby="graded-heading">
                <h2 id="graded-heading" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Rättade
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                    {graded.length}
                  </span>
                </h2>
                <div className="space-y-2.5">
                  {graded.map(({ a, sub, days, status }) => (
                    <AssignmentCard
                      key={a.id}
                      id={a.id}
                      title={a.title}
                      groupName={a.groupName}
                      dueDate={a.dueDate}
                      grade={sub?.grade}
                      feedback={sub?.feedback}
                      status={status}
                      days={days}
                      onClick={() => navigate(`/uppgifter/${a.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </main>
    </div>
  )
}
