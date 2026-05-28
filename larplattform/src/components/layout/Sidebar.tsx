import { NavLink } from 'react-router-dom'
import {
  Home, Bell, Search, BookOpen,
  GraduationCap, Rss, Globe, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GroupIcon } from '@/components/shared/GroupIcon'
import { AccessibilityToolbar } from '@/components/shared/AccessibilityToolbar'
import { teacherUser, studentUser } from '@/data/user'
import { groups } from '@/data/groups'
import { useRole } from '@/context/RoleContext'
import type { FontSize, Theme } from '@/hooks/useAccessibility'

type Props = {
  isOpen: boolean
  theme: Theme
  setTheme: (t: Theme) => void
  fontSize: FontSize
  setFontSize: (s: FontSize) => void
  dyslexiaFont: boolean
  setDyslexiaFont: (v: boolean) => void
  focusMode: boolean
  setFocusMode: (v: boolean) => void
}

const externalLinks = [
  { icon: GraduationCap, label: 'Academy',    href: '#' },
  { icon: Rss,           label: 'Blogg',      href: '#' },
  { icon: Globe,         label: 'Unikum.net', href: '#' },
]

/** Derive school initials from school name (first letters of first 2 words). */
function schoolInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

export function Sidebar({
  isOpen,
  theme, setTheme,
  fontSize, setFontSize,
  dyslexiaFont, setDyslexiaFont,
  focusMode, setFocusMode,
}: Props) {
  const { role, setRole } = useRole()
  const user = role === 'teacher' ? teacherUser : studentUser
  const visibleGroups = role === 'student'
    ? groups.filter(g => studentUser.enrolledGroupIds.includes(g.id))
    : groups

  const navItems = [
    { to: '/',           icon: Home,     label: 'Min startsida' },
    { to: '/notiser',    icon: Bell,     label: 'Notiser', badge: user.notificationCount },
    { to: '/hitta',      icon: Search,   label: 'Hitta' },
    { to: '/skolbanken', icon: BookOpen, label: 'Skolbanken' },
  ]

  const initials = schoolInitials(user.school)

  return (
    <aside
      className={cn(
        'sidebar-panel flex flex-col h-full',
        'border-r border-gray-100 dark:border-gray-800',
        'bg-white dark:bg-gray-900',
        'w-[260px] flex-shrink-0 overflow-y-auto',
        !isOpen && 'hidden lg:flex'
      )}
      aria-label="Huvudnavigering"
    >
      {/* ── School badge ─────────────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-green-700 text-white text-xs font-bold flex-shrink-0 shadow-sm"
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
              {user.school}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate leading-tight mt-0.5">
              {user.unit}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      {/* ── Primary navigation ───────────────────────────────────────────── */}
      <nav className="px-3 pt-3 pb-1" aria-label="Primär navigering">
        <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Navigering
        </p>
        <ul className="space-y-0.5 list-none m-0 p-0" role="list">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold border-l-2 border-green-600 dark:border-green-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                )}
              >
                <item.icon size={18} className="flex-shrink-0" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span
                    className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white bg-green-600 rounded-full"
                    aria-label={`${item.badge} olästa`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-4 my-2 border-t border-gray-100 dark:border-gray-800" />

      {/* ── Groups / Courses ─────────────────────────────────────────────── */}
      <nav className="px-3 pb-1 flex-1" aria-label={role === 'student' ? 'Mina kurser' : 'Grupper'}>
        <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {role === 'student' ? 'Mina kurser' : 'Grupper'}
        </p>
        <ul className="space-y-0.5 list-none m-0 p-0" role="list">
          {visibleGroups.map(group => (
            <li key={group.id}>
              <NavLink
                to={`/grupp/${group.id}`}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold border-l-2 border-green-600 dark:border-green-500'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                )}
              >
                {/* Colored circle with group color */}
                <span
                  className="flex-shrink-0 inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: group.color }}
                  aria-hidden="true"
                />
                <GroupIcon code={group.code} size="sm" color={group.color} />
                <span className="truncate leading-tight">{group.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-4 my-2 border-t border-gray-100 dark:border-gray-800" />

      {/* ── External links ───────────────────────────────────────────────── */}
      <nav className="px-3 pb-2" aria-label="Externa länkar">
        <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Resurser
        </p>
        <ul className="space-y-0.5 list-none m-0 p-0" role="list">
          {externalLinks.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-150"
              >
                <item.icon size={16} className="flex-shrink-0" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                <ExternalLink size={12} className="text-gray-300 dark:text-gray-600 flex-shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      {/* ── Accessibility toolbar (compact, horizontal) ──────────────────── */}
      <div className="px-4 py-3">
        <AccessibilityToolbar
          theme={theme} setTheme={setTheme}
          fontSize={fontSize} setFontSize={setFontSize}
          dyslexiaFont={dyslexiaFont} setDyslexiaFont={setDyslexiaFont}
          focusMode={focusMode} setFocusMode={setFocusMode}
        />
      </div>

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      {/* ── Role switcher ────────────────────────────────────────────────── */}
      <div className="px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
          Visa som
        </p>
        <div
          className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-0.5 gap-0.5"
          role="group"
          aria-label="Byt roll"
        >
          <button
            onClick={() => setRole('teacher')}
            className={cn(
              'flex-1 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all duration-150',
              role === 'teacher'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            )}
            aria-pressed={role === 'teacher'}
            aria-label="Visa som lärare"
          >
            Lärare
          </button>
          <button
            onClick={() => setRole('student')}
            className={cn(
              'flex-1 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all duration-150',
              role === 'student'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            )}
            aria-pressed={role === 'student'}
            aria-label="Visa som elev"
          >
            Elev
          </button>
        </div>
      </div>

      <div className="mx-4 border-t border-gray-100 dark:border-gray-800" />

      {/* ── User footer ──────────────────────────────────────────────────── */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: user.color }}
            aria-hidden="true"
          >
            {user.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-tight">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate leading-tight mt-0.5">
              {role === 'teacher' ? 'Lärare' : 'Elev'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
