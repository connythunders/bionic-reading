import { useState } from 'react'
import {
  ArrowLeft,
  Search,
  Mail,
  PenLine,
  Reply,
  Sparkles,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { messages } from '@/data/messages'
import type { Message } from '@/data/messages'
import { cn } from '@/lib/utils'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diffDays === 0) return 'Idag'
  if (diffDays === 1) return 'Igår'
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function MessagesView() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Message | null>(null)
  const [query, setQuery] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [aiOpen, setAiOpen] = useState(false)

  const unreadCount = messages.filter((m) => !m.isRead).length

  const filtered = messages.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.author.toLowerCase().includes(query.toLowerCase())
  )

  function handleSelectMessage(msg: Message) {
    setSelected(msg)
    setAiSummary(null)
    setAiOpen(false)
    setAiLoading(false)
  }

  function handleAiSummarize() {
    if (!selected) return
    setAiLoading(true)
    setAiSummary(null)
    setAiOpen(false)
    setTimeout(() => {
      const summary = `Sammanfattning: ${selected.title} — ${selected.body.split(' ').slice(0, 20).join(' ')}...`
      setAiSummary(summary)
      setAiOpen(true)
      setAiLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-950">
      {/* ── Mobile header ── */}
      <header className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900 md:hidden flex items-center gap-3">
        {selected ? (
          <button
            onClick={() => {
              setSelected(null)
              setAiSummary(null)
              setAiOpen(false)
            }}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
            aria-label="Tillbaka till meddelandelistan"
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
            aria-label="Tillbaka till startsidan"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex-1 truncate">
          {selected ? selected.title : 'Meddelanden'}
        </h1>
      </header>

      {/* ── 2-kolumn body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── Vänster panel: meddelandelista ─── */}
        <div
          className={cn(
            'flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex-shrink-0',
            'w-full md:w-[320px]',
            selected ? 'hidden md:flex' : 'flex'
          )}
        >
          {/* Panel-header (desktop) */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2 mb-3">
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                aria-label="Tillbaka till startsidan"
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1">
                Meddelanden
              </h1>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-blue-500 text-white text-xs font-semibold">
                  {unreadCount}
                </span>
              )}
              <button
                className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1.5"
                aria-label="Skriv nytt meddelande"
              >
                <PenLine size={13} aria-hidden="true" />
                Skriv
              </button>
            </div>

            {/* Mobil: olästa + skriv */}
            <div className="flex md:hidden items-center gap-2 mb-3">
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-blue-500 text-white text-xs font-semibold">
                  {unreadCount}
                </span>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400 flex-1">
                {unreadCount > 0 ? `${unreadCount} olästa` : 'Alla lästa'}
              </span>
              <button
                className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-3 py-2 text-sm font-semibold transition-colors flex items-center gap-1.5"
                aria-label="Skriv nytt meddelande"
              >
                <PenLine size={13} aria-hidden="true" />
                Skriv
              </button>
            </div>

            {/* Sökfält */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Sök meddelanden…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors"
                aria-label="Sök meddelanden"
              />
            </div>
          </div>

          {/* Meddelandelista */}
          <ul
            className="overflow-y-auto flex-1 list-none m-0 p-2 space-y-0.5"
            role="list"
            aria-label="Meddelandelista"
          >
            {filtered.length === 0 ? (
              <li className="flex flex-col items-center justify-center py-12 text-center">
                <Mail size={32} className="text-gray-300 dark:text-gray-600 mb-2" aria-hidden="true" />
                <p className="text-sm text-gray-400 dark:text-gray-500">Inga meddelanden hittades</p>
              </li>
            ) : (
              filtered.map((msg) => (
                <li key={msg.id}>
                  <button
                    onClick={() => handleSelectMessage(msg)}
                    className={cn(
                      'w-full text-left rounded-xl px-3 py-3 transition-colors',
                      !msg.isRead ? 'border-l-4 border-blue-500 pl-2' : '',
                      selected?.id === msg.id
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                    aria-current={selected?.id === msg.id ? 'true' : undefined}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Avatar */}
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-300"
                        aria-hidden="true"
                      >
                        {getInitials(msg.author)}
                      </div>
                      {/* Innehåll */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p
                            className={cn(
                              'text-sm leading-snug truncate flex-1',
                              !msg.isRead
                                ? 'font-semibold text-gray-900 dark:text-gray-100'
                                : 'text-gray-700 dark:text-gray-300'
                            )}
                          >
                            {msg.title}
                          </p>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!msg.isRead && (
                              <span
                                className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
                                aria-label="Oläst"
                              />
                            )}
                            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                              {formatDateShort(msg.date)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1">
                          {msg.author} · {msg.body}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* ─── Höger panel: meddelandedetalj ─── */}
        <div
          className={cn(
            'flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950',
            !selected ? 'hidden md:flex md:items-center md:justify-center' : 'flex flex-col'
          )}
        >
          {selected ? (
            <article
              className="flex-1 p-6 max-w-2xl w-full mx-auto"
              aria-label="Meddelandedetalj"
            >
              {/* Detaljkort */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5 mb-4 space-y-4">

                {/* Avsändar-header */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300 flex-shrink-0"
                      aria-hidden="true"
                    >
                      {getInitials(selected.author)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {selected.author}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Skickat {formatDate(selected.date)}
                      </p>
                    </div>
                  </div>

                  {/* Grupp-chip */}
                  {selected.groupId && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex-shrink-0">
                      Gruppspecifikt
                    </span>
                  )}
                </div>

                {/* Titel */}
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                  {selected.title}
                </h1>

                {/* AI-knapp */}
                <div>
                  <button
                    onClick={handleAiSummarize}
                    disabled={aiLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Sammanfatta meddelandet med AI"
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    {aiLoading ? 'Sammanfattar…' : 'AI – Sammanfatta'}
                  </button>
                </div>

                {/* AI-sammanfattning (collapsible) */}
                {aiSummary && (
                  <div>
                    <button
                      onClick={() => setAiOpen((v) => !v)}
                      className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 transition-colors mb-1"
                      aria-expanded={aiOpen}
                      aria-controls="ai-summary-content"
                    >
                      <Sparkles size={13} aria-hidden="true" />
                      AI-sammanfattning
                      <span className="text-xs text-gray-400 ml-1">
                        {aiOpen ? '▲ Dölj' : '▼ Visa'}
                      </span>
                    </button>
                    {aiOpen && (
                      <div
                        id="ai-summary-content"
                        className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3"
                        role="region"
                        aria-label="AI-genererad sammanfattning"
                      >
                        <Sparkles
                          size={15}
                          className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <p className="flex-1 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                          {aiSummary}
                        </p>
                        <button
                          onClick={() => setAiOpen(false)}
                          className="text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200 rounded p-0.5 transition-colors flex-shrink-0"
                          aria-label="Stäng sammanfattning"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Brödtext */}
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selected.body}
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                    <Reply size={14} aria-hidden="true" />
                    Svara
                  </button>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Mail size={28} className="text-gray-300 dark:text-gray-600" aria-hidden="true" />
              </div>
              <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                Välj ett meddelande
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Klicka på ett meddelande i listan för att läsa det
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
