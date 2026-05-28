import { useState, useRef } from 'react'
import {
  ArrowLeft,
  Users,
  FolderOpen,
  ClipboardList,
  ClipboardX,
  Upload,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { groups } from '@/data/groups'
import { assignments } from '@/data/assignments'
import { GroupIcon } from '@/components/shared/GroupIcon'

function formatDeadline(dateStr: string): { label: string; className: string } {
  const due = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )
  const label = due.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
  if (diffDays < 0) return { label, className: 'text-red-600 dark:text-red-400' }
  if (diffDays <= 3) return { label, className: 'text-amber-600 dark:text-amber-400' }
  return { label, className: 'text-gray-500 dark:text-gray-400' }
}

export function GroupView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const group = groups.find((g) => g.id === id)

  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500 dark:text-gray-400">Gruppen hittades inte.</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-green-700 dark:text-green-400 hover:underline"
        >
          ← Tillbaka
        </button>
      </div>
    )
  }

  const groupAssignments = assignments.filter((a) => a.groupId === id)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    // Filhantering skulle ske här
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
      {/* ─── Header med gradientbakgrund ─────────────────── */}
      <header
        className="px-6 pt-5 pb-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0"
        style={{ backgroundColor: `${group.color}0d` }} // 5% opacity av gruppfärgen
      >
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors mt-0.5"
            aria-label="Tillbaka"
          >
            <ArrowLeft size={18} />
          </button>

          <GroupIcon code={group.code} size="lg" color={group.color} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight truncate">
                {group.name}
              </h1>
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold text-white flex-shrink-0"
                style={{ backgroundColor: group.color }}
              >
                {group.subject}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Innehåll ─────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* ── Stats-rad (3 kort) ── */}
          <div className="grid grid-cols-3 gap-4">
            {/* Elever */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users size={18} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {group.memberCount}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Elever</span>
            </div>

            {/* Uppgifter */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <ClipboardList size={18} className="text-orange-600 dark:text-orange-400" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {groupAssignments.length}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Uppgifter</span>
            </div>

            {/* Material */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <FolderOpen size={18} className="text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">4</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Material</span>
            </div>
          </div>

          {/* ── Uppgifter-sektion ── */}
          <section aria-labelledby="group-tasks-heading">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <h2
                  id="group-tasks-heading"
                  className="text-base font-semibold text-gray-900 dark:text-gray-100"
                >
                  Uppgifter
                </h2>
                {groupAssignments.length > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {groupAssignments.length}
                  </span>
                )}
              </div>
              <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors">
                + Ny uppgift
              </button>
            </div>

            {groupAssignments.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-10 flex flex-col items-center gap-3 text-center">
                <ClipboardX
                  size={32}
                  className="text-gray-300 dark:text-gray-600"
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Inga uppgifter ännu
                </p>
              </div>
            ) : (
              <ul className="space-y-3 list-none m-0 p-0" role="list">
                {groupAssignments.map((a) => {
                  const deadline = formatDeadline(a.dueDate)
                  const progress =
                    a.total > 0
                      ? Math.round((a.submissions / a.total) * 100)
                      : 0
                  return (
                    <li key={a.id}>
                      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {a.title}
                            </p>
                            <p className={`text-xs mt-0.5 font-medium ${deadline.className}`}>
                              Deadline: {deadline.label}
                            </p>
                          </div>
                          <button
                            onClick={() => navigate(`/uppgifter/${a.id}`)}
                            className="text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 whitespace-nowrap flex-shrink-0 transition-colors"
                            aria-label={`Visa uppgift: ${a.title}`}
                          >
                            Visa →
                          </button>
                        </div>

                        {/* Progressbar */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Inlämnat
                            </span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {a.submissions} / {a.total}
                            </span>
                          </div>
                          <div
                            className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={a.submissions}
                            aria-valuemin={0}
                            aria-valuemax={a.total}
                            aria-label={`${a.submissions} av ${a.total} inlämnade`}
                          >
                            <div
                              className="h-full rounded-full bg-green-500 transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          {/* ── Material-sektion ── */}
          <section aria-labelledby="group-material-heading">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2
                id="group-material-heading"
                className="text-base font-semibold text-gray-900 dark:text-gray-100"
              >
                Material
              </h2>
              <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                <Upload size={14} aria-hidden="true" />
                Ladda upp
              </button>
            </div>

            {/* Drag-drop yta */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={[
                'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors',
                isDragging
                  ? 'border-green-400 bg-green-50 dark:bg-green-900/10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50/30 dark:hover:bg-green-900/5',
              ].join(' ')}
              role="button"
              tabIndex={0}
              aria-label="Dra och släpp filer eller klicka för att bläddra"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  fileInputRef.current?.click()
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp"
                aria-hidden="true"
                tabIndex={-1}
                onChange={() => {
                  // Filhantering skulle ske här
                }}
              />
              <Upload
                size={28}
                className={[
                  'mx-auto mb-3 transition-colors',
                  isDragging
                    ? 'text-green-500'
                    : 'text-gray-300 dark:text-gray-600',
                ].join(' ')}
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Dra och släpp filer hit
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                eller klicka för att bläddra
              </p>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">
                PDF, Word, bilder
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
