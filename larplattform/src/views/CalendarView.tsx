import { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { lessons } from '@/data/schedule'

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8) // 08–17

const DAY_LABELS = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag']
const DAY_DATES = [25, 26, 27, 28, 29]
const TODAY_IDX = 3 // Torsdag = index 3

// Ämnesfärger som hex-värden för inline styling
const SUBJECT_HEX: Record<string, string> = {
  REL: '#0284c7',
  HIS: '#d97706',
  GEO: '#16a34a',
  SAM: '#7c3aed',
  Provtillfällen: '#dc2626',
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function getSubjectHex(subject: string): string {
  return SUBJECT_HEX[subject] ?? '#6b7280'
}

// Omvandla hex till rgba med given opacity
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function CalendarView() {
  const navigate = useNavigate()
  const [weekOffset, setWeekOffset] = useState(0)

  // Veckotitel (baserat på hårdkodad vecka 13, Mars 2026)
  const baseWeek = 13
  const baseYear = 2026
  const displayWeek = baseWeek + weekOffset
  const weekLabel = `Vecka ${displayWeek}, ${baseYear}`

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* ─── Header ─────────────────────────────────────── */}
      <header className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              aria-label="Tillbaka"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Kalender
            </h1>
          </div>

          {/* Vecknavigering */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              aria-label="Föregående vecka"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 min-w-[160px] text-center">
              {weekLabel}
            </span>

            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              aria-label="Nästa vecka"
            >
              <ChevronRight size={18} />
            </button>

            {weekOffset !== 0 && (
              <button
                onClick={() => setWeekOffset(0)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Idag
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── Kalender-grid ───────────────────────────────── */}
      <main className="flex-1 overflow-auto p-4 main-area">
        <div className="min-w-[640px]">

          {/* Dagkolumn-rubriker */}
          <div className="grid grid-cols-[56px_repeat(5,1fr)] gap-0 mb-1 pl-0">
            {/* Tom tidscell */}
            <div />
            {DAY_LABELS.map((day, i) => (
              <div key={day} className="text-center pb-3">
                <p className="text-xs uppercase tracking-wider font-medium text-gray-400 dark:text-gray-500">
                  {day.slice(0, 3)}
                </p>
                <span
                  className={[
                    'inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold mt-1 transition-colors',
                    i === TODAY_IDX && weekOffset === 0
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 dark:text-gray-300',
                  ].join(' ')}
                >
                  {DAY_DATES[i]}
                </span>
              </div>
            ))}
          </div>

          {/* Tidsgrid */}
          <div className="relative border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
            {HOURS.map((hour, hourIdx) => (
              <div
                key={hour}
                className={[
                  'grid grid-cols-[56px_repeat(5,1fr)]',
                  hourIdx > 0
                    ? 'border-t border-gray-50 dark:border-gray-800/50'
                    : '',
                ].join(' ')}
              >
                {/* Tidslabel */}
                <div className="flex items-start justify-end pr-3 pt-1 h-14 bg-white dark:bg-gray-900">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                    {hour}:00
                  </span>
                </div>

                {/* Dagceller */}
                {DAY_LABELS.map((_, dayIdx) => {
                  const dayOffset = dayIdx - 3 // Mån=-3, Tis=-2, Ons=-1, Tor=0, Fre=1
                  const cellLessons = lessons.filter((l) => {
                    if (l.dayOffset !== dayOffset) return false
                    const startH = parseInt(l.start.split(':')[0])
                    return startH === hour
                  })
                  const isToday = dayIdx === TODAY_IDX && weekOffset === 0
                  return (
                    <div
                      key={dayIdx}
                      className={[
                        'relative h-14 border-l border-gray-50 dark:border-gray-800/50',
                        isToday
                          ? 'bg-green-50/30 dark:bg-green-900/5'
                          : 'bg-white dark:bg-gray-900',
                      ].join(' ')}
                    >
                      {cellLessons.map((lesson) => {
                        const startMin = timeToMinutes(lesson.start) - hour * 60
                        const duration =
                          timeToMinutes(lesson.end) - timeToMinutes(lesson.start)
                        const top = (startMin / 60) * 56
                        const height = (duration / 60) * 56
                        const color = getSubjectHex(lesson.subject)
                        return (
                          <div
                            key={lesson.id}
                            className="absolute left-0.5 right-0.5 rounded-lg overflow-hidden"
                            style={{
                              top: `${top}px`,
                              height: `${Math.max(height, 24)}px`,
                              backgroundColor: hexToRgba(color, 0.1),
                              borderLeft: `3px solid ${color}`,
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${lesson.subject} ${lesson.groupCode}, ${lesson.start}–${lesson.end}${lesson.room ? `, ${lesson.room}` : ''}`}
                          >
                            <div className="px-1.5 py-1">
                              <p
                                className="font-medium text-xs leading-tight truncate"
                                style={{ color }}
                              >
                                {lesson.subject} · {lesson.groupCode}
                              </p>
                              <p className="text-xs opacity-70 truncate" style={{ color }}>
                                {lesson.start}–{lesson.end}
                                {lesson.room ? ` · ${lesson.room}` : ''}
                              </p>
                            </div>
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
