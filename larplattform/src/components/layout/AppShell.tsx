import { useState } from 'react'
import { Menu, Grid3X3 } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { RightPanel } from './RightPanel'
import { AccessibilityToolbar } from '@/components/shared/AccessibilityToolbar'
import { currentUser } from '@/data/user'
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

export function AppShell({
  theme, setTheme,
  fontSize, setFontSize,
  dyslexiaFont, setDyslexiaFont,
  focusMode, setFocusMode,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  return (
    <div className={`flex h-dvh overflow-hidden bg-gray-50 dark:bg-gray-900 ${focusMode ? 'focus-mode' : ''}`}>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left sidebar */}
      <div className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-30' : ''} lg:relative lg:z-auto`}>
        <Sidebar isOpen={sidebarOpen} />
      </div>

      {/* Center: top-bar + content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0 gap-3">
          {/* Left: hamburger (mobile) + breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="lg:hidden p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 flex-shrink-0"
              aria-label={sidebarOpen ? 'Stäng meny' : 'Öppna meny'}
              aria-expanded={sidebarOpen}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                {currentUser.name}
              </span>
              <span className="text-gray-300 dark:text-gray-600 text-sm">›</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate hidden sm:block">
                {currentUser.school}
              </span>
            </div>
          </div>

          {/* Center: accessibility toolbar */}
          <div className="hidden md:flex">
            <AccessibilityToolbar
              theme={theme} setTheme={setTheme}
              fontSize={fontSize} setFontSize={setFontSize}
              dyslexiaFont={dyslexiaFont} setDyslexiaFont={setDyslexiaFont}
              focusMode={focusMode} setFocusMode={setFocusMode}
            />
          </div>

          {/* Right: profile + tools toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setRightPanelOpen(o => !o)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label={rightPanelOpen ? 'Stäng verktyg' : 'Öppna verktyg'}
              aria-expanded={rightPanelOpen}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: currentUser.color }}
              aria-label={`Profil: ${currentUser.name}`}
            >
              {currentUser.initials}
            </button>
          </div>
        </div>

        {/* Mobile accessibility toolbar */}
        <div className="md:hidden px-3 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <AccessibilityToolbar
            theme={theme} setTheme={setTheme}
            fontSize={fontSize} setFontSize={setFontSize}
            dyslexiaFont={dyslexiaFont} setDyslexiaFont={setDyslexiaFont}
            focusMode={focusMode} setFocusMode={setFocusMode}
          />
        </div>

        {/* Main content + optional right panel */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </div>
          <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
        </div>
      </div>
    </div>
  )
}
