interface TTSControlsProps {
  isPlaying: boolean
  isPaused: boolean
  isSupported: boolean
  rate: number
  lang: string
  voices: SpeechSynthesisVoice[]
  onPlay: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onRateChange: (rate: number) => void
  onLangChange: (lang: string) => void
}

const LANGUAGES = [
  { code: 'sv-SE', label: 'Svenska' },
  { code: 'en-US', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'de-DE', label: 'Deutsch' },
  { code: 'fr-FR', label: 'Français' },
  { code: 'es-ES', label: 'Español' },
  { code: 'no-NO', label: 'Norsk' },
  { code: 'da-DK', label: 'Dansk' },
  { code: 'fi-FI', label: 'Suomi' },
]

export default function TTSControls({
  isPlaying,
  isPaused,
  isSupported,
  rate,
  lang,
  onPlay,
  onPause,
  onResume,
  onStop,
  onRateChange,
  onLangChange,
}: TTSControlsProps) {
  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Uppläsning stöds inte i denna webbläsare.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Playback controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {!isPlaying ? (
          <button
            onClick={onPlay}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Läs upp text"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Läs upp
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={onResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Fortsätt läsa"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Fortsätt
              </button>
            ) : (
              <button
                onClick={onPause}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-warning text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Pausa uppläsning"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
                Pausa
              </button>
            )}
            <button
              onClick={onStop}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-danger text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Stoppa uppläsning"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
              </svg>
              Stopp
            </button>
          </>
        )}
      </div>

      {/* Speed and language */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label htmlFor="tts-speed" className="text-sm text-gray-600 whitespace-nowrap">
            Hastighet: {rate.toFixed(1)}x
          </label>
          <input
            id="tts-speed"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            className="w-28 accent-primary"
            aria-label="Uppläsningshastighet"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="tts-lang" className="text-sm text-gray-600">
            Språk:
          </label>
          <select
            id="tts-lang"
            value={lang}
            onChange={(e) => onLangChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm min-h-[44px] bg-white"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
