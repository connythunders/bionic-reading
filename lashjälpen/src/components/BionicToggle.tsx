interface BionicToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function BionicToggle({ enabled, onToggle }: BionicToggleProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px] ${
        enabled
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      aria-label={enabled ? 'Stäng av Bionic Reading' : 'Aktivera Bionic Reading'}
      aria-pressed={enabled}
      title="Fetstil på ordens början som lässtöd. Experimentellt — forskningsstödet är begränsat, prova om det hjälper dig."
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16"/>
        <path d="M4 12h10"/>
        <path d="M4 18h7"/>
      </svg>
      Bionic
    </button>
  )
}
