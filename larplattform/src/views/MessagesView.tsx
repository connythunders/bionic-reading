import { useState } from 'react'
import { ArrowLeft, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { messages } from '@/data/messages'
import type { Message } from '@/data/messages'
import { cn } from '@/lib/utils'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('sv-SE', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export function MessagesView() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Message | null>(null)
  const [query, setQuery] = useState('')

  const filtered = messages.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.author.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-label="Tillbaka till startsidan"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Meddelanden</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* List */}
        <div className={cn(
          'flex flex-col border-r border-gray-200 dark:border-gray-700',
          selected ? 'hidden md:flex md:w-80 flex-shrink-0' : 'flex-1 md:w-80 md:flex-none'
        )}>
          {/* Search */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Sök meddelanden…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sök meddelanden"
              />
            </div>
          </div>

          <ul className="overflow-y-auto flex-1 divide-y divide-gray-100 dark:divide-gray-700/50 list-none m-0 p-0" role="list">
            {filtered.map(msg => (
              <li key={msg.id}>
                <button
                  onClick={() => setSelected(msg)}
                  className={cn(
                    'w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
                    selected?.id === msg.id && 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500'
                  )}
                  aria-current={selected?.id === msg.id ? 'true' : undefined}
                >
                  <p className={cn(
                    'text-sm leading-snug',
                    msg.isRead ? 'text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'
                  )}>
                    {msg.title}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {formatDate(msg.date)} · {msg.author}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Detail */}
        <div className={cn(
          'flex-1 overflow-y-auto',
          !selected && 'hidden md:flex md:items-center md:justify-center'
        )}>
          {selected ? (
            <article className="p-6 max-w-2xl">
              <button
                onClick={() => setSelected(null)}
                className="md:hidden flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400 hover:underline mb-4"
              >
                <ArrowLeft size={14} /> Tillbaka
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                {selected.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(selected.date)} · {selected.author}
              </p>
              <div className="mt-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selected.body}
              </div>
            </article>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Välj ett meddelande för att läsa det
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
