import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { messages } from '@/data/messages'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function MessagesWidget() {
  const navigate = useNavigate()
  const recent = messages.slice(0, 3)

  return (
    <section aria-labelledby="messages-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 id="messages-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
          Meddelanden
          <ArrowUpRight size={15} className="text-gray-400" aria-hidden="true" />
        </h2>
        <button
          onClick={() => navigate('/meddelanden')}
          className="text-xs text-green-700 dark:text-green-400 hover:underline"
          aria-label="Se alla meddelanden"
        >
          Se alla
        </button>
      </div>

      <ul className="space-y-0 list-none m-0 p-0 divide-y divide-gray-100 dark:divide-gray-700" role="list">
        {recent.map(msg => (
          <li key={msg.id}>
            <button
              className="w-full text-left py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors -mx-1 px-1 rounded"
              onClick={() => navigate('/meddelanden')}
              aria-label={`Läs: ${msg.title}`}
            >
              <p className={`text-sm leading-snug ${msg.isRead ? 'font-normal text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                {msg.title}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {formatDate(msg.date)} · {msg.author}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => navigate('/meddelanden')}
          className="text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
        >
          Se alla →
        </button>
      </div>
    </section>
  )
}
