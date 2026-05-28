import { Sun, Moon, ZoomIn, ZoomOut, Eye, Focus, Type } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FontSize, Theme } from '@/hooks/useAccessibility'

type Props = {
  theme: Theme
  setTheme: (t: Theme) => void
  fontSize: FontSize
  setFontSize: (s: FontSize) => void
  dyslexiaFont: boolean
  setDyslexiaFont: (v: boolean) => void
  focusMode: boolean
  setFocusMode: (v: boolean) => void
}

const fontSizes: FontSize[] = ['sm', 'md', 'lg', 'xl']
const fontSizeLabels: Record<FontSize, string> = { sm: 'Liten', md: 'Normal', lg: 'Stor', xl: 'Extra stor' }

export function AccessibilityToolbar({
  theme, setTheme,
  fontSize, setFontSize,
  dyslexiaFont, setDyslexiaFont,
  focusMode, setFocusMode,
}: Props) {
  const fontIdx = fontSizes.indexOf(fontSize)

  return (
    <div
      role="toolbar"
      aria-label="Tillgänglighetsinställningar"
      className="flex items-center gap-1 flex-wrap"
    >
      {/* Dark/Light mode */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium',
          'border border-gray-200 dark:border-gray-600',
          'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200',
          'hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'
        )}
        title={theme === 'light' ? 'Byt till mörkt läge' : 'Byt till ljust läge'}
        aria-pressed={theme === 'dark'}
      >
        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        <span className="hidden sm:inline">{theme === 'light' ? 'Mörkt' : 'Ljust'}</span>
      </button>

      {/* Font size decrease */}
      <button
        onClick={() => fontIdx > 0 && setFontSize(fontSizes[fontIdx - 1])}
        disabled={fontIdx === 0}
        className="flex items-center justify-center w-7 h-7 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        title="Minska textstorlek"
        aria-label="Minska textstorlek"
      >
        <ZoomOut size={14} />
      </button>

      {/* Font size label */}
      <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[50px] text-center select-none">
        {fontSizeLabels[fontSize]}
      </span>

      {/* Font size increase */}
      <button
        onClick={() => fontIdx < fontSizes.length - 1 && setFontSize(fontSizes[fontIdx + 1])}
        disabled={fontIdx === fontSizes.length - 1}
        className="flex items-center justify-center w-7 h-7 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        title="Öka textstorlek"
        aria-label="Öka textstorlek"
      >
        <ZoomIn size={14} />
      </button>

      {/* Dyslexia font */}
      <button
        onClick={() => setDyslexiaFont(!dyslexiaFont)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors',
          'border',
          dyslexiaFont
            ? 'bg-green-50 border-green-600 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
        )}
        title="Dyslexi-vänligt typsnitt"
        aria-pressed={dyslexiaFont}
      >
        <Type size={14} />
        <span className="hidden sm:inline">Dyslexi</span>
      </button>

      {/* Focus mode */}
      <button
        onClick={() => setFocusMode(!focusMode)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors',
          'border',
          focusMode
            ? 'bg-blue-50 border-blue-600 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
        )}
        title="Fokusläge – dölj sidopaneler"
        aria-pressed={focusMode}
      >
        {focusMode ? <Eye size={14} /> : <Focus size={14} />}
        <span className="hidden sm:inline">{focusMode ? 'Visa allt' : 'Fokus'}</span>
      </button>
    </div>
  )
}
