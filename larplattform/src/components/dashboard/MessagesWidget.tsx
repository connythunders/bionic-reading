import { Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { messages } from '@/data/messages'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

export function MessagesWidget() {
  const navigate = useNavigate()
  const recent = messages.slice(0, 4)
  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <section aria-labelledby="messages-heading" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 id="messages-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          Meddelanden
          {unreadCount > 0 && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold"
              aria-label={`${unreadCount} olästa meddelanden`}
            >
              {unreadCount}
            </span>
          )}
        </h2>
        <button
          onClick={() => navigate('/meddelanden')}
          className="text-xs text-green-700 dark:text-green-400 hover:underline font-medium"
          aria-label="Se alla meddelanden"
        >
          Se alla →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500 gap-2">
          <Briefcase size={32} aria-hidden="true" />
          <p className="text-sm">Inga meddelanden</p>
        </div>
      ) : (
        <ul className="space-y-1 list-none m-0 p-0" role="list">
          {recent.map(msg => (
            <li key={msg.id}>
              <button
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${!msg.isRead ? 'border-l-2 border-blue-500 pl-2.5' : ''}`}
                onClick={() => navigate('/meddelanden')}
                aria-label={`Läs meddelande: ${msg.title}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm leading-snug flex-1 min-w-0 truncate ${msg.isRead ? 'font-normal text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                    {msg.title}
                  </p>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5">
                    {formatDate(msg.date)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{msg.author}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
