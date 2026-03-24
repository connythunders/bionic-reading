import { useRef, useMemo } from 'react'
import type { AppSettings } from '../hooks/useSettings'

interface TextEditorProps {
  text: string
  onTextChange: (text: string) => void
  settings: AppSettings
  highlightWordIndex: number
  isEditing: boolean
  onEditingChange: (editing: boolean) => void
  focusModeActive: boolean
  focusParagraphIndex: number
  onParagraphHover: (index: number) => void
  onWordClick: (word: string, rect: DOMRect) => void
  syllableMode: boolean
  syllableData: { word: string; syllables: string[] }[] | null
}

export default function TextEditor({
  text,
  onTextChange,
  settings,
  highlightWordIndex,
  isEditing,
  onEditingChange,
  focusModeActive,
  focusParagraphIndex,
  onParagraphHover,
  onWordClick,
  syllableMode,
  syllableData,
}: TextEditorProps) {
  const displayRef = useRef<HTMLDivElement>(null)

  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0
  }, [text])

  const charCount = text.length

  const textStyle: React.CSSProperties = {
    fontFamily: settings.fontFamily === 'OpenDyslexic' ? "'OpenDyslexic', Arial, sans-serif" : `${settings.fontFamily}, sans-serif`,
    fontSize: `${settings.fontSize}px`,
    letterSpacing: `${settings.letterSpacing}px`,
    wordSpacing: `${settings.wordSpacing}px`,
    lineHeight: settings.lineHeight,
    color: settings.textColor,
    textAlign: 'left',
  }

  const handleWordClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.dataset.word) {
      const rect = target.getBoundingClientRect()
      onWordClick(target.dataset.word, rect)
    }
  }

  const renderDisplayText = () => {
    if (!text.trim()) {
      return (
        <p className="text-gray-400 italic select-none" style={textStyle}>
          Klicka p&aring; &quot;Redigera text&quot; f&ouml;r att klistra in eller skriva din text h&auml;r...
        </p>
      )
    }

    if (syllableMode && syllableData) {
      let wordIdx = 0
      return (
        <div onClick={handleWordClick}>
          {syllableData.map((token, i) => {
            const isWord = /[\wåäöÅÄÖ]/.test(token.word)
            if (!isWord) {
              // Whitespace/punctuation
              if (token.word === '\n' || token.word.includes('\n')) {
                return <br key={i} />
              }
              return <span key={i}>{token.word}</span>
            }

            const currentWordIdx = wordIdx
            wordIdx++
            const isHighlighted = currentWordIdx === highlightWordIndex

            if (token.syllables.length <= 1) {
              return (
                <span
                  key={i}
                  data-word={token.word}
                  className={`cursor-pointer hover:underline ${isHighlighted ? 'tts-highlight' : ''}`}
                >
                  {token.word}
                </span>
              )
            }

            return (
              <span
                key={i}
                data-word={token.word}
                className={`cursor-pointer hover:underline ${isHighlighted ? 'tts-highlight' : ''}`}
              >
                {token.syllables.map((syl, j) => (
                  <span key={j}>
                    <span className={j % 2 === 0 ? 'syllable-a font-bold' : 'syllable-b'}>
                      {syl}
                    </span>
                    {j < token.syllables.length - 1 && (
                      <span className="text-gray-400 mx-px">&middot;</span>
                    )}
                  </span>
                ))}
              </span>
            )
          })}
        </div>
      )
    }

    // Normal display with paragraphs
    const paragraphs = text.split('\n')

    return (
      <div onClick={handleWordClick}>
        {paragraphs.map((para, pIdx) => {
          if (!para.trim()) {
            return <div key={pIdx} className="h-4" />
          }

          const paraClass = focusModeActive
            ? pIdx === focusParagraphIndex
              ? 'focus-active'
              : 'focus-dimmed'
            : ''

          const words = para.split(/(\s+)/)
          let wordOffset = 0
          // Count words in previous paragraphs
          for (let p = 0; p < pIdx; p++) {
            const prevWords = paragraphs[p].split(/\s+/).filter(w => w.length > 0)
            wordOffset += prevWords.length
          }

          let localWordIdx = 0

          return (
            <p
              key={pIdx}
              className={`mb-3 ${paraClass}`}
              onMouseEnter={() => onParagraphHover(pIdx)}
            >
              {words.map((segment, wIdx) => {
                if (/^\s+$/.test(segment)) {
                  return <span key={wIdx}>{segment}</span>
                }
                if (!segment) return null

                const globalIdx = wordOffset + localWordIdx
                localWordIdx++
                const isHighlighted = globalIdx === highlightWordIndex

                return (
                  <span
                    key={wIdx}
                    data-word={segment.replace(/[^\wåäöÅÄÖ]/g, '')}
                    className={`cursor-pointer hover:underline decoration-primary/30 ${
                      isHighlighted ? 'tts-highlight' : ''
                    }`}
                  >
                    {segment}
                  </span>
                )
              })}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <button
          onClick={() => onEditingChange(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px]"
          style={{
            backgroundColor: isEditing ? '#2E9E6E' : '#1E5FA8',
            color: 'white',
          }}
          aria-label={isEditing ? 'Visa text' : 'Redigera text'}
        >
          {isEditing ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Visa text
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Redigera text
            </>
          )}
        </button>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{wordCount} ord</span>
          <span>{charCount} tecken</span>
        </div>
      </div>

      {/* Editor / Display */}
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="flex-1 w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary resize-none transition-colors"
          style={{
            ...textStyle,
            backgroundColor: settings.backgroundColor,
            minHeight: '300px',
          }}
          placeholder="Klistra in eller skriv din text här..."
          autoFocus
        />
      ) : (
        <div
          ref={displayRef}
          className="flex-1 w-full p-6 rounded-xl border-2 border-gray-100 overflow-y-auto"
          style={{
            ...textStyle,
            backgroundColor: settings.backgroundColor,
            minHeight: '300px',
          }}
        >
          {renderDisplayText()}
        </div>
      )}
    </div>
  )
}
