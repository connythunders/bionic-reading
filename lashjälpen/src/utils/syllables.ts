/**
 * Swedish syllable splitting utility.
 *
 * Uses simplified Swedish phonotactic rules:
 * - Split between two consonants (VC-CV)
 * - Keep consonant clusters that can start a Swedish word together (e.g. str, sk, bl, etc.)
 * - Split before a single consonant between vowels (V-CV)
 * - Handle common Swedish prefixes and compound words
 */

const VOWELS = new Set('aeiouyåäöAEIOUYÅÄÖ')

// Consonant clusters that can begin a Swedish syllable
const ONSET_CLUSTERS = new Set([
  'bl', 'br', 'dr', 'dv', 'fl', 'fr', 'gl', 'gn', 'gr',
  'kl', 'kn', 'kr', 'kv', 'pl', 'pr', 'sk', 'sl', 'sm',
  'sn', 'sp', 'st', 'str', 'sv', 'tr', 'tv', 'vr',
  'skr', 'spl', 'spr', 'skv',
])

function isVowel(ch: string): boolean {
  return VOWELS.has(ch)
}

function canStartSyllable(cluster: string): boolean {
  return ONSET_CLUSTERS.has(cluster.toLowerCase())
}

/**
 * Split a single Swedish word into syllables.
 */
export function splitSwedishWord(word: string): string[] {
  if (word.length <= 2) return [word]

  const syllables: string[] = []
  let current = ''

  const chars = [...word]
  let i = 0

  while (i < chars.length) {
    const ch = chars[i]

    // If current char is a vowel, add it to current syllable
    if (isVowel(ch)) {
      current += ch
      i++

      // Look ahead for consonants between this vowel and the next
      let consonantRun = ''
      let j = i
      while (j < chars.length && !isVowel(chars[j])) {
        consonantRun += chars[j]
        j++
      }

      // If no more vowels after consonants, the rest belongs to this syllable
      if (j >= chars.length) {
        current += consonantRun
        i = j
        continue
      }

      // If there are consonants between two vowels, decide where to split
      if (consonantRun.length === 0) {
        // Two vowels in a row — keep going (diphthong or separate syllable)
        continue
      } else if (consonantRun.length === 1) {
        // Single consonant goes to the next syllable (V-CV)
        syllables.push(current)
        current = ''
        // Don't advance i; the consonant will be picked up next iteration
        continue
      } else {
        // Multiple consonants: find the largest valid onset for the next syllable
        let splitAt = 1 // default: first consonant stays, rest go to next syllable
        for (let k = consonantRun.length; k >= 2; k--) {
          const candidate = consonantRun.slice(consonantRun.length - k)
          if (canStartSyllable(candidate)) {
            splitAt = consonantRun.length - k
            break
          }
        }
        // Ensure at least one consonant stays in the current syllable
        if (splitAt === 0) splitAt = 1
        current += consonantRun.slice(0, splitAt)
        syllables.push(current)
        current = ''
        i += splitAt
        continue
      }
    } else {
      // Consonant — just add to current syllable
      current += ch
      i++
    }
  }

  if (current) {
    syllables.push(current)
  }

  // Merge any syllable that is just consonants with its neighbor
  const merged: string[] = []
  for (const syl of syllables) {
    const hasVowel = [...syl].some(c => isVowel(c))
    if (!hasVowel && merged.length > 0) {
      merged[merged.length - 1] += syl
    } else if (!hasVowel && merged.length === 0) {
      merged.push(syl)
    } else {
      merged.push(syl)
    }
  }

  // If the first syllable has no vowel, merge with next
  if (merged.length > 1 && ![...merged[0]].some(c => isVowel(c))) {
    merged[1] = merged[0] + merged[1]
    merged.shift()
  }

  return merged.length > 0 ? merged : [word]
}

/**
 * Split text into words, preserving whitespace and punctuation,
 * and split each word into syllables.
 */
export function splitTextIntoSyllables(text: string): { word: string; syllables: string[] }[] {
  // Match words and non-word tokens (spaces, punctuation)
  const tokens = text.match(/[\wåäöÅÄÖ]+|[^\wåäöÅÄÖ]+/g) || []

  return tokens.map(token => {
    const isWord = /[\wåäöÅÄÖ]/.test(token)
    if (isWord && token.length > 1) {
      return { word: token, syllables: splitSwedishWord(token) }
    }
    return { word: token, syllables: [token] }
  })
}
