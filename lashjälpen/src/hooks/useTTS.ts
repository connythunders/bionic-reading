import { useState, useCallback, useRef, useEffect } from 'react'

export interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  currentWordIndex: number
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
}

export function useTTS(lang: string = 'sv-SE', rate: number = 1.0) {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    currentWordIndex: -1,
    isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    voices: [],
  })

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const wordsRef = useRef<string[]>([])
  const onWordChangeRef = useRef<((index: number) => void) | null>(null)

  // Load available voices
  useEffect(() => {
    if (!state.isSupported) return

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setState(prev => ({ ...prev, voices }))
    }

    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [state.isSupported])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (state.isSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [state.isSupported])

  const speak = useCallback((text: string, onWordChange?: (index: number) => void) => {
    if (!state.isSupported || !text.trim()) return

    window.speechSynthesis.cancel()

    const words = text.split(/\s+/).filter(w => w.length > 0)
    wordsRef.current = words
    onWordChangeRef.current = onWordChange || null

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate

    // Try to find a voice matching the language
    const voices = window.speechSynthesis.getVoices()
    const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]))
    if (langVoice) {
      utterance.voice = langVoice
    }

    // Word boundary tracking
    let wordIndex = 0
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setState(prev => ({ ...prev, currentWordIndex: wordIndex }))
        onWordChangeRef.current?.(wordIndex)
        wordIndex++
      }
    }

    utterance.onstart = () => {
      setState(prev => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        currentWordIndex: 0,
      }))
    }

    utterance.onend = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentWordIndex: -1,
      }))
      onWordChangeRef.current?.(-1)
    }

    utterance.onerror = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        currentWordIndex: -1,
      }))
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [lang, rate, state.isSupported])

  const pause = useCallback(() => {
    if (!state.isSupported) return
    window.speechSynthesis.pause()
    setState(prev => ({ ...prev, isPaused: true }))
  }, [state.isSupported])

  const resume = useCallback(() => {
    if (!state.isSupported) return
    window.speechSynthesis.resume()
    setState(prev => ({ ...prev, isPaused: false }))
  }, [state.isSupported])

  const stop = useCallback(() => {
    if (!state.isSupported) return
    window.speechSynthesis.cancel()
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentWordIndex: -1,
    }))
  }, [state.isSupported])

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
  }
}
