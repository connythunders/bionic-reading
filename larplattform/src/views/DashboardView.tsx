import { NavLink } from 'react-router-dom'
import { Printer, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GroupGrid } from '@/components/dashboard/GroupGrid'
import { MessagesWidget } from '@/components/dashboard/MessagesWidget'
import { ScheduleWidget } from '@/components/dashboard/ScheduleWidget'
import { TasksWidget } from '@/components/dashboard/TasksWidget'

type Tab = 'oversikt' | 'meddelanden' | 'kalender' | 'uppgifter'

const tabs: { id: Tab; label: string; to: string }[] = [
  { id: 'oversikt',    label: 'Översikt',    to: '/' },
  { id: 'meddelanden', label: 'Meddelanden', to: '/meddelanden' },
  { id: 'kalender',    label: 'Kalender',    to: '/kalender' },
  { id: 'uppgifter',   label: 'Uppgifter',   to: '/uppgifter' },
]

export function DashboardView() {
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <header className="px-6 pt-5 pb-0 flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Start</h1>

        {/* Tabs + actions */}
        <div className="flex items-end justify-between">
          <nav aria-label="Sidnavigering" className="-mb-px">
            <ul className="flex gap-0 list-none m-0 p-0" role="list">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <NavLink
                    to={tab.to}
                    end={tab.to === '/'}
                    className={({ isActive }) => cn(
                      'inline-flex items-center px-4 py-2.5 text-sm border-b-2 transition-colors',
                      isActive
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-medium'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300'
                    )}
                  >
                    {tab.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 mb-1">
            <button
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Skriv ut"
            >
              <Printer size={18} />
            </button>
            <button
              className="p-1.5 rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              aria-label="Skapa nytt"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-5 main-area">
        <div className="max-w-5xl space-y-5">
          {/* Groups */}
          <GroupGrid />

          {/* Two-column row: Messages + Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <MessagesWidget />
            <ScheduleWidget />
          </div>

          {/* Full-width tasks */}
          <TasksWidget />
        </div>
      </main>
    </div>
  )
}
