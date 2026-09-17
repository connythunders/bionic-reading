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
  source?: { name: string; url: string }
}

// Language section headings as they appear on sv.wiktionary.org
const WIKTIONARY_LANG_NAMES: Record<string, string> = {
  sv: 'Svenska',
  en: 'Engelska',
  de: 'Tyska',
  fr: 'Franska',
  es: 'Spanska',
  no: 'Norska',
  nb: 'Norska',
  da: 'Danska',
  fi: 'Finska',
}

const DICTIONARYAPI_LANGS = new Set(['en', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'ko', 'ar', 'tr', 'hi'])

const PARTS_OF_SPEECH = new Set([
  'substantiv', 'verb', 'adjektiv', 'adverb', 'pronomen', 'preposition',
  'konjunktion', 'subjunktion', 'interjektion', 'räkneord', 'artikel', 'partikel',
  'prefix', 'suffix', 'egennamn', 'förkortning', 'förled', 'efterled', 'particip',
])

const NOISE_LINE = /^(Böjningar|Synonymer|Antonymer|Sammansättningar|Besläktade ord|Fraser|Etymologi|Uttal|Se även|Översättningar|Vanliga konstruktioner|Hyponymer|Hyperonymer|Kohyponymer|Varianter|Användning|Jämför|Homofoner|Anagram|Källor|Externa länkar|Grammatik|Avledningar|Exempel)\b/i

export function wiktionaryPageUrl(word: string): string {
  return `https://sv.wiktionary.org/wiki/${encodeURIComponent(word)}`
}

export function parseWiktionaryExtract(word: string, extract: string, langName: string): WordDefinition | null {
  const sections = extract.split(/^==(?!=)\s*(.+?)\s*==\s*$/m)
  let body: string | null = null
  for (let i = 1; i < sections.length; i += 2) {
    if (sections[i].trim().toLowerCase() === langName.toLowerCase()) {
      body = sections[i + 1]
      break
    }
  }
  if (!body) return null

  const meanings: WordDefinition['meanings'] = []
  const posParts = body.split(/^===(?!=)\s*(.+?)\s*===\s*$/m)
  for (let i = 1; i < posParts.length; i += 2) {
    const pos = posParts[i].trim()
    if (!PARTS_OF_SPEECH.has(pos.toLowerCase())) continue

    const content = posParts[i + 1].split(/^====/m)[0]
    const definitions = content
      .split('\n')
      .map(line => line.trim())
      .filter(line =>
        line &&
        !NOISE_LINE.test(line) &&
        line.toLowerCase() !== word.toLowerCase() &&
        (line.includes(' ') || line.length >= 12)
      )
      .slice(0, 3)
      .map(definition => ({ definition }))

    if (definitions.length) {
      meanings.push({ partOfSpeech: pos.toLowerCase(), definitions })
    }
  }

  if (!meanings.length) return null
  return {
    word,
    meanings,
    source: { name: 'Wiktionary', url: wiktionaryPageUrl(word) },
  }
}

async function lookupWiktionary(word: string, langName: string): Promise<WordDefinition | null> {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'extracts',
    explaintext: '1',
    exsectionformat: 'wiki',
    redirects: '1',
    format: 'json',
    origin: '*',
    titles: word,
  })
  const response = await fetch(`https://sv.wiktionary.org/w/api.php?${params}`)
  if (!response.ok) return null

  const data = await response.json()
  const pages = data?.query?.pages
  if (!pages) return null
  const page = Object.values(pages)[0] as { extract?: string } | undefined
  if (!page?.extract) return null

  return parseWiktionaryExtract(word, page.extract, langName)
}

async function lookupDictionaryApi(word: string, lang: string): Promise<WordDefinition | null> {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${encodeURIComponent(word)}`
  )
  if (!response.ok) return null

  const data = await response.json()
  if (!Array.isArray(data) || data.length === 0) return null
  const entry = data[0]

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
    source: { name: 'Free Dictionary API', url: `https://dictionaryapi.dev/` },
  }
}

// Swedish (and the other Nordic languages) live on sv.wiktionary; other languages
// fall back to the Free Dictionary API. Definitions from Wiktionary are in Swedish,
// which suits Swedish students reading a foreign-language text.
export async function lookupWord(word: string, lang: string = 'sv'): Promise<WordDefinition | null> {
  const cleanWord = word.replace(/[^\p{L}\p{M}'-]/gu, '').replace(/^[-']+|[-']+$/g, '')
  if (!cleanWord) return null

  const attempts: (() => Promise<WordDefinition | null>)[] = []
  const langName = WIKTIONARY_LANG_NAMES[lang]
  if (langName) {
    attempts.push(() => lookupWiktionary(cleanWord, langName))
    if (cleanWord !== cleanWord.toLowerCase()) {
      attempts.push(() => lookupWiktionary(cleanWord.toLowerCase(), langName))
    }
  }
  if (DICTIONARYAPI_LANGS.has(lang)) {
    attempts.push(() => lookupDictionaryApi(cleanWord.toLowerCase(), lang))
  }

  for (const attempt of attempts) {
    try {
      const result = await attempt()
      if (result) return result
    } catch {
      continue
    }
  }
  return null
}

export function pronounceWord(word: string, lang: string = 'sv-SE'): void {
  if (!('speechSynthesis' in window)) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = lang
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}
