import { useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { assignments } from '@/data/assignments'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'open' | 'closed'

function ProgressBar({ graded, total }: { graded: number; total: number }) {
  const pct = total > 0 ? Math.round((graded / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${graded} av ${total} rättade`}
      >
        <div
          className="h-full bg-green-500 dark:bg-green-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums min-w-[60px]">
        {graded} / {total}
      </span>
    </div>
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

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Tillbaka"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Uppgifter</h1>
          </div>
          <button
            onClick={() => navigate('/uppgifter/skapa')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
            aria-label="Skapa ny uppgift"
          >
            <Plus size={16} aria-hidden="true" />
            Ny uppgift
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mt-4" role="group" aria-label="Filtrera uppgifter">
          {(['all', 'open', 'closed'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-md font-medium transition-colors',
                filter === f
                  ? 'bg-green-700 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'Alla' : f === 'open' ? 'Öppna' : 'Avslutade'}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-3xl space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">
              Inga uppgifter matchar filtret
            </p>
          ) : (
            filtered.map(task => (
              <button
                key={task.id}
                onClick={() => navigate(`/uppgifter/${task.id}`)}
                className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors"
                aria-label={`Öppna uppgift: ${task.title}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {task.title}
                      </h2>
                      <span className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                        task.status === 'open'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      )}>
                        {task.status === 'open' ? 'Öppen' : 'Avslutad'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {task.groupName}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Inlämning: {new Date(task.dueDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
                    </p>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                      {task.submissions} inlämning{task.submissions !== 1 ? 'ar' : ''}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Rättade: {task.graded} av {task.submissions}
                  </p>
                  <ProgressBar graded={task.graded} total={task.submissions} />
                </div>
              </button>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
