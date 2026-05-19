import { describe, it, expect } from 'vitest'
import { splitSwedishWord, splitTextIntoSyllables } from './syllables'

// ---------------------------------------------------------------------------
// splitSwedishWord
// ---------------------------------------------------------------------------

describe('splitSwedishWord', () => {
  // ── Early-return: words of 1-2 characters are never split ──────────────
  describe('short words (≤2 chars)', () => {
    it('returns a single char as-is', () => {
      expect(splitSwedishWord('a')).toEqual(['a'])
    })

    it('returns a two-char word as-is', () => {
      expect(splitSwedishWord('el')).toEqual(['el'])
    })

    it('handles Swedish two-char word', () => {
      expect(splitSwedishWord('på')).toEqual(['på'])
    })

    it('handles Swedish two-char word with ä', () => {
      expect(splitSwedishWord('är')).toEqual(['är'])
    })
  })

  // ── V-CV rule: single consonant between vowels belongs to next syllable ─
  describe('V-CV pattern', () => {
    it('splits a simple CV-CV word', () => {
      expect(splitSwedishWord('skola')).toEqual(['sko', 'la'])
    })

    it('splits a word starting with a vowel', () => {
      // ö | ra  (single consonant r → goes to next syllable)
      expect(splitSwedishWord('öra')).toEqual(['ö', 'ra'])
    })

    it('splits a two-syllable noun', () => {
      // bo | ken
      expect(splitSwedishWord('boken')).toEqual(['bo', 'ken'])
    })

    it('splits a three-syllable word with vowel onset', () => {
      // ar | be | te
      expect(splitSwedishWord('arbete')).toEqual(['ar', 'be', 'te'])
    })
  })

  // ── Onset-cluster rule: consonant clusters that can open a Swedish ──────
  // syllable stay together at the start of the next syllable
  describe('onset cluster preservation', () => {
    it('keeps "skr" together (skr- cluster)', () => {
      // skri | va — 'v' is single consonant → V-CV applies
      expect(splitSwedishWord('skriva')).toEqual(['skri', 'va'])
    })

    it('keeps "str" together (str- cluster)', () => {
      // "strand" ends in consonants, so no split is needed
      expect(splitSwedishWord('strand')).toEqual(['strand'])
    })

    it('keeps "bl" cluster with next syllable', () => {
      // blå | bär
      expect(splitSwedishWord('blåbär')).toEqual(['blå', 'bär'])
    })

    it('keeps "kv" cluster with next syllable', () => {
      // kvin | na  (double 'n' splits: first n stays, second begins next)
      expect(splitSwedishWord('kvinna')).toEqual(['kvin', 'na'])
    })

    it('keeps "tr" cluster', () => {
      // träd is a single syllable (ends in consonant)
      expect(splitSwedishWord('träd')).toEqual(['träd'])
    })
  })

  // ── VC-CV rule: consonant clusters that cannot form an onset split ──────
  describe('VC-CV splitting (non-onset clusters)', () => {
    it('splits doubled consonant', () => {
      // bot | ten
      expect(splitSwedishWord('botten')).toEqual(['bot', 'ten'])
    })

    it('splits mp cluster', () => {
      // lam | pa  ("mp" is not a valid Swedish onset)
      expect(splitSwedishWord('lampa')).toEqual(['lam', 'pa'])
    })

    it('splits nd cluster', () => {
      // kun | skap  ("nd" is not a valid onset)
      expect(splitSwedishWord('kunskap')).toEqual(['kun', 'skap'])
    })
  })

  // ── Words that are a single syllable (end in consonants) ────────────────
  describe('single-syllable words', () => {
    it('does not split a word with no interior vowel boundary', () => {
      expect(splitSwedishWord('klass')).toEqual(['klass'])
    })

    it('does not split a CVC word', () => {
      expect(splitSwedishWord('hej')).toEqual(['hej'])
    })

    it('does not split a word ending in a consonant cluster', () => {
      expect(splitSwedishWord('stark')).toEqual(['stark'])
    })
  })

  // ── Swedish special characters (å, ä, ö) ────────────────────────────────
  describe('Swedish vowels å, ä, ö', () => {
    it('treats å as a vowel', () => {
      //ål | der
      expect(splitSwedishWord('ålder')).toEqual(['ål', 'der'])
    })

    it('treats ä as a vowel', () => {
      // vär | lden  (r stays in first syllable; ld cluster → l stays)
      expect(splitSwedishWord('världen')).toEqual(['vär', 'lden'])
    })

    it('treats ö as a vowel in multi-syllable word', () => {
      // Sve | ri | ge
      expect(splitSwedishWord('Sverige')).toEqual(['Sve', 'ri', 'ge'])
    })
  })

  // ── Case handling ────────────────────────────────────────────────────────
  describe('case handling', () => {
    it('splits uppercase words the same way', () => {
      expect(splitSwedishWord('SKOLA')).toEqual(['SKO', 'LA'])
    })

    it('splits mixed-case words correctly', () => {
      expect(splitSwedishWord('Sverige')).toEqual(['Sve', 'ri', 'ge'])
    })
  })

  // ── Output contract ──────────────────────────────────────────────────────
  describe('output invariants', () => {
    it('concatenated syllables equal the original word', () => {
      const words = ['skola', 'botten', 'arbete', 'kunskap', 'blåbär', 'kvinna', 'strand']
      for (const word of words) {
        const syllables = splitSwedishWord(word)
        expect(syllables.join('')).toBe(word)
      }
    })

    it('always returns at least one syllable', () => {
      const words = ['a', 'el', 'hej', 'skola', 'botten']
      for (const word of words) {
        expect(splitSwedishWord(word).length).toBeGreaterThanOrEqual(1)
      }
    })
  })
})

// ---------------------------------------------------------------------------
// splitTextIntoSyllables
// ---------------------------------------------------------------------------

describe('splitTextIntoSyllables', () => {
  it('returns an empty array for an empty string', () => {
    expect(splitTextIntoSyllables('')).toEqual([])
  })

  it('handles a single word', () => {
    expect(splitTextIntoSyllables('skola')).toEqual([
      { word: 'skola', syllables: ['sko', 'la'] },
    ])
  })

  it('handles a single character', () => {
    // Length ≤ 1 → not passed through splitSwedishWord
    expect(splitTextIntoSyllables('a')).toEqual([
      { word: 'a', syllables: ['a'] },
    ])
  })

  it('preserves punctuation as its own token', () => {
    expect(splitTextIntoSyllables('hej!')).toEqual([
      { word: 'hej', syllables: ['hej'] },
      { word: '!', syllables: ['!'] },
    ])
  })

  it('preserves spaces as their own tokens', () => {
    const result = splitTextIntoSyllables('en bok')
    expect(result).toEqual([
      { word: 'en', syllables: ['en'] },   // ≤2 chars → not split
      { word: ' ', syllables: [' '] },
      { word: 'bok', syllables: ['bok'] }, // single syllable
    ])
  })

  it('handles a multi-word sentence', () => {
    const result = splitTextIntoSyllables('läs boken')
    expect(result).toEqual([
      { word: 'läs', syllables: ['läs'] },
      { word: ' ', syllables: [' '] },
      { word: 'boken', syllables: ['bo', 'ken'] },
    ])
  })

  it('handles Swedish characters in the word boundary regex', () => {
    // å, ä, ö should be treated as part of words, not as separators
    const result = splitTextIntoSyllables('öra')
    expect(result).toEqual([
      { word: 'öra', syllables: ['ö', 'ra'] },
    ])
  })

  it('syllable arrays concatenate back to the original word for every token', () => {
    const text = 'Jag läser boken om Sverige.'
    const tokens = splitTextIntoSyllables(text)
    for (const token of tokens) {
      expect(token.syllables.join('')).toBe(token.word)
    }
  })

  it('round-trip: joining all token words reconstructs the original text', () => {
    const text = 'En snabb räv hoppar över lata hundar.'
    const tokens = splitTextIntoSyllables(text)
    expect(tokens.map(t => t.word).join('')).toBe(text)
  })
})
