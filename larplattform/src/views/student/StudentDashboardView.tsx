import { useNavigate } from 'react-router-dom'
import { Clock, CheckCircle, BookOpen, ArrowUpRight } from 'lucide-react'
import { groups } from '@/data/groups'
import { assignments } from '@/data/assignments'
import { messages } from '@/data/messages'
import { lessons } from '@/data/schedule'
import { submissions } from '@/data/submissions'
import { studentUser } from '@/data/user'
import { GroupIcon } from '@/components/shared/GroupIcon'

const STUDENT_ID = studentUser.id
const ENROLLED = studentUser.enrolledGroupIds

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function daysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - new Date('2026-03-28').getTime()) / 86400000)
  return diff
}

export function StudentDashboardView() {
  const navigate = useNavigate()

  const myGroups = groups.filter(g => ENROLLED.includes(g.id))
  const myAssignments = assignments.filter(a => ENROLLED.includes(a.groupId) && a.status === 'open')
  const todayLessons = lessons.filter(l => l.dayOffset === 0)
  const recentMessages = messages.slice(0, 3)

  const submittedCount = myAssignments.filter(a =>
    submissions.some(s => s.assignmentId === a.id && s.studentId === STUDENT_ID && s.status !== 'not_submitted')
  ).length

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Min startsida</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Välkommen, {studentUser.name}
        </p>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-5 main-area">
        <div className="max-w-5xl space-y-5">

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{myGroups.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Kurser</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-orange-600 dark:text-orange-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {myAssignments.length - submittedCount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ej inlämnade</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{submittedCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Inlämnade</p>
              </div>
            </div>
          </div>

          {/* Upcoming assignments */}
          <section aria-labelledby="upcoming-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 id="upcoming-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Kommande inlämningar
              </h2>
              <button
                onClick={() => navigate('/uppgifter')}
                className="text-xs text-green-700 dark:text-green-400 hover:underline"
              >
                Se alla
              </button>
            </div>
            {myAssignments.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 py-2">Inga kommande uppgifter.</p>
            ) : (
              <ul className="space-y-2 list-none m-0 p-0" role="list">
                {myAssignments.map(a => {
                  const sub = submissions.find(s => s.assignmentId === a.id && s.studentId === STUDENT_ID)
                  const days = daysUntil(a.dueDate)
                  const isSubmitted = sub && sub.status !== 'not_submitted'
                  return (
                    <li key={a.id}>
                      <button
                        onClick={() => navigate(`/uppgifter/${a.id}`)}
                        className="flex items-center justify-between w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        aria-label={`Uppgift: ${a.title}${isSubmitted ? ', inlämnad' : `, deadline om ${days} dagar`}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {isSubmitted ? (
                            <CheckCircle size={16} className="text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${days <= 1 ? 'border-red-400' : days <= 3 ? 'border-orange-400' : 'border-gray-300'}`} aria-hidden="true" />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{a.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{a.groupName}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          {isSubmitted ? (
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">Inlämnad</span>
                          ) : (
                            <span className={`text-xs font-medium ${days <= 1 ? 'text-red-600' : days <= 3 ? 'text-orange-600' : 'text-gray-500'}`}>
                              {days <= 0 ? 'Passerad' : days === 1 ? 'Idag' : `${days} dagar`}
                            </span>
                          )}
                          <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(a.dueDate)}</p>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          {/* Two-column: My courses + Today's schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* My courses */}
            <section aria-labelledby="courses-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 id="courses-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Mina kurser
              </h2>
              <ul className="space-y-2 list-none m-0 p-0" role="list">
                {myGroups.map(g => (
                  <li key={g.id}>
                    <button
                      onClick={() => navigate(`/grupp/${g.id}`)}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      aria-label={`Öppna kurs: ${g.name}`}
                    >
                      <GroupIcon code={g.code} size="sm" color={g.color} />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{g.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Today's schedule */}
            <section aria-labelledby="today-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 id="today-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-1.5">
                Schema idag
                <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                  — Tor 28 mars
                </span>
              </h2>
              {todayLessons.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-2">Inga lektioner idag.</p>
              ) : (
                <ul className="space-y-2 list-none m-0 p-0" role="list">
                  {todayLessons.map(l => (
                    <li
                      key={l.id}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                    >
                      <div className="text-center min-w-[48px]">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{l.start}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{l.end}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{l.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {l.groupCode}{l.room ? ` · ${l.room}` : ''}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Messages */}
          <section aria-labelledby="msgs-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 id="msgs-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                Meddelanden <ArrowUpRight size={15} className="text-gray-400" aria-hidden="true" />
              </h2>
              <button onClick={() => navigate('/meddelanden')} className="text-xs text-green-700 dark:text-green-400 hover:underline">
                Se alla
              </button>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-700 list-none m-0 p-0" role="list">
              {recentMessages.map(m => (
                <li key={m.id}>
                  <button
                    onClick={() => navigate('/meddelanden')}
                    className="w-full text-left py-3 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors -mx-1 px-1 rounded"
                  >
                    <p className={`text-sm ${m.isRead ? 'text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                      {m.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {new Date(m.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })} · {m.author}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>
    </div>
  )
}
