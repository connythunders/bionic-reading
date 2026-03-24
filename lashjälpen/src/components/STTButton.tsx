interface STTButtonProps {
  isListening: boolean
  isSupported: boolean
  interimTranscript: string
  error: string | null
  onStart: () => void
  onStop: () => void
}

export default function STTButton({
  isListening,
  isSupported,
  interimTranscript,
  error,
  onStart,
  onStop,
}: STTButtonProps) {
  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Taligenkänning stöds inte i denna webbläsare.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={isListening ? onStop : onStart}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px] ${
          isListening
            ? 'bg-danger text-white animate-pulse-recording'
            : 'bg-success text-white hover:bg-success-dark'
        }`}
        aria-label={isListening ? 'Sluta lyssna' : 'Diktera text'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
        {isListening ? 'Sluta lyssna' : 'Diktera'}
      </button>

      {isListening && interimTranscript && (
        <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-500 italic animate-fade-in">
          {interimTranscript}...
        </div>
      )}

      {error && (
        <div className="px-3 py-2 bg-red-50 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  )
}
