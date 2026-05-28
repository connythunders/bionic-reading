import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { lessons } from '@/data/schedule'

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8)  // 08–17

const DAY_LABELS = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
const DAY_DATES  = [25, 26, 27, 28, 29]
const TODAY_IDX  = 3  // Thursday = index 3

const subjectColors: Record<string, string> = {
  REL: 'bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  HIS: 'bg-orange-100 border-orange-400 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  GEO: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  SAM: 'bg-purple-100 border-purple-400 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  Provtillfällen: 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/40 dark:text-red-200',
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function getSubjectColor(subject: string) {
  return subjectColors[subject] ?? 'bg-gray-100 border-gray-400 text-gray-800'
}

export function CalendarView() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Tillbaka"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Kalender</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors" aria-label="Föregående vecka">
              <ChevronLeft size={15} /> Förra veckan
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 px-2">
              Vecka 13 · Mars 2026
            </span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors" aria-label="Nästa vecka">
              Nästa vecka <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 main-area">
        <div className="min-w-[640px]">
          {/* Day header row */}
          <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-px mb-1">
            <div />
            {DAY_LABELS.map((day, i) => (
              <div
                key={day}
                className={`text-center pb-2 ${i === TODAY_IDX ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <p className="text-xs uppercase tracking-wide">{day.slice(0, 3)}</p>
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mt-0.5 ${i === TODAY_IDX ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                  {DAY_DATES[i]}
                </span>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="relative grid grid-cols-[60px_repeat(5,1fr)] gap-px border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            {HOURS.map(hour => (
              <div key={hour} className="contents">
                {/* Time label */}
                <div className="bg-white dark:bg-gray-800 flex items-start justify-end pr-2 pt-1 h-14">
                  <span className="text-xs text-gray-400 dark:text-gray-500">{hour}:00</span>
                </div>
                {/* Day cells */}
                {DAY_LABELS.map((_, dayIdx) => {
                  const dayOffset = dayIdx - 3  // Mon=-3, Tue=-2, Wed=-1, Thu=0, Fri=1
                  const cellLessons = lessons.filter(l => {
                    if (l.dayOffset !== dayOffset) return false
                    const startH = parseInt(l.start.split(':')[0])
                    return startH === hour
                  })
                  return (
                    <div
                      key={dayIdx}
                      className={`relative bg-white dark:bg-gray-800 h-14 ${dayIdx === TODAY_IDX ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                    >
                      {cellLessons.map(lesson => {
                        const startMin = timeToMinutes(lesson.start) - hour * 60
                        const duration = timeToMinutes(lesson.end) - timeToMinutes(lesson.start)
                        const top = (startMin / 60) * 56
                        const height = (duration / 60) * 56
                        return (
                          <div
                            key={lesson.id}
                            className={`absolute left-0.5 right-0.5 rounded border-l-2 px-1 py-0.5 text-xs overflow-hidden ${getSubjectColor(lesson.subject)}`}
                            style={{ top: `${top}px`, height: `${Math.max(height, 20)}px` }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${lesson.subject} ${lesson.groupCode}, ${lesson.start}–${lesson.end}${lesson.room ? `, ${lesson.room}` : ''}`}
                          >
                            <p className="font-semibold leading-tight truncate">{lesson.subject} - {lesson.groupCode}</p>
                            <p className="opacity-75 truncate">{lesson.start}–{lesson.end}{lesson.room ? ` · ${lesson.room}` : ''}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
