import { NavLink } from 'react-router-dom'
import {
  Home, Bell, Search, BookOpen, ChevronRight,
  Palette, GraduationCap, Rss, Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GroupIcon } from '@/components/shared/GroupIcon'
import { currentUser } from '@/data/user'
import { groups } from '@/data/groups'

type Props = {
  isOpen: boolean
}

const navItems = [
  { to: '/',          icon: Home,         label: 'Min startsida' },
  { to: '/notiser',   icon: Bell,         label: 'Notiser',      badge: currentUser.notificationCount },
  { to: '/hitta',     icon: Search,       label: 'Hitta' },
  { to: '/skolbanken', icon: BookOpen,    label: 'Skolbanken' },
]

const bottomItems = [
  { icon: Palette,       label: 'Byt tema',   href: '#' },
  { icon: GraduationCap, label: 'Academy',    href: '#' },
  { icon: Rss,           label: 'Blogg',      href: '#' },
  { icon: Globe,         label: 'Unikum.net', href: '#' },
]

export function Sidebar({ isOpen }: Props) {
  return (
    <aside
      className={cn(
        'sidebar-panel flex flex-col h-full border-r border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800 overflow-y-auto',
        'w-64 flex-shrink-0',
        !isOpen && 'hidden lg:flex'
      )}
      aria-label="Huvudnavigering"
    >
      {/* Top navigation */}
      <nav className="p-2 pt-4" aria-label="Primär navigering">
        <ul className="space-y-0.5 list-none m-0 p-0" role="list">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                  'text-gray-700 dark:text-gray-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  isActive && 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                )}
              >
                <item.icon size={18} className="flex-shrink-0" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full"
                    aria-label={`${item.badge} olästa notiser`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-gray-200 dark:border-gray-700 mx-3" />

      {/* Unit */}
      <div className="px-3 py-3">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Enhet
        </p>
        <button className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: '#166534' }}
            aria-hidden="true"
          >
            SI
          </span>
          <span className="text-sm text-gray-700 dark:text-gray-200 flex-1 truncate leading-tight">
            {currentUser.school}
          </span>
          <ChevronRight size={14} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
        </button>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mx-3" />

      {/* Groups */}
      <div className="px-3 py-3 flex-1">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Grupper
        </p>
        <ul className="space-y-0.5 list-none m-0 p-0" role="list">
          {groups.map(group => (
            <li key={group.id}>
              <NavLink
                to={`/grupp/${group.id}`}
                className={({ isActive }) => cn(
                  'flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm',
                  'text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  isActive && 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                )}
              >
                <GroupIcon code={group.code} size="sm" color={group.color} />
                <span className="truncate">{group.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mx-3" />

      {/* Bottom links */}
      <nav className="p-2 pb-4" aria-label="Övriga länkar">
        <ul className="space-y-0.5 list-none m-0 p-0" role="list">
          {bottomItems.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <item.icon size={16} className="flex-shrink-0" aria-hidden="true" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
