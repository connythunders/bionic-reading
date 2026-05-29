import { useNavigate } from 'react-router-dom'
import { BookOpen, ClipboardList, CheckCircle, ArrowRight, CalendarDays } from 'lucide-react'
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

function DeadlineBadge({ dueDate, isSubmitted }: { dueDate: string; isSubmitted: boolean }) {
  if (isSubmitted) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
        <CheckCircle size={11} aria-hidden="true" />
        Inlämnad
      </span>
    )
  }
  const days = daysUntil(dueDate)
  if (days <= 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
        {days === 0 ? 'Idag' : 'Försenad'}
      </span>
    )
  }
  if (days <= 3) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
        {days} dag{days !== 1 ? 'ar' : ''}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
      {formatDate(dueDate)}
    </span>
  )
}

const subjectBorderColors: Record<string, string> = {
  REL: 'border-l-blue-400',
  HIS: 'border-l-orange-400',
  GEO: 'border-l-green-500',
  SAM: 'border-l-purple-400',
  Provtillfällen: 'border-l-red-400',
}

function getSubjectBorder(subject: string) {
  return subjectBorderColors[subject] ?? 'border-l-gray-400'
}

export function StudentDashboardView() {
  const navigate = useNavigate()

  const myGroups = groups.filter(g => ENROLLED.includes(g.id))
  const myAssignments = assignments
    .filter(a => ENROLLED.includes(a.groupId) && a.status === 'open')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  const todayLessons = lessons.filter(l => l.dayOffset === 0)
  const recentMessages = messages.slice(0, 4)

  const submittedIds = new Set(
    submissions
      .filter(s => s.studentId === STUDENT_ID && s.status !== 'not_submitted')
      .map(s => s.assignmentId)
  )
  const submittedCount = myAssignments.filter(a => submittedIds.has(a.id)).length
  const todoCount = myAssignments.length - submittedCount
  const unreadMessages = messages.filter(m => !m.isRead).length

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-y-auto px-6 py-5 main-area">
        <div className="max-w-5xl space-y-6">

          {/* Välkomstheader — lila gradient för elev */}
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 dark:from-violet-700 dark:to-purple-800 rounded-2xl p-6 text-white shadow-lg">
            <h1 className="text-2xl font-bold">
              Hej, {studentUser.name.split(' ')[0]}! 🎒
            </h1>
            <p className="text-violet-100 mt-1 text-sm">
              {todoCount > 0
                ? `Du har ${todoCount} uppgift${todoCount !== 1 ? 'er' : ''} att lämna in`
                : 'Alla uppgifter är inlämnade – bra jobbat! 🎉'}
            </p>
            <button
              onClick={() => navigate('/uppgifter')}
              className="mt-4 inline-flex items-center gap-1.5 bg-white text-purple-700 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-violet-50 transition-colors shadow-sm"
            >
              <ClipboardList size={15} aria-hidden="true" /> Mina uppgifter
            </button>
          </div>

          {/* Statistikrad */}
          <div className="grid grid-cols-3 gap-4" role="list" aria-label="Statistiköversikt">
            <button
              onClick={() => navigate('/uppgifter')}
              className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all text-left"
              role="listitem"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <BookOpen size={22} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{myGroups.length}</p>
                <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-0.5 font-medium">Mina kurser</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/uppgifter')}
              className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all text-left"
              role="listitem"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <ClipboardList size={22} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{todoCount}</p>
                <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-0.5 font-medium">Att göra</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/uppgifter')}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all text-left"
              role="listitem"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle size={22} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{submittedCount}</p>
                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-0.5 font-medium">Inlämnade</p>
              </div>
            </button>
          </div>

          {/* Kommande deadlines */}
          <section
            aria-labelledby="deadlines-heading"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="deadlines-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Kommande deadlines
              </h2>
              <button
                onClick={() => navigate('/uppgifter')}
                className="text-xs text-green-700 dark:text-green-400 hover:underline"
                aria-label="Se alla uppgifter"
              >
                Se alla
              </button>
            </div>
            {myAssignments.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 py-2">Inga kommande uppgifter.</p>
            ) : (
              <ul className="space-y-2 list-none m-0 p-0" role="list">
                {myAssignments.map(a => {
                  const isSubmitted = submittedIds.has(a.id)
                  return (
                    <li key={a.id}>
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{a.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.groupName}</p>
                        </div>
                        <div className="ml-3 flex-shrink-0 flex items-center gap-2">
                          <DeadlineBadge dueDate={a.dueDate} isSubmitted={isSubmitted} />
                          <button
                            onClick={() => navigate(`/uppgifter/${a.id}`)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 hover:underline"
                            aria-label={`Lämna in uppgiften ${a.title}`}
                          >
                            Lämna in
                            <ArrowRight size={12} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          {/* Två kolumner: Mina kurser + Schema idag */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Mina kurser */}
            <section
              aria-labelledby="courses-heading"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
            >
              <h2 id="courses-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Mina kurser
              </h2>
              {myGroups.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-2">Du är inte inskriven i några kurser.</p>
              ) : (
                <ul className="space-y-2 list-none m-0 p-0" role="list">
                  {myGroups.map(g => (
                    <li key={g.id}>
                      <button
                        onClick={() => navigate(`/grupp/${g.id}`)}
                        className="flex items-center gap-3 w-full text-left p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200"
                        aria-label={`Öppna kurs: ${g.name}`}
                      >
                        <GroupIcon code={g.code} size="sm" color={g.color} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{g.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{g.subject}</p>
                        </div>
                        <ArrowRight size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Schema idag */}
            <section
              aria-labelledby="today-schedule-heading"
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
            >
              <h2 id="today-schedule-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <CalendarDays size={16} className="text-gray-400" aria-hidden="true" />
                Schema idag
              </h2>
              {todayLessons.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-2">Inga lektioner idag.</p>
              ) : (
                <ul className="space-y-2 list-none m-0 p-0" role="list">
                  {todayLessons.map(l => (
                    <li
                      key={l.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border-l-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${getSubjectBorder(l.subject)}`}
                    >
                      <div className="text-center min-w-[46px]">
                        <p className="text-xs font-mono font-semibold text-gray-700 dark:text-gray-200">{l.start}</p>
                        <p className="text-xs font-mono text-gray-400 dark:text-gray-500">{l.end}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{l.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs mr-1">
                            {l.groupCode}
                          </span>
                          {l.room && <span>{l.room}</span>}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Senaste meddelanden */}
          <section
            aria-labelledby="student-msgs-heading"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="student-msgs-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Meddelanden
                {unreadMessages > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold" aria-label={`${unreadMessages} olästa`}>
                    {unreadMessages}
                  </span>
                )}
              </h2>
              <button
                onClick={() => navigate('/meddelanden')}
                className="text-xs text-green-700 dark:text-green-400 hover:underline"
                aria-label="Se alla meddelanden"
              >
                Se alla
              </button>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800 list-none m-0 p-0" role="list">
              {recentMessages.map(m => (
                <li key={m.id}>
                  <button
                    onClick={() => navigate('/meddelanden')}
                    className={`w-full text-left py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-start gap-2 ${!m.isRead ? 'border-l-2 border-blue-500 pl-3' : ''}`}
                    aria-label={`Läs meddelande: ${m.title}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug truncate ${m.isRead ? 'text-gray-700 dark:text-gray-300' : 'font-semibold text-gray-900 dark:text-gray-100'}`}>
                        {m.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{m.author}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5">
                      {new Date(m.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
                    </span>
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
