import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { assignments } from '@/data/assignments'

function daysUntil(dateStr: string) {
  const now = new Date('2026-03-28')
  const due = new Date(dateStr)
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

function DeadlineBadge({ dateStr }: { dateStr: string }) {
  const days = daysUntil(dateStr)
  if (days < 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
        <Clock size={10} aria-hidden="true" />
        Passerad
      </span>
    )
  }
  if (days === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
        <Clock size={10} aria-hidden="true" />
        Idag
      </span>
    )
  }
  if (days <= 3) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
        <Clock size={10} aria-hidden="true" />
        {days} dag{days > 1 ? 'ar' : ''}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
      {new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
    </span>
  )
}

function ProgressBar({ graded, submissions }: { graded: number; submissions: number }) {
  if (submissions === 0) return <span className="text-xs text-gray-400 dark:text-gray-500">Inga inlämningar</span>
  const pct = Math.round((graded / submissions) * 100)
  const allDone = graded === submissions
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden" aria-hidden="true">
        <div
          className={`h-full rounded-full transition-all ${allDone ? 'bg-green-600' : 'bg-orange-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-medium ${allDone ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
        {graded}/{submissions}
      </span>
    </div>
  )
}

export function TasksWidget() {
  const navigate = useNavigate()
  const openTasks = assignments.filter(a => a.status === 'open')

  return (
    <section
      aria-labelledby="tasks-heading"
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="tasks-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          Uppgifter
          {openTasks.length > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
              {openTasks.length} öppna
            </span>
          )}
        </h2>
        <button
          onClick={() => navigate('/uppgifter')}
          className="text-xs text-green-700 dark:text-green-400 hover:underline font-medium"
          aria-label="Se alla uppgifter"
        >
          Se alla →
        </button>
      </div>

      {openTasks.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">Inga öppna uppgifter</p>
      ) : (
        <ul className="space-y-2 list-none m-0 p-0" role="list">
          {openTasks.map(task => (
            <li key={task.id}>
              <button
                onClick={() => navigate(`/uppgifter/${task.id}`)}
                className="flex items-center gap-4 w-full text-left p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer"
                aria-label={`Öppna uppgift: ${task.title}`}
              >
                {/* Vänster: titel + grupp-badge */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    {task.title}
                  </p>
                  <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
                    {task.groupName}
                  </span>
                </div>

                {/* Mitten: progressbar */}
                <div className="hidden sm:flex flex-shrink-0">
                  <ProgressBar graded={task.graded} submissions={task.submissions} />
                </div>

                {/* Höger: deadline + pil */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <DeadlineBadge dateStr={task.dueDate} />
                  <ArrowRight size={14} className="text-gray-300 dark:text-gray-600" aria-hidden="true" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
