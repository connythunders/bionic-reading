export interface WordDefinition {
  word: string
  phonetic?: string
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      example?: string
    }[]
  }[]
  audioUrl?: string
}

/**
 * Look up a word using the Free Dictionary API.
 * Tries Swedish first, then falls back to English.
 */
export async function lookupWord(word: string, lang: string = 'sv'): Promise<WordDefinition | null> {
  const cleanWord = word.toLowerCase().replace(/[^a-zåäö]/g, '')
  if (!cleanWord) return null

  // Try the requested language first
  const languages = lang === 'sv' ? ['sv', 'en'] : [lang, 'en']

  for (const language of languages) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${language}/${encodeURIComponent(cleanWord)}`
      )

      if (!response.ok) continue

      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) continue

      const entry = data[0]

      const audioUrl = entry.phonetics?.find(
        (p: { audio?: string }) => p.audio
      )?.audio

      return {
        word: entry.word,
        phonetic: entry.phonetic,
        meanings: (entry.meanings || []).map(
          (m: { partOfSpeech: string; definitions: { definition: string; example?: string }[] }) => ({
            partOfSpeech: m.partOfSpeech,
            definitions: (m.definitions || []).slice(0, 3).map(
              (d: { definition: string; example?: string }) => ({
                definition: d.definition,
                example: d.example,
              })
            ),
          })
        ),
        audioUrl: audioUrl || undefined,
      }
    } catch {
      continue
    }
  }

  return null
}

/**
 * Pronounce a word using the Web Speech API.
 */
export function pronounceWord(word: string, lang: string = 'sv-SE'): void {
  if (!('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = lang
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}
