import type { TextItem } from 'pdfjs-dist/types/src/display/api'

export type SupportedFileType = 'pdf' | 'docx' | 'pptx' | 'txt'

export function detectFileType(file: File): SupportedFileType | null {
  const name = file.name.toLowerCase()
  if (name.endsWith('.pdf')) return 'pdf'
  if (name.endsWith('.docx')) return 'docx'
  if (name.endsWith('.pptx')) return 'pptx'
  if (name.endsWith('.txt')) return 'txt'
  return null
}

async function parsePdf(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).href

  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const items = content.items.filter((item): item is TextItem => 'str' in item)
    const paragraphs = linesToParagraphs(itemsToLines(items))
    if (paragraphs.length) pages.push(paragraphs.join('\n\n'))
  }
  return pages.join('\n\n')
}

interface PdfLine {
  text: string
  y: number
  height: number
}

function itemsToLines(items: TextItem[]): PdfLine[] {
  const lines: PdfLine[] = []
  let text = ''
  let y = 0
  let height = 0
  let lastRight = 0

  for (const item of items) {
    const x = item.transform[4] as number
    if (!text) {
      y = item.transform[5] as number
      height = item.height
    } else if (item.str && !/\s$/.test(text) && !/^\s/.test(item.str) && x - lastRight > height * 0.15) {
      // Words positioned apart without an explicit space character
      text += ' '
    }
    text += item.str
    lastRight = x + item.width
    if (item.hasEOL) {
      if (text.trim()) lines.push({ text: text.trim(), y, height })
      text = ''
    }
  }
  if (text.trim()) lines.push({ text: text.trim(), y, height })
  return lines
}

function linesToParagraphs(lines: PdfLine[]): string[] {
  const paragraphs: string[] = []
  let current = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!current) {
      current = line.text
      continue
    }
    const prev = lines[i - 1]
    const gap = prev.y - line.y
    const lineHeight = Math.max(prev.height, line.height, 1)
    const newParagraph = gap > lineHeight * 1.7 || gap < -lineHeight * 0.5

    if (newParagraph) {
      paragraphs.push(current)
      current = line.text
    } else if (/[a-zåäöéü]-$/i.test(current) && /^[a-zåäöéü]/.test(line.text)) {
      // Word hyphenated across a line break (very common in Swedish typesetting)
      current = current.slice(0, -1) + line.text
    } else {
      current += ' ' + line.text
    }
  }
  if (current) paragraphs.push(current)
  return paragraphs
}

async function parseDocx(file: File): Promise<string> {
  const { default: mammoth } = await import('mammoth')
  const buffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer: buffer })
  return result.value.trim()
}

function slideNumber(path: string): number {
  const match = path.match(/slide(\d+)\.xml$/)
  return match ? parseInt(match[1], 10) : 0
}

async function parsePptx(file: File): Promise<string> {
  const { default: JSZip } = await import('jszip')
  const buffer = await file.arrayBuffer()
  const zip = await JSZip.loadAsync(buffer)
  const slideFiles = Object.keys(zip.files)
    .filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => slideNumber(a) - slideNumber(b))

  const parser = new DOMParser()
  const slideTexts: string[] = []

  for (const name of slideFiles) {
    const xml = await zip.files[name].async('text')
    const doc = parser.parseFromString(xml, 'application/xml')
    // Runs (<a:t>) inside a paragraph are joined without spaces since a run
    // boundary often falls mid-word (e.g. a bold syllable).
    const paragraphs = Array.from(doc.getElementsByTagName('a:p'))
      .map(p => Array.from(p.getElementsByTagName('a:t')).map(t => t.textContent ?? '').join('').trim())
      .filter(Boolean)
    if (paragraphs.length) slideTexts.push(paragraphs.join('\n'))
  }

  return slideTexts.join('\n\n')
}

async function parseTxt(file: File): Promise<string> {
  return (await file.text()).trim()
}

export async function parseFile(file: File): Promise<string> {
  const type = detectFileType(file)
  if (!type) {
    throw new Error('Filtypen stöds inte. Använd PDF, Word (.docx), PowerPoint (.pptx) eller en textfil (.txt).')
  }

  const text = await (type === 'pdf' ? parsePdf(file)
    : type === 'docx' ? parseDocx(file)
    : type === 'pptx' ? parsePptx(file)
    : parseTxt(file))

  if (!text.trim()) {
    throw new Error('Ingen text kunde hittas i filen. Om det är en skannad PDF (bilder) kan texten inte läsas ut automatiskt.')
  }

  return text
}
