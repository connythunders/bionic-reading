import { X, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/data/user'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const tools = [
  { label: 'Närvaro',            emoji: '📋', bg: 'bg-green-50  dark:bg-green-900/20',  ring: 'ring-green-200  dark:ring-green-800'  },
  { label: 'Schema',             emoji: '📅', bg: 'bg-blue-50   dark:bg-blue-900/20',   ring: 'ring-blue-200   dark:ring-blue-800'   },
  { label: 'Office 365',         emoji: '🔵', bg: 'bg-sky-50    dark:bg-sky-900/20',    ring: 'ring-sky-200    dark:ring-sky-800'    },
  { label: 'Studieplan och IUP', emoji: '📄', bg: 'bg-violet-50 dark:bg-violet-900/20', ring: 'ring-violet-200 dark:ring-violet-800' },
  { label: 'Inläsningstjänst',   emoji: '🎧', bg: 'bg-orange-50 dark:bg-orange-900/20', ring: 'ring-orange-200 dark:ring-orange-800' },
  { label: 'Mail',               emoji: '✉️', bg: 'bg-red-50    dark:bg-red-900/20',    ring: 'ring-red-200    dark:ring-red-800'    },
  { label: 'Insidan',            emoji: '🏫', bg: 'bg-teal-50   dark:bg-teal-900/20',   ring: 'ring-teal-200   dark:ring-teal-800'   },
  { label: 'Stödinsatser',       emoji: '🤝', bg: 'bg-pink-50   dark:bg-pink-900/20',   ring: 'ring-pink-200   dark:ring-pink-800'   },
]

const mentorStudents = [
  { id: 's-01', name: 'Alex Bergström',  initials: 'AB', color: '#7c3aed' },
  { id: 's-02', name: 'Maja Lindqvist',  initials: 'ML', color: '#0369a1' },
  { id: 's-03', name: 'Erik Söderström', initials: 'ES', color: '#b45309' },
]

export function RightPanel({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <aside
      className="right-panel w-72 flex-shrink-0 border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto flex flex-col"
      aria-label="Verktyg och profil"
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <h2 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Verktyg
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          aria-label="Stäng panel"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* ── Tools 2×4 grid ──────────────────────────────────────────────── */}
      <div className="p-4">
        <ul
          className="grid grid-cols-2 gap-2.5 list-none m-0 p-0"
          role="list"
          aria-label="Snabbverktyg"
        >
          {tools.map(tool => (
            <li key={tool.label}>
              <a
                href="#"
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-2xl text-center',
                  'bg-white dark:bg-gray-900',
                  'border border-gray-100 dark:border-gray-800',
                  'shadow-sm hover:shadow-md transition-shadow duration-200',
                  'text-xs text-gray-600 dark:text-gray-400',
                  'hover:text-gray-900 dark:hover:text-gray-100',
                )}
                aria-label={`${tool.label} (öppnas i ny flik)`}
              >
                <span
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full text-xl',
                    'ring-1',
                    tool.bg,
                    tool.ring,
                  )}
                  aria-hidden="true"
                >
                  {tool.emoji}
                </span>
                <span className="leading-tight font-medium">{tool.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      {/* ── Profile ─────────────────────────────────────────────────────── */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Profil
          </h2>
          <button
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1.5 transition-colors"
            aria-label="Profilinställningar"
          >
            <Settings size={14} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm"
            style={{ backgroundColor: currentUser.color }}
            aria-label={`Profilbild för ${currentUser.name}`}
          >
            {currentUser.initials}
          </div>
          <p className="mt-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {currentUser.name}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
            {currentUser.school}
          </p>
          <button className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <LogOut size={12} aria-hidden="true" />
            Logga ut
          </button>
        </div>
      </div>

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      {/* ── Mentor students ─────────────────────────────────────────────── */}
      <div className="p-4 pb-6">
        <h2 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-3">
          Mina mentorselever
        </h2>
        <ul className="space-y-1 list-none m-0 p-0" role="list">
          {mentorStudents.map(s => (
            <li key={s.id}>
              <button className="flex items-center gap-3 w-full text-left px-2 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                >
                  {s.initials}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {s.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
