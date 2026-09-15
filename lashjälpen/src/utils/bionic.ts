// Bionic reading: bold the leading portion of each word as a visual anchor.
// Evidence for this technique is mixed (see README) — offered as an optional,
// experimental aid rather than a proven intervention.
export function splitWordForBionic(word: string): { bold: string; rest: string } {
  const len = word.length
  if (len < 2) return { bold: word, rest: '' }

  let boldLen: number
  if (len <= 3) boldLen = 1
  else if (len <= 5) boldLen = 2
  else boldLen = Math.ceil(len * 0.42)

  return { bold: word.slice(0, boldLen), rest: word.slice(boldLen) }
}
