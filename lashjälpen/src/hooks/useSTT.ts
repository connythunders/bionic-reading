import { useState, useCallback, useRef } from 'react'

interface SpeechRecognitionEvent {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  onstart: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export interface STTState {
  isListening: boolean
  transcript: string
  interimTranscript: string
  isSupported: boolean
  error: string | null
}

export function useSTT(lang: string = 'sv-SE') {
  const [state, setState] = useState<STTState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    isSupported:
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
    error: null,
  })

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startListening = useCallback((onResult?: (text: string) => void) => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Taligenkänning stöds inte i denna webbläsare.' }))
      return
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognitionAPI()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = lang

    recognition.onstart = () => {
      setState(prev => ({
        ...prev,
        isListening: true,
        error: null,
        interimTranscript: '',
      }))
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = ''
      let final = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          final += result[0].transcript
        } else {
          interim += result[0].transcript
        }
      }

      if (final) {
        setState(prev => {
          const newTranscript = prev.transcript + (prev.transcript ? ' ' : '') + final.trim()
          onResult?.(newTranscript)
          return {
            ...prev,
            transcript: newTranscript,
            interimTranscript: '',
          }
        })
      }

      if (interim) {
        setState(prev => ({ ...prev, interimTranscript: interim }))
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMessages: Record<string, string> = {
        'not-allowed': 'Mikrofontillgång nekad. Tillåt mikrofonen i webbläsaren.',
        'no-speech': 'Inget tal detekterades. Försök igen.',
        'audio-capture': 'Ingen mikrofon hittades.',
        'network': 'Nätverksfel. Kontrollera din internetanslutning.',
      }

      setState(prev => ({
        ...prev,
        isListening: false,
        error: errorMessages[event.error] || `Fel: ${event.error}`,
      }))
    }

    recognition.onend = () => {
      setState(prev => ({
        ...prev,
        isListening: false,
        interimTranscript: '',
      }))
    }

    recognitionRef.current = recognition
    setState(prev => ({ ...prev, transcript: '' }))
    recognition.start()
  }, [lang, state.isSupported])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
  }, [])

  const clearTranscript = useCallback(() => {
    setState(prev => ({
      ...prev,
      transcript: '',
      interimTranscript: '',
    }))
  }, [])

  return {
    ...state,
    startListening,
    stopListening,
    clearTranscript,
  }
}
