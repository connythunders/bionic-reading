import { X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/data/user'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const tools = [
  { label: 'Närvaro',            icon: '📋', external: true },
  { label: 'Schema',             icon: '📅', external: true },
  { label: 'Office 365',         icon: '🔵', external: true },
  { label: 'Studieplan och IUP', icon: '📄', external: true },
  { label: 'Inläsningstjänst',   icon: '🎧', external: true },
  { label: 'Mail',               icon: '✉️', external: true },
  { label: 'Insidan (intranet)', icon: '🏫', external: true },
  { label: 'Stödinsatser',       icon: '🤝', external: true },
]

const mentorStudents = [
  { id: 's-01', name: 'Alex Bergström',   initials: 'AB', color: '#7c3aed' },
  { id: 's-02', name: 'Maja Lindqvist',   initials: 'ML', color: '#0369a1' },
  { id: 's-03', name: 'Erik Söderström',  initials: 'ES', color: '#b45309' },
]

export function RightPanel({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <aside
      className="right-panel w-72 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto flex flex-col"
      aria-label="Verktyg och profil"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Mina verktyg</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Stäng panel"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tools grid */}
      <div className="p-4">
        <ul
          className="grid grid-cols-3 gap-2 list-none m-0 p-0"
          role="list"
          aria-label="Verktyg"
        >
          {tools.map(tool => (
            <li key={tool.label}>
              <a
                href="#"
                className={cn(
                  'flex flex-col items-center gap-1.5 p-2 rounded-lg text-center',
                  'border border-gray-100 dark:border-gray-700',
                  'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                  'text-xs text-gray-600 dark:text-gray-300'
                )}
                aria-label={`${tool.label} (öppnas i ny flik)`}
              >
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-lg"
                  aria-hidden="true"
                >
                  {tool.icon}
                </span>
                <span className="line-clamp-2 leading-tight">{tool.label}</span>
                {tool.external && (
                  <ExternalLink size={10} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mx-4" />

      {/* Profile */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Profil</h2>
          <button
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Profilinställningar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: currentUser.color }}
            aria-label={`Profilbild för ${currentUser.name}`}
          >
            {currentUser.initials}
          </div>
        </div>
        <p className="text-center text-sm font-medium text-gray-900 dark:text-gray-100 mt-2">
          {currentUser.name}
        </p>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          {currentUser.school}
        </p>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mx-4" />

      {/* Mentor students */}
      <div className="p-4 pb-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Mina mentorselever
        </h2>
        <ul className="space-y-2 list-none m-0 p-0" role="list">
          {mentorStudents.map(s => (
            <li key={s.id}>
              <button className="flex items-center gap-2.5 w-full text-left p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                >
                  {s.initials}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{s.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
