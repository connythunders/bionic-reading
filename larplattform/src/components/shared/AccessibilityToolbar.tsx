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
const fontSizeLabels: Record<FontSize, string> = {
  sm: 'Liten',
  md: 'Normal',
  lg: 'Stor',
  xl: 'Extra',
}

/** Ghost icon button — shared base styles */
const ghostBtn =
  'inline-flex items-center justify-center rounded-lg transition-colors'

/** Pill button — label + icon */
const pillBtn = cn(
  ghostBtn,
  'gap-1.5 px-2.5 py-1.5 text-xs font-medium border',
  'bg-white dark:bg-gray-800',
  'border-gray-200 dark:border-gray-700',
  'text-gray-700 dark:text-gray-200',
  'hover:bg-gray-50 dark:hover:bg-gray-700',
)

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
      {/* Dark/Light mode toggle */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={pillBtn}
        title={theme === 'light' ? 'Byt till mörkt läge' : 'Byt till ljust läge'}
        aria-pressed={theme === 'dark'}
        aria-label={theme === 'light' ? 'Aktivera mörkt läge' : 'Aktivera ljust läge'}
      >
        {theme === 'light'
          ? <Moon size={14} aria-hidden="true" />
          : <Sun  size={14} aria-hidden="true" />
        }
        <span className="hidden sm:inline">
          {theme === 'light' ? 'Mörkt' : 'Ljust'}
        </span>
      </button>

      {/* Font size decrease */}
      <button
        onClick={() => fontIdx > 0 && setFontSize(fontSizes[fontIdx - 1])}
        disabled={fontIdx === 0}
        className={cn(
          ghostBtn,
          'w-7 h-7 border border-gray-200 dark:border-gray-700',
          'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'disabled:opacity-40 disabled:cursor-not-allowed',
        )}
        title="Minska textstorlek"
        aria-label="Minska textstorlek"
      >
        <ZoomOut size={14} aria-hidden="true" />
      </button>

      {/* Font size indicator */}
      <span
        className="text-xs text-gray-500 dark:text-gray-400 min-w-[46px] text-center select-none tabular-nums"
        aria-live="polite"
        aria-label={`Textstorlek: ${fontSizeLabels[fontSize]}`}
      >
        {fontSizeLabels[fontSize]}
      </span>

      {/* Font size increase */}
      <button
        onClick={() => fontIdx < fontSizes.length - 1 && setFontSize(fontSizes[fontIdx + 1])}
        disabled={fontIdx === fontSizes.length - 1}
        className={cn(
          ghostBtn,
          'w-7 h-7 border border-gray-200 dark:border-gray-700',
          'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'disabled:opacity-40 disabled:cursor-not-allowed',
        )}
        title="Öka textstorlek"
        aria-label="Öka textstorlek"
      >
        <ZoomIn size={14} aria-hidden="true" />
      </button>

      {/* Dyslexia-friendly font */}
      <button
        onClick={() => setDyslexiaFont(!dyslexiaFont)}
        className={cn(
          pillBtn,
          dyslexiaFont &&
            'bg-green-50 dark:bg-green-900/30 border-green-600 dark:border-green-500 text-green-800 dark:text-green-300 ring-1 ring-green-500/40',
        )}
        title="Dyslexi-vänligt typsnitt"
        aria-pressed={dyslexiaFont}
        aria-label={dyslexiaFont ? 'Stäng av dyslexi-typsnitt' : 'Aktivera dyslexi-vänligt typsnitt'}
      >
        <Type size={14} aria-hidden="true" />
        <span className="hidden sm:inline">Dyslexi</span>
      </button>

      {/* Focus mode */}
      <button
        onClick={() => setFocusMode(!focusMode)}
        className={cn(
          pillBtn,
          focusMode &&
            'bg-blue-50 dark:bg-blue-900/30 border-blue-600 dark:border-blue-500 text-blue-800 dark:text-blue-300 ring-1 ring-blue-500/40',
        )}
        title="Fokusläge – dölj sidopaneler"
        aria-pressed={focusMode}
        aria-label={focusMode ? 'Stäng fokusläge, visa alla paneler' : 'Aktivera fokusläge'}
      >
        {focusMode
          ? <Eye   size={14} aria-hidden="true" />
          : <Focus size={14} aria-hidden="true" />
        }
        <span className="hidden sm:inline">
          {focusMode ? 'Visa allt' : 'Fokus'}
        </span>
      </button>
    </div>
  )
}
