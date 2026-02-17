import { useState, useEffect, useRef } from 'react'
import { lookupWord, pronounceWord, type WordDefinition } from '../utils/wordLookup'

interface WordLookupProps {
  word: string | null
  position: { top: number; left: number } | null
  lang: string
  onClose: () => void
}

export default function WordLookup({ word, position, lang, onClose }: WordLookupProps) {
  const [definition, setDefinition] = useState<WordDefinition | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!word) {
      setDefinition(null)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    lookupWord(word, lang.split('-')[0]).then(result => {
      if (cancelled) return
      setLoading(false)
      if (result) {
        setDefinition(result)
      } else {
        setError(`Kunde inte hitta "${word}" i ordboken.`)
      }
    })

    return () => { cancelled = true }
  }, [word, lang])

  // Close on click outside
  useEffect(() => {
    if (!word) return

    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [word, onClose])

  if (!word || !position) return null

  // Position the popup, keeping it in viewport
  const style: React.CSSProperties = {
    position: 'fixed',
    top: `${Math.min(position.top + 8, window.innerHeight - 300)}px`,
    left: `${Math.min(Math.max(position.left - 100, 8), window.innerWidth - 320)}px`,
    zIndex: 50,
    maxWidth: '340px',
    width: '100%',
  }

  return (
    <div ref={popupRef} style={style} className="animate-fade-in" role="dialog" aria-label={`Definition av ${word}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{word}</h3>
            {definition?.phonetic && (
              <span className="text-sm text-gray-500">{definition.phonetic}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => pronounceWord(word, lang)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Uttala ${word}`}
              title="Uttala"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E5FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Stäng"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Söker...
          </div>
        )}

        {error && (
          <p className="text-sm text-gray-500 py-1">{error}</p>
        )}

        {definition && (
          <div className="space-y-3">
            {definition.meanings.map((meaning, i) => (
              <div key={i}>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {meaning.partOfSpeech}
                </span>
                <ul className="mt-1 space-y-1.5">
                  {meaning.definitions.map((def, j) => (
                    <li key={j} className="text-sm text-gray-700">
                      <span className="text-gray-400 mr-1">{j + 1}.</span>
                      {def.definition}
                      {def.example && (
                        <p className="text-xs text-gray-400 mt-0.5 italic">
                          &quot;{def.example}&quot;
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
