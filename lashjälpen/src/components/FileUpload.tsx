import { useRef, useState } from 'react'
import { parseFile } from '../utils/fileParsers'

interface FileUploadProps {
  onTextExtracted: (text: string, fileName: string) => void
}

export default function FileUpload({ onTextExtracted }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const text = await parseFile(file)
      onTextExtracted(text, file.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte läsa filen.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.pptx,.txt"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors min-h-[44px] min-w-[44px] disabled:opacity-60"
        aria-label="Ladda upp fil (PDF, Word eller PowerPoint)"
      >
        {isLoading ? (
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        )}
        {isLoading ? 'Läser in fil…' : 'Ladda upp fil'}
      </button>

      {error && (
        <div className="px-3 py-2 bg-red-50 rounded-lg text-sm text-red-700 max-w-sm">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-400">PDF, Word (.docx) eller PowerPoint (.pptx)</p>
    </div>
  )
}
