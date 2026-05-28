import { useState, useEffect } from 'react'

export type FontSize = 'sm' | 'md' | 'lg' | 'xl'
export type Theme = 'light' | 'dark'

export function useAccessibility() {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) ?? 'light'
  )
  const [fontSize, setFontSize] = useState<FontSize>(() =>
    (localStorage.getItem('fontSize') as FontSize) ?? 'md'
  )
  const [dyslexiaFont, setDyslexiaFont] = useState(() =>
    localStorage.getItem('dyslexiaFont') === 'true'
  )
  const [focusMode, setFocusMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('text-size-sm', 'text-size-md', 'text-size-lg', 'text-size-xl')
    root.classList.add(`text-size-${fontSize}`)
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  useEffect(() => {
    document.body.classList.toggle('font-dyslexia', dyslexiaFont)
    localStorage.setItem('dyslexiaFont', String(dyslexiaFont))
  }, [dyslexiaFont])

  return {
    theme, setTheme,
    fontSize, setFontSize,
    dyslexiaFont, setDyslexiaFont,
    focusMode, setFocusMode,
    reducedMotion,
  }
}
