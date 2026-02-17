import { useState, useCallback, useMemo } from 'react'
import { useSettings } from './hooks/useSettings'
import { useTTS } from './hooks/useTTS'
import { useSTT } from './hooks/useSTT'
import { splitTextIntoSyllables } from './utils/syllables'
import TextEditor from './components/TextEditor'
import TTSControls from './components/TTSControls'
import STTButton from './components/STTButton'
import ReadingRuler from './components/ReadingRuler'
import FocusMode from './components/FocusMode'
import SyllableView from './components/SyllableView'
import WordLookup from './components/WordLookup'
import SettingsPanel from './components/SettingsPanel'

const SAMPLE_TEXT = `Välkommen till LasHjälpen!

Det här är en läsassistent som hjälper dig att läsa texter på ett enklare sätt. Du kan ändra textstorlek, typsnitt och färger för att göra texten lättare att läsa.

Prova att klicka på "Läs upp" för att höra texten läsas högt. Du kan också klicka på enskilda ord för att slå upp vad de betyder.

Använd stavelsefunktionen för att dela upp ord i stavelser. Det kan göra det lättare att läsa längre ord.

Testa läslinjalen genom att slå på den i inställningarna. Den följer din mus och hjälper dig att hålla fokus på rätt rad.`

export default function App() {
  const {
    settings,
    rawSettings,
    updateSetting,
    updateSettings,
    resetSettings,
    profiles,
    saveProfile,
    loadProfile,
    deleteProfile,
  } = useSettings()

  const [text, setText] = useState(SAMPLE_TEXT)
  const [isEditing, setIsEditing] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [focusParagraphIndex, setFocusParagraphIndex] = useState(0)
  const [lookupWord, setLookupWord] = useState<string | null>(null)
  const [lookupPosition, setLookupPosition] = useState<{ top: number; left: number } | null>(null)

  const tts = useTTS(settings.ttsLang, settings.ttsRate)
  const stt = useSTT(settings.ttsLang)

  // Syllable data
  const syllableData = useMemo(() => {
    if (!settings.syllableMode) return null
    return splitTextIntoSyllables(text)
  }, [text, settings.syllableMode])

  // TTS handlers
  const handlePlay = useCallback(() => {
    tts.speak(text)
  }, [tts, text])

  // STT handler
  const handleSTTStart = useCallback(() => {
    stt.startListening((transcript) => {
      setText(prev => {
        if (!prev.trim()) return transcript
        return prev + '\n' + transcript
      })
    })
  }, [stt])

  // Word lookup
  const handleWordClick = useCallback((word: string, rect: DOMRect) => {
    const cleanWord = word.replace(/[^\wåäöÅÄÖ]/g, '')
    if (!cleanWord || cleanWord.length < 2) return
    setLookupWord(cleanWord)
    setLookupPosition({ top: rect.bottom, left: rect.left })
  }, [])

  const closeLookup = useCallback(() => {
    setLookupWord(null)
    setLookupPosition(null)
  }, [])

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: settings.backgroundColor }}
    >
      {/* Reading Ruler */}
      <ReadingRuler
        enabled={settings.rulerEnabled}
        color={settings.rulerColor}
        height={settings.rulerHeight}
        fontSize={settings.fontSize}
        lineHeight={settings.lineHeight}
      />

      {/* Word Lookup Popup */}
      <WordLookup
        word={lookupWord}
        position={lookupPosition}
        lang={settings.ttsLang}
        onClose={closeLookup}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200/50 backdrop-blur-sm" style={{ backgroundColor: `${settings.backgroundColor}ee` }}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div>
                <h1
                  className="text-xl font-bold"
                  style={{ color: settings.textColor }}
                >
                  LasHjälpen
                </h1>
                <p className="text-xs text-gray-500">Läsassistent</p>
              </div>
            </div>

            <button
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Öppna inställningar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Inställningar
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-start gap-4 mb-6">
          {/* TTS Controls */}
          <div className="flex-1 min-w-[280px]">
            <TTSControls
              isPlaying={tts.isPlaying}
              isPaused={tts.isPaused}
              isSupported={tts.isSupported}
              rate={settings.ttsRate}
              lang={settings.ttsLang}
              voices={tts.voices}
              onPlay={handlePlay}
              onPause={tts.pause}
              onResume={tts.resume}
              onStop={tts.stop}
              onRateChange={(r) => updateSetting('ttsRate', r)}
              onLangChange={(l) => updateSetting('ttsLang', l)}
            />
          </div>

          {/* STT */}
          <div>
            <STTButton
              isListening={stt.isListening}
              isSupported={stt.isSupported}
              interimTranscript={stt.interimTranscript}
              error={stt.error}
              onStart={handleSTTStart}
              onStop={stt.stopListening}
            />
          </div>
        </div>

        {/* Feature toggles */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <FocusMode
            enabled={settings.focusModeEnabled}
            onToggle={(v) => updateSetting('focusModeEnabled', v)}
          />
          <SyllableView
            enabled={settings.syllableMode}
            onToggle={(v) => updateSetting('syllableMode', v)}
          />

          {/* Quick font size controls */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => updateSetting('fontSize', Math.max(14, settings.fontSize - 2))}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Minska textstorlek"
            >
              A-
            </button>
            <span className="text-sm text-gray-500 px-2">{settings.fontSize}px</span>
            <button
              onClick={() => updateSetting('fontSize', Math.min(32, settings.fontSize + 2))}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Öka textstorlek"
            >
              A+
            </button>
          </div>
        </div>

        {/* Text editor / display */}
        <TextEditor
          text={text}
          onTextChange={setText}
          settings={settings}
          highlightWordIndex={tts.currentWordIndex}
          isEditing={isEditing}
          onEditingChange={setIsEditing}
          focusModeActive={settings.focusModeEnabled}
          focusParagraphIndex={focusParagraphIndex}
          onParagraphHover={setFocusParagraphIndex}
          onWordClick={handleWordClick}
          syllableMode={settings.syllableMode}
          syllableData={syllableData}
        />

        {/* Tip */}
        <div className="mt-6 p-4 bg-primary-light rounded-xl">
          <p className="text-sm" style={{ color: settings.textColor }}>
            <strong>Tips:</strong> Klicka på ett ord i texten för att slå upp dess betydelse. Använd knapparna ovan för att anpassa läsupplevelsen.
          </p>
        </div>
      </main>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        rawSettings={rawSettings}
        onUpdateSetting={updateSetting}
        onUpdateSettings={updateSettings}
        onReset={resetSettings}
        profiles={profiles}
        onSaveProfile={saveProfile}
        onLoadProfile={loadProfile}
        onDeleteProfile={deleteProfile}
      />
    </div>
  )
}
