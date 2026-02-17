interface SyllableViewProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function SyllableView({ enabled, onToggle }: SyllableViewProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px] ${
        enabled
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      aria-label={enabled ? 'Stäng av stavelsehjälp' : 'Aktivera stavelsehjälp'}
      aria-pressed={enabled}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h16v3"/>
        <path d="M9 20h6"/>
        <path d="M12 4v16"/>
      </svg>
      Stavelser
    </button>
  )
}
