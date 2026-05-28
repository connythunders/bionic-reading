import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { lessons, weekDays } from '@/data/schedule'

const TODAY_DATE = 28   // Torsdag 28 i mockdatan
const TODAY_DAY_SHORT = 'Tor'
const TODAY_MONTH = 'mars'

// Torsdag är index 3 i weekDays (Mån=0, Tis=1, Ons=2, Tor=3, Fre=4)
const TODAY_WEEK_INDEX = 3

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

export function ScheduleWidget() {
  const navigate = useNavigate()
  const todayLessons = lessons.filter(l => l.dayOffset === 0)

  return (
    <section aria-labelledby="schedule-heading" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
      {/* Widget-header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="schedule-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Schema
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {TODAY_DAY_SHORT} {TODAY_DATE} {TODAY_MONTH}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Föregående dag"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Nästa dag"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
          <button
            onClick={() => navigate('/kalender')}
            className="ml-1 text-xs text-green-700 dark:text-green-400 hover:underline font-medium"
            aria-label="Se hela schemat"
          >
            Hela schemat →
          </button>
        </div>
      </div>

      {/* Dag-indikatorer (Mån–Fre) */}
      <div className="flex gap-1 mb-4" role="list" aria-label="Veckans dagar">
        {weekDays.map((day, i) => {
          const dayLessons = lessons.filter(l => l.dayOffset === i - TODAY_WEEK_INDEX)
          const isToday = i === TODAY_WEEK_INDEX
          return (
            <div
              key={day}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl text-center cursor-pointer transition-colors ${
                isToday
                  ? 'bg-green-700 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
              }`}
              role="listitem"
              aria-label={`${day}, ${dayLessons.length} lektioner`}
              aria-current={isToday ? 'date' : undefined}
            >
              <span className={`text-xs font-medium ${isToday ? 'text-white' : ''}`}>
                {day}
              </span>
              {dayLessons.length > 0 ? (
                <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold ${
                  isToday ? 'bg-white/20 text-white' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}>
                  {dayLessons.length}
                </span>
              ) : (
                <span className={`text-xs ${isToday ? 'text-white/60' : 'text-gray-300 dark:text-gray-600'}`}>–</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Lektionslista */}
      <div className="space-y-2" role="list" aria-label="Lektioner idag">
        {todayLessons.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">
            Inga lektioner idag
          </p>
        ) : (
          todayLessons.map(lesson => (
            <div
              key={lesson.id}
              className={`flex items-start gap-3 p-3 rounded-xl border-l-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${getSubjectBorder(lesson.subject)}`}
              role="listitem"
            >
              <div className="text-center min-w-[46px] flex-shrink-0">
                <p className="text-xs font-mono font-semibold text-gray-700 dark:text-gray-200">{lesson.start}</p>
                <p className="text-xs font-mono text-gray-400 dark:text-gray-500">{lesson.end}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{lesson.subject}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
                    {lesson.groupCode}
                  </span>
                  {lesson.room && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">{lesson.room}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
