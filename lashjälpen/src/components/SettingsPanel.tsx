import { useState } from 'react'
import type { AppSettings, UserProfile } from '../hooks/useSettings'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  rawSettings: AppSettings
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  onUpdateSettings: (partial: Partial<AppSettings>) => void
  onReset: () => void
  profiles: UserProfile[]
  onSaveProfile: (name: string) => void
  onLoadProfile: (name: string) => void
  onDeleteProfile: (name: string) => void
}

const BACKGROUND_PRESETS = [
  { name: 'Vit', color: '#FFFFFF' },
  { name: 'Kräm', color: '#FDF5E6' },
  { name: 'Gul', color: '#FFFDE7' },
  { name: 'Ljusblå', color: '#E3F2FD' },
  { name: 'Ljusgrön', color: '#E8F5E9' },
  { name: 'Lavendel', color: '#F3E5F5' },
  { name: 'Persika', color: '#FFF3E0' },
  { name: 'Mörkt', color: '#1A1A2E' },
]

const FONT_OPTIONS = [
  { value: 'OpenDyslexic' as const, label: 'OpenDyslexic' },
  { value: 'Arial' as const, label: 'Arial' },
  { value: 'Verdana' as const, label: 'Verdana' },
]

const RULER_COLORS = [
  '#FFE066', '#90CAF9', '#A5D6A7', '#CE93D8', '#FFAB91', '#80DEEA',
]

export default function SettingsPanel({
  isOpen,
  onClose,
  rawSettings,
  onUpdateSetting,
  onUpdateSettings,
  onReset,
  profiles,
  onSaveProfile,
  onLoadProfile,
  onDeleteProfile,
}: SettingsPanelProps) {
  const [profileName, setProfileName] = useState('')

  const handleSaveProfile = () => {
    const name = profileName.trim()
    if (!name) return
    onSaveProfile(name)
    setProfileName('')
  }

  const handleBgPreset = (color: string) => {
    const isDark = color === '#1A1A2E'
    onUpdateSettings({
      backgroundColor: color,
      textColor: isDark ? '#E0E0E0' : '#1A1A1A',
      highContrast: false,
    })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto animate-fade-in"
        role="dialog"
        aria-label="Inställningar"
        aria-modal="true"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Inställningar</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Stäng inställningar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Typography Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Typografi
            </h3>

            {/* Font family */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Typsnitt</label>
              <div className="flex gap-2 flex-wrap">
                {FONT_OPTIONS.map(font => (
                  <button
                    key={font.value}
                    onClick={() => onUpdateSetting('fontFamily', font.value)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                      rawSettings.fontFamily === font.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: font.value === 'OpenDyslexic' ? "'OpenDyslexic', Arial" : font.value }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font size */}
            <div className="mb-4">
              <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
                Textstorlek: {rawSettings.fontSize}px
              </label>
              <input
                id="fontSize"
                type="range"
                min="14"
                max="32"
                step="1"
                value={rawSettings.fontSize}
                onChange={(e) => onUpdateSetting('fontSize', parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>14px</span><span>32px</span>
              </div>
            </div>

            {/* Letter spacing */}
            <div className="mb-4">
              <label htmlFor="letterSpacing" className="block text-sm font-medium text-gray-700 mb-1">
                Teckenavstånd: {rawSettings.letterSpacing}px
              </label>
              <input
                id="letterSpacing"
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={rawSettings.letterSpacing}
                onChange={(e) => onUpdateSetting('letterSpacing', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Normal</span><span>+8px</span>
              </div>
            </div>

            {/* Word spacing */}
            <div className="mb-4">
              <label htmlFor="wordSpacing" className="block text-sm font-medium text-gray-700 mb-1">
                Ordavstånd: {rawSettings.wordSpacing}px
              </label>
              <input
                id="wordSpacing"
                type="range"
                min="0"
                max="16"
                step="1"
                value={rawSettings.wordSpacing}
                onChange={(e) => onUpdateSetting('wordSpacing', parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Normal</span><span>+16px</span>
              </div>
            </div>

            {/* Line height */}
            <div className="mb-4">
              <label htmlFor="lineHeight" className="block text-sm font-medium text-gray-700 mb-1">
                Radavstånd: {rawSettings.lineHeight.toFixed(1)}
              </label>
              <input
                id="lineHeight"
                type="range"
                min="1.2"
                max="3.0"
                step="0.1"
                value={rawSettings.lineHeight}
                onChange={(e) => onUpdateSetting('lineHeight', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1.2</span><span>3.0</span>
              </div>
            </div>
          </section>

          {/* Colors Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Färger
            </h3>

            {/* Background presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bakgrundsfärg</label>
              <div className="grid grid-cols-4 gap-2">
                {BACKGROUND_PRESETS.map(preset => (
                  <button
                    key={preset.color}
                    onClick={() => handleBgPreset(preset.color)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all min-h-[44px] ${
                      rawSettings.backgroundColor === preset.color
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                    aria-label={preset.name}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className="text-xs text-gray-600">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom color picker */}
            <div className="mb-4 flex items-center gap-3">
              <label htmlFor="customBg" className="text-sm font-medium text-gray-700">
                Egen färg:
              </label>
              <input
                id="customBg"
                type="color"
                value={rawSettings.backgroundColor}
                onChange={(e) => onUpdateSettings({
                  backgroundColor: e.target.value,
                  highContrast: false,
                })}
                className="w-12 h-10 rounded cursor-pointer border border-gray-200"
              />
            </div>

            {/* High contrast */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateSetting('highContrast', !rawSettings.highContrast)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  rawSettings.highContrast ? 'bg-primary' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={rawSettings.highContrast}
                aria-label="Hög kontrast"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    rawSettings.highContrast ? 'translate-x-5' : ''
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">Hög kontrast</span>
            </div>
          </section>

          {/* Reading Ruler Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Läslinjal
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => onUpdateSetting('rulerEnabled', !rawSettings.rulerEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  rawSettings.rulerEnabled ? 'bg-primary' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={rawSettings.rulerEnabled}
                aria-label="Läslinjal"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    rawSettings.rulerEnabled ? 'translate-x-5' : ''
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">Visa läslinjal</span>
            </div>

            {rawSettings.rulerEnabled && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Linjalfärg</label>
                  <div className="flex gap-2 flex-wrap">
                    {RULER_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => onUpdateSetting('rulerColor', color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          rawSettings.rulerColor === color
                            ? 'border-primary scale-110'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Linjalfärg ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="rulerHeight" className="block text-sm font-medium text-gray-700 mb-1">
                    Linjalhöjd: {rawSettings.rulerHeight} rad{rawSettings.rulerHeight !== 1 ? 'er' : ''}
                  </label>
                  <input
                    id="rulerHeight"
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    value={rawSettings.rulerHeight}
                    onChange={(e) => onUpdateSetting('rulerHeight', parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </>
            )}
          </section>

          {/* Profiles Section */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Profiler
            </h3>

            {/* Save new profile */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Profilnamn..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm min-h-[44px]"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
              />
              <button
                onClick={handleSaveProfile}
                disabled={!profileName.trim()}
                className="px-4 py-2.5 bg-success text-white rounded-lg text-sm font-medium hover:bg-success-dark transition-colors disabled:opacity-50 min-h-[44px]"
              >
                Spara
              </button>
            </div>

            {/* Existing profiles */}
            {profiles.length > 0 ? (
              <div className="space-y-2">
                {profiles.map(profile => (
                  <div
                    key={profile.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700">{profile.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onLoadProfile(profile.name)}
                        className="px-3 py-1.5 text-xs bg-primary text-white rounded-md hover:bg-primary-dark transition-colors min-h-[36px]"
                      >
                        Ladda
                      </button>
                      <button
                        onClick={() => onDeleteProfile(profile.name)}
                        className="px-3 py-1.5 text-xs bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors min-h-[36px]"
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Inga sparade profiler.</p>
            )}
          </section>

          {/* Reset */}
          <button
            onClick={onReset}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors min-h-[44px]"
          >
            Återställ till standard
          </button>
        </div>
      </div>
    </>
  )
}
