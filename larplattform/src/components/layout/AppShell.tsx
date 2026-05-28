import { useState, useEffect, useRef } from 'react'
import { Menu, Grid3X3, Bell, Search, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { RightPanel } from './RightPanel'
import { teacherUser, studentUser } from '@/data/user'
import { useRole } from '@/context/RoleContext'
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
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { role } = useRole()

  const user = role === 'teacher' ? teacherUser : studentUser

  /* Open search with ⌘K / Ctrl+K */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Focus the search input when overlay opens */
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  return (
    <div className={`flex h-dvh overflow-hidden bg-gray-50 dark:bg-gray-950 ${focusMode ? 'focus-mode' : ''}`}>

      {/* ── Search overlay ─────────────────────────────────────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Sök"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          {/* Search card */}
          <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center px-4 py-3.5 gap-3">
              <Search size={18} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Sök elever, uppgifter, grupper…"
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
                aria-label="Sökfält"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1.5 transition-colors flex-shrink-0"
                aria-label="Stäng sök"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2.5">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Tryck <kbd className="font-mono bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">ESC</kbd> för att stänga
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile sidebar overlay/backdrop ────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Left sidebar ───────────────────────────────────────────────── */}
      <div className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-30' : ''} lg:relative lg:z-auto`}>
        <Sidebar
          isOpen={sidebarOpen}
          theme={theme} setTheme={setTheme}
          fontSize={fontSize} setFontSize={setFontSize}
          dyslexiaFont={dyslexiaFont} setDyslexiaFont={setDyslexiaFont}
          focusMode={focusMode} setFocusMode={setFocusMode}
        />
      </div>

      {/* ── Center: top-bar + main content ─────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="h-14 flex items-center px-4 gap-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex-shrink-0">

          {/* Left: hamburger (mobile only) */}
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors flex-shrink-0"
            aria-label={sidebarOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={sidebarOpen}
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-colors min-w-0"
            aria-label="Öppna sök (Ctrl+K)"
          >
            <Search size={15} aria-hidden="true" />
            <span className="text-xs hidden sm:inline">Sök…</span>
            <kbd className="hidden md:inline-flex items-center text-[10px] font-mono bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-1 py-0.5 text-gray-400 dark:text-gray-400 ml-1">
              ⌘K
            </kbd>
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">

            {/* Notification bell */}
            <button
              className="relative text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              aria-label={`Notiser – ${user.notificationCount} olästa`}
            >
              <Bell size={18} aria-hidden="true" />
              {user.notificationCount > 0 && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-0.5 rounded-full bg-green-600 text-white text-[10px] font-bold"
                  aria-hidden="true"
                >
                  {user.notificationCount}
                </span>
              )}
            </button>

            {/* Right panel toggle */}
            <button
              onClick={() => setRightPanelOpen(o => !o)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              aria-label={rightPanelOpen ? 'Stäng verktyg' : 'Öppna verktyg'}
              aria-expanded={rightPanelOpen}
            >
              <Grid3X3 size={18} aria-hidden="true" />
            </button>

            {/* Avatar */}
            <button
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold flex-shrink-0 shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: user.color }}
              aria-label={`Profil: ${user.name}`}
            >
              {user.initials}
            </button>
          </div>
        </div>

        {/* Main content + right panel */}
        <div className="flex flex-1 overflow-hidden">
          <div className="main-area flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
            <Outlet />
          </div>
          <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
        </div>
      </div>
    </div>
  )
}
