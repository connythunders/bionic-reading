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
    const text = content.items
      .map(item => ('str' in item ? (item as TextItem).str : ''))
      .join(' ')
    pages.push(text.trim())
  }
  return pages.join('\n\n')
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
    const textNodes = Array.from(doc.getElementsByTagName('a:t'))
    const text = textNodes.map(node => node.textContent ?? '').join(' ').trim()
    if (text) slideTexts.push(text)
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
