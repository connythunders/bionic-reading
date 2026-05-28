import { useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, Circle } from 'lucide-react'
import { assignments } from '@/data/assignments'
import { submissions } from '@/data/submissions'
import { studentUser } from '@/data/user'
import { cn } from '@/lib/utils'

const STUDENT_ID = studentUser.id
const ENROLLED = studentUser.enrolledGroupIds

function daysUntil(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - new Date('2026-03-28').getTime()) / 86400000)
}

export function StudentAssignmentsView() {
  const navigate = useNavigate()
  const myAssignments = assignments.filter(a => ENROLLED.includes(a.groupId))

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Mina uppgifter</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {myAssignments.filter(a => {
            const sub = submissions.find(s => s.assignmentId === a.id && s.studentId === STUDENT_ID)
            return !sub || sub.status === 'not_submitted'
          }).length} ej inlämnade
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-2xl space-y-3">
          {myAssignments.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">Inga uppgifter.</p>
          ) : (
            myAssignments.map(a => {
              const sub = submissions.find(s => s.assignmentId === a.id && s.studentId === STUDENT_ID)
              const days = daysUntil(a.dueDate)
              const isSubmitted = sub && sub.status !== 'not_submitted'
              const isGraded = sub?.status === 'graded'
              const isOverdue = days < 0 && !isSubmitted

              return (
                <button
                  key={a.id}
                  onClick={() => navigate(`/uppgifter/${a.id}`)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-colors',
                    'bg-white dark:bg-gray-800',
                    isOverdue
                      ? 'border-red-200 dark:border-red-900'
                      : isSubmitted
                      ? 'border-green-200 dark:border-green-900 hover:border-green-400 dark:hover:border-green-700'
                      : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-800'
                  )}
                  aria-label={`Uppgift: ${a.title}. Status: ${isGraded ? 'Rättad med betyg ' + sub!.grade : isSubmitted ? 'Inlämnad' : isOverdue ? 'Deadline passerad' : `${days} dagar kvar`}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Status icon */}
                    <div className="mt-0.5 flex-shrink-0">
                      {isGraded ? (
                        <CheckCircle size={18} className="text-green-600 dark:text-green-400" aria-hidden="true" />
                      ) : isSubmitted ? (
                        <CheckCircle size={18} className="text-blue-500 dark:text-blue-400" aria-hidden="true" />
                      ) : isOverdue ? (
                        <Clock size={18} className="text-red-500" aria-hidden="true" />
                      ) : (
                        <Circle size={18} className={days <= 2 ? 'text-orange-400' : 'text-gray-300 dark:text-gray-600'} aria-hidden="true" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{a.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{a.groupName}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {isGraded && sub?.grade ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-700 text-white text-sm font-bold">
                              {sub.grade}
                            </span>
                          ) : isSubmitted ? (
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                              Inlämnad
                            </span>
                          ) : isOverdue ? (
                            <span className="text-xs font-medium text-red-600 dark:text-red-400">Försenad</span>
                          ) : days <= 1 ? (
                            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">Idag!</span>
                          ) : (
                            <span className="text-xs text-gray-400 dark:text-gray-500">{days} dagar</span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Deadline: {new Date(a.dueDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })}
                      </p>

                      {isGraded && sub?.feedback && (
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1.5 italic">
                          Feedback tillgänglig →
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}
