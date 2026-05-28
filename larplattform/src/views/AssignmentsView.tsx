import { useState } from 'react'
import { Plus, Clock, ClipboardX, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { assignments } from '@/data/assignments'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'open' | 'closed'

function ProgressBar({ graded, total }: { graded: number; total: number }) {
  const pct = total > 0 ? Math.round((graded / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${graded} av ${total} rättade`}
      >
        <div
          className="h-full bg-green-500 dark:bg-green-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums min-w-[72px] text-right">
        {graded}/{total} rättade
      </span>
    </div>
  )
}

function DeadlineBadge({ dueDate }: { dueDate: string }) {
  const days = Math.ceil((new Date(dueDate).getTime() - new Date('2026-03-28').getTime()) / 86400000)
  const label = new Date(dueDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
  const isOverdue = days < 0
  const isSoon = days >= 0 && days <= 2

  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg',
      isOverdue
        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
        : isSoon
        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    )}>
      <Clock size={11} aria-hidden="true" />
      {label}
    </span>
  )
}

export function AssignmentsView() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = assignments.filter(a => {
    if (filter === 'open')   return a.status === 'open'
    if (filter === 'closed') return a.status === 'closed'
    return true
  })

  const openCount   = assignments.filter(a => a.status === 'open').length
  const closedCount = assignments.filter(a => a.status === 'closed').length

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Uppgifter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              <span className="font-medium text-green-700 dark:text-green-400">{openCount} öppna</span>
              <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
              <span>{closedCount} avslutade</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/uppgifter/skapa')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-green-700 hover:bg-green-800 text-white rounded-xl transition-colors"
            aria-label="Skapa ny uppgift"
          >
            <Plus size={16} aria-hidden="true" />
            Ny uppgift
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5" role="group" aria-label="Filtrera uppgifter">
          {(['all', 'open', 'closed'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3.5 py-1.5 text-sm rounded-full font-medium transition-all duration-200',
                filter === f
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'Alla' : f === 'open' ? 'Öppna' : 'Avslutade'}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <ClipboardX size={28} className="text-gray-300 dark:text-gray-600" aria-hidden="true" />
            </div>
            <p className="text-base font-medium text-gray-500 dark:text-gray-400">Inga uppgifter än</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {filter === 'all'
                ? 'Skapa din första uppgift med knappen ovan.'
                : 'Inga uppgifter matchar det valda filtret.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl">
            {filtered.map(task => (
              <button
                key={task.id}
                onClick={() => navigate(`/uppgifter/${task.id}`)}
                className="w-full text-left bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer overflow-hidden"
                aria-label={`Öppna uppgift: ${task.title}`}
              >
                {/* Card top */}
                <div className="px-5 pt-4 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                      style={{ backgroundColor: '#166534' }}
                    >
                      {task.groupName.split('-')[0].trim()}
                    </span>
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
                      task.status === 'open'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                    )}>
                      {task.status === 'open' ? 'Öppen' : 'Avslutad'}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.groupName}</p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 dark:border-gray-800 mx-5" />

                {/* Card bottom */}
                <div className="px-5 py-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <DeadlineBadge dueDate={task.dueDate} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {task.submissions} inlämning{task.submissions !== 1 ? 'ar' : ''}
                    </span>
                  </div>
                  <ProgressBar graded={task.graded} total={task.submissions} />
                </div>

                {/* Footer CTA */}
                <div className="px-5 pb-4">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 dark:text-green-400">
                    Visa inlämningar
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
