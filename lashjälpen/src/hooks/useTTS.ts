import { useState, useCallback, useRef, useEffect } from 'react'

export interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  currentWordIndex: number
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
}

export interface TTSChunk {
  text: string
  wordOffset: number
}

const MAX_CHUNK_CHARS = 200
const MIN_CHUNK_CHARS = 100

// Chrome silently stops mid-utterance after ~15 s with network voices, so long
// texts are queued as short chunks. Boundaries always fall on whitespace so the
// chunk word counts line up with the whitespace-split indices used for highlighting.
export function chunkText(text: string): TTSChunk[] {
  const chunks: TTSChunk[] = []
  let current = ''
  let wordOffset = 0
  let wordsInCurrent = 0

  const flush = () => {
    if (current.trim()) {
      chunks.push({ text: current.trim(), wordOffset })
      wordOffset += wordsInCurrent
    }
    current = ''
    wordsInCurrent = 0
  }

  for (const token of text.split(/(\s+)/)) {
    if (!token) continue
    if (/^\s+$/.test(token)) {
      if (token.includes('\n')) flush()
      else current += token
      continue
    }
    if (current.trim() && current.length + token.length > MAX_CHUNK_CHARS) flush()
    current += token
    wordsInCurrent++
    if (current.length >= MIN_CHUNK_CHARS && /[.!?:;…]["»”)\]]?$/.test(token)) flush()
  }
  flush()
  return chunks
}

function wordStarts(text: string): number[] {
  const starts: number[] = []
  const re = /\S+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) starts.push(m.index)
  return starts
}

function pickVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | null {
  const norm = (l: string) => l.toLowerCase().replace('_', '-')
  const target = norm(lang)
  const prefix = target.split('-')[0]
  return (
    voices.find(v => norm(v.lang) === target) ??
    voices.find(v => norm(v.lang).startsWith(prefix)) ??
    null
  )
}

export function useTTS(lang: string = 'sv-SE', rate: number = 1.0) {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    currentWordIndex: -1,
    isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    voices: [],
  })

  // Keeps utterances referenced; Chrome can garbage-collect them mid-speech otherwise.
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([])
  const sessionRef = useRef(0)
  const onWordChangeRef = useRef<((index: number) => void) | null>(null)

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

  useEffect(() => {
    return () => {
      if (state.isSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [state.isSupported])

  const resetPlayback = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentWordIndex: -1,
    }))
  }, [])

  const speak = useCallback((text: string, onWordChange?: (index: number) => void) => {
    if (!state.isSupported || !text.trim()) return

    window.speechSynthesis.cancel()
    const session = ++sessionRef.current
    onWordChangeRef.current = onWordChange || null

    const voice = pickVoice(window.speechSynthesis.getVoices(), lang)
    const chunks = chunkText(text)
    const utterances: SpeechSynthesisUtterance[] = []

    chunks.forEach((chunk, chunkIdx) => {
      const utterance = new SpeechSynthesisUtterance(chunk.text)
      utterance.lang = lang
      utterance.rate = rate
      if (voice) utterance.voice = voice

      const starts = wordStarts(chunk.text)

      utterance.onboundary = (event) => {
        if (session !== sessionRef.current || event.name !== 'word') return
        let local = 0
        for (let i = 0; i < starts.length; i++) {
          if (starts[i] <= event.charIndex) local = i
          else break
        }
        const index = chunk.wordOffset + local
        setState(prev => (prev.currentWordIndex === index ? prev : { ...prev, currentWordIndex: index }))
        onWordChangeRef.current?.(index)
      }

      if (chunkIdx === 0) {
        utterance.onstart = () => {
          if (session !== sessionRef.current) return
          setState(prev => ({ ...prev, isPlaying: true, isPaused: false, currentWordIndex: 0 }))
        }
      }

      if (chunkIdx === chunks.length - 1) {
        utterance.onend = () => {
          if (session !== sessionRef.current) return
          resetPlayback()
          onWordChangeRef.current?.(-1)
        }
      }

      utterance.onerror = (event) => {
        if (session !== sessionRef.current) return
        if (event.error === 'interrupted' || event.error === 'canceled') return
        resetPlayback()
      }

      utterances.push(utterance)
    })

    utterancesRef.current = utterances
    utterances.forEach(u => window.speechSynthesis.speak(u))
  }, [lang, rate, state.isSupported, resetPlayback])

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
    sessionRef.current++
    window.speechSynthesis.cancel()
    resetPlayback()
  }, [state.isSupported, resetPlayback])

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
  }
}
