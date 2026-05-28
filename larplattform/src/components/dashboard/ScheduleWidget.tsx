import { ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { lessons, weekDays } from '@/data/schedule'

const TODAY_DATE = 28  // Thursday 28 in the mockdata
const TODAY_DAY = 'TOR'

const subjectColors: Record<string, string> = {
  REL: 'border-blue-400 bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  HIS: 'border-orange-400 bg-orange-50 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  GEO: 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  SAM: 'border-purple-400 bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Provtillfällen: 'border-red-400 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

function getSubjectColor(subject: string) {
  return subjectColors[subject] ?? 'border-gray-400 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

export function ScheduleWidget() {
  const navigate = useNavigate()
  const todayLessons = lessons.filter(l => l.dayOffset === 0)

  return (
    <section aria-labelledby="schedule-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 id="schedule-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
          Schema
          <ArrowUpRight size={15} className="text-gray-400" aria-hidden="true" />
        </h2>
        <button
          onClick={() => navigate('/kalender')}
          className="text-xs text-green-700 dark:text-green-400 hover:underline"
          aria-label="Se hela schemat"
        >
          Hela schemat
        </button>
      </div>

      {/* Day header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex flex-col items-center">
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-0.5" aria-label="Föregående dag">
            <ChevronUp size={14} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
              {TODAY_DAY}
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
              {TODAY_DATE}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-0.5" aria-label="Nästa dag">
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Time grid */}
        <div className="flex-1 space-y-2" role="list" aria-label="Lektioner idag">
          {todayLessons.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">
              Inga lektioner idag
            </p>
          ) : (
            todayLessons.map(lesson => (
              <div
                key={lesson.id}
                className={`p-2.5 rounded-md border-l-3 ${getSubjectColor(lesson.subject)}`}
                role="listitem"
              >
                <p className="text-xs font-semibold leading-tight">
                  {lesson.subject} - {lesson.groupCode}
                </p>
                <p className="text-xs mt-0.5 opacity-80">
                  {lesson.start} – {lesson.end}
                  {lesson.room && <> · <span className="font-medium">{lesson.room}</span></>}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Week overview bar */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
        <div className="flex gap-1" role="list" aria-label="Veckans dagar">
          {weekDays.map((day, i) => {
            const dayLessons = lessons.filter(l => l.dayOffset === i - 3)
            const isToday = i === 3  // Thursday
            return (
              <div
                key={day}
                className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                role="listitem"
                aria-label={`${day}, ${dayLessons.length} lektioner`}
              >
                <span className={`text-xs font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {day}
                </span>
                {dayLessons.length > 0 ? (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-600 text-white text-xs font-bold">
                    {dayLessons.length}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-4 h-4 text-gray-300 text-xs">–</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
