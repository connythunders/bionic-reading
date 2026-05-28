import { NavLink, useNavigate } from 'react-router-dom'
import { Users, ClipboardList, Clock, Mail, Plus, MessageSquarePlus, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GroupGrid } from '@/components/dashboard/GroupGrid'
import { MessagesWidget } from '@/components/dashboard/MessagesWidget'
import { ScheduleWidget } from '@/components/dashboard/ScheduleWidget'
import { TasksWidget } from '@/components/dashboard/TasksWidget'
import { groups } from '@/data/groups'
import { assignments } from '@/data/assignments'
import { messages } from '@/data/messages'
import { currentUser } from '@/data/user'

type Tab = 'oversikt' | 'meddelanden' | 'kalender' | 'uppgifter'

const tabs: { id: Tab; label: string; to: string }[] = [
  { id: 'oversikt',    label: 'Översikt',    to: '/' },
  { id: 'meddelanden', label: 'Meddelanden', to: '/meddelanden' },
  { id: 'kalender',    label: 'Kalender',    to: '/kalender' },
  { id: 'uppgifter',   label: 'Uppgifter',   to: '/uppgifter' },
]

function getTodaySwedish() {
  return new Date('2026-05-28').toLocaleDateString('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function DashboardView() {
  const navigate = useNavigate()
  const firstName = currentUser.name.split(' ')[0]
  const todayLabel = capitalize(getTodaySwedish())

  const activeGroups = groups.length
  const openAssignments = assignments.filter(a => a.status === 'open')
  const waitingForGrading = openAssignments.reduce((sum, a) => sum + (a.submissions - a.graded), 0)
  const unreadMessages = messages.filter(m => !m.isRead).length

  // Uppgifter med flest orättade inlämningar, max 3
  const needsAttention = [...openAssignments]
    .filter(a => a.submissions - a.graded > 0)
    .sort((a, b) => (b.submissions - b.graded) - (a.submissions - a.graded))
    .slice(0, 3)

  return (
    <div className="flex flex-col h-full">
      {/* Toppnavigering med flikar */}
      <header className="px-6 pt-5 pb-0 flex-shrink-0">
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
                        ? 'border-green-700 text-green-700 dark:text-green-400 dark:border-green-400 font-medium'
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
              onClick={() => navigate('/uppgifter')}
              className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
              aria-label="Skapa ny uppgift"
            >
              <Plus size={15} aria-hidden="true" />
              Ny uppgift
            </button>
            <button
              onClick={() => navigate('/meddelanden')}
              className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
              aria-label="Skriv nytt meddelande"
            >
              <MessageSquarePlus size={15} aria-hidden="true" />
              Skriv meddelande
            </button>
          </div>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700" />
      </header>

      {/* Innehåll */}
      <main className="flex-1 overflow-y-auto px-6 py-5 main-area">
        <div className="max-w-5xl space-y-6">

          {/* Välkomstheader */}
          <div className="bg-gradient-to-r from-green-50 to-white dark:from-green-900/10 dark:to-gray-950 rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Hej, {firstName}! 👋
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{todayLabel}</p>
          </div>

          {/* Statistikrad */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Statistiköversikt">
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4"
              role="listitem"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{activeGroups}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Aktiva grupper</p>
              </div>
            </div>

            <div
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4"
              role="listitem"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                <ClipboardList size={20} className="text-orange-600 dark:text-orange-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{openAssignments.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Öppna uppgifter</p>
              </div>
            </div>

            <div
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4"
              role="listitem"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-red-600 dark:text-red-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{waitingForGrading}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Väntar på rättning</p>
              </div>
            </div>

            <div
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4"
              role="listitem"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{unreadMessages}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Olästa meddelanden</p>
              </div>
            </div>
          </div>

          {/* Prioriterat: Behöver uppmärksamhet */}
          {needsAttention.length > 0 && (
            <section
              aria-labelledby="attention-heading"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
            >
              <h2
                id="attention-heading"
                className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4"
              >
                Behöver din uppmärksamhet
              </h2>
              <ul className="space-y-2 list-none m-0 p-0" role="list">
                {needsAttention.map(task => {
                  const pending = task.submissions - task.graded
                  return (
                    <li key={task.id}>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {task.groupName} &middot;{' '}
                            <span className="text-orange-700 dark:text-orange-400 font-medium">
                              {pending} inlämning{pending !== 1 ? 'ar' : ''} väntar
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/uppgifter/${task.id}`)}
                          className="ml-4 flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 hover:underline"
                          aria-label={`Rätta uppgiften ${task.title}`}
                        >
                          Rätta nu
                          <ArrowRight size={13} aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {/* Två kolumner: Meddelanden + Schema */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MessagesWidget />
            <ScheduleWidget />
          </div>

          {/* Gruppgrid — full bredd */}
          <GroupGrid />

          {/* Uppgiftswidget — full bredd */}
          <TasksWidget />

        </div>
      </main>
    </div>
  )
}
