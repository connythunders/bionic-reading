import { ArrowUpRight, Clock } from 'lucide-react'
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
      <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
        <Clock size={11} aria-hidden="true" />
        Passerad
      </span>
    )
  }
  if (days === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-semibold">
        <Clock size={11} aria-hidden="true" />
        Idag
      </span>
    )
  }
  if (days <= 3) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-orange-500 dark:text-orange-400">
        <Clock size={11} aria-hidden="true" />
        {days} dag{days > 1 ? 'ar' : ''}
      </span>
    )
  }
  return (
    <span className="text-xs text-gray-400 dark:text-gray-500">
      {new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
    </span>
  )
}

export function TasksWidget() {
  const navigate = useNavigate()
  const openTasks = assignments.filter(a => a.status === 'open')

  return (
    <section
      aria-labelledby="tasks-heading"
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 col-span-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="tasks-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
          Uppgifter att ge feedback på
          <ArrowUpRight size={15} className="text-gray-400" aria-hidden="true" />
        </h2>
        <button
          onClick={() => navigate('/uppgifter')}
          className="text-xs text-green-700 dark:text-green-400 hover:underline"
          aria-label="Se alla uppgifter"
        >
          Se alla
        </button>
      </div>

      {openTasks.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 py-4">Inga öppna uppgifter</p>
      ) : (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[400px]" role="table">
            <thead>
              <tr className="text-left border-b border-gray-100 dark:border-gray-700">
                <th className="pb-2 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 font-normal" scope="col">
                  Uppgift
                </th>
                <th className="pb-2 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 font-normal" scope="col">
                  Grupp
                </th>
                <th className="pb-2 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 font-normal text-right" scope="col">
                  Inlämningar
                </th>
                <th className="pb-2 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 font-normal text-right" scope="col">
                  Klara
                </th>
                <th className="pb-2 px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 font-normal" scope="col">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {openTasks.map(task => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors cursor-pointer"
                  onClick={() => navigate(`/uppgifter/${task.id}`)}
                  role="row"
                >
                  <td className="py-2.5 px-1 font-medium text-gray-800 dark:text-gray-100">
                    {task.title}
                  </td>
                  <td className="py-2.5 px-1 text-gray-500 dark:text-gray-400 text-xs truncate max-w-[140px]">
                    {task.groupName}
                  </td>
                  <td className="py-2.5 px-1 text-right text-gray-700 dark:text-gray-300">
                    {task.submissions}
                  </td>
                  <td className="py-2.5 px-1 text-right">
                    <span className={task.graded === task.submissions && task.submissions > 0
                      ? 'text-green-600 dark:text-green-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                    }>
                      {task.graded} av {task.submissions}
                    </span>
                  </td>
                  <td className="py-2.5 px-1">
                    <DeadlineBadge dateStr={task.dueDate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
