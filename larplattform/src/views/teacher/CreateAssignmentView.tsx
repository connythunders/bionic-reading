import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Send, Plus } from 'lucide-react'
import { groups } from '@/data/groups'
import { cn } from '@/lib/utils'

type GradingType = 'AF' | 'GIG' | 'none'

type FormState = {
  title: string
  instructions: string
  groupId: string
  dueDate: string
  dueTime: string
  gradingType: GradingType
  maxPoints: string
}

const gradingOptions: { value: GradingType; label: string; desc: string }[] = [
  { value: 'AF',   label: 'A–F',       desc: 'Traditionellt betygssystem' },
  { value: 'GIG',  label: 'G / IG',    desc: 'Godkänt / Icke godkänt' },
  { value: 'none', label: 'Ingen',     desc: 'Uppgiften betygsätts inte' },
]

export function CreateAssignmentView() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    title: '',
    instructions: '',
    groupId: '',
    dueDate: '',
    dueTime: '23:59',
    gradingType: 'AF',
    maxPoints: '',
  })
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const errs: typeof errors = {}
    if (!form.title.trim())   errs.title = 'Titel krävs'
    if (!form.groupId)        errs.groupId = 'Välj en grupp'
    if (!form.dueDate)        errs.dueDate = 'Deadline krävs'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSaveDraft() {
    if (!validate()) return
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handlePublish() {
    if (!validate()) return
    navigate('/uppgifter')
  }

  const selectedGroup = groups.find(g => g.id === form.groupId)

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/uppgifter')}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Avbryt och gå tillbaka"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Ny uppgift</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-2xl space-y-6">

          {/* Title */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Titel <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="T.ex. Häst – reflektionsuppgift"
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-sm',
                'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
                'placeholder-gray-400 dark:placeholder-gray-500',
                'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                errors.title ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'
              )}
              aria-required="true"
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="task-instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Instruktioner till elever
            </label>
            <textarea
              id="task-instructions"
              value={form.instructions}
              onChange={e => set('instructions', e.target.value)}
              rows={5}
              placeholder="Beskriv uppgiften, vad eleverna ska göra och eventuella krav…"
              className={cn(
                'w-full px-4 py-3 rounded-lg border text-sm leading-relaxed resize-y',
                'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
                'placeholder-gray-400 dark:placeholder-gray-500',
                'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                'border-gray-200 dark:border-gray-600'
              )}
              aria-label="Instruktioner till elever"
            />
          </div>

          {/* Group selector */}
          <div>
            <fieldset>
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grupp <span className="text-red-500" aria-hidden="true">*</span>
              </legend>
              <div
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-2 gap-2',
                  errors.groupId ? 'ring-1 ring-red-400 rounded-lg p-2' : ''
                )}
                role="radiogroup"
                aria-required="true"
              >
                {groups.map(g => (
                  <label
                    key={g.id}
                    className={cn(
                      'flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors',
                      form.groupId === g.id
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    )}
                  >
                    <input
                      type="radio"
                      name="group"
                      value={g.id}
                      checked={form.groupId === g.id}
                      onChange={() => set('groupId', g.id)}
                      className="accent-green-700"
                      aria-label={g.name}
                    />
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: g.color }}
                      aria-hidden="true"
                    >
                      {g.code.slice(0, 2)}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-200 truncate">{g.name}</span>
                  </label>
                ))}
              </div>
              {errors.groupId && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">{errors.groupId}</p>
              )}
            </fieldset>
          </div>

          {/* Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Deadline (datum) <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="task-due-date"
                type="date"
                value={form.dueDate}
                onChange={e => set('dueDate', e.target.value)}
                min="2026-03-28"
                className={cn(
                  'w-full px-3 py-2.5 rounded-lg border text-sm',
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100',
                  'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                  errors.dueDate ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'
                )}
                aria-required="true"
              />
              {errors.dueDate && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1" role="alert">{errors.dueDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="task-due-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Tid
              </label>
              <input
                id="task-due-time"
                type="time"
                value={form.dueTime}
                onChange={e => set('dueTime', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Grading type */}
          <div>
            <fieldset>
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bedömning
              </legend>
              <div className="flex gap-2 flex-wrap" role="radiogroup">
                {gradingOptions.map(opt => (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-center',
                      form.gradingType === opt.value
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    )}
                  >
                    <input
                      type="radio"
                      name="grading"
                      value={opt.value}
                      checked={form.gradingType === opt.value}
                      onChange={() => set('gradingType', opt.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-semibold">{opt.label}</span>
                    <span className="text-xs opacity-70">{opt.desc}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* File attachment placeholder */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bifogade filer</p>
            <div className="border border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
              <Plus size={20} className="mx-auto text-gray-300 dark:text-gray-600 mb-1.5" aria-hidden="true" />
              <p className="text-sm text-gray-400 dark:text-gray-500">Dra och släpp filer, eller klicka för att bläddra</p>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5">PDF, Word, bilder upp till 50 MB</p>
            </div>
          </div>

          {/* Summary preview */}
          {(form.title || selectedGroup || form.dueDate) && (
            <section
              aria-live="polite"
              aria-label="Förhandsgranskning"
              className="p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                Förhandsvisning
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {form.title || <span className="text-gray-400">Titel saknas</span>}
              </p>
              {selectedGroup && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selectedGroup.name}</p>
              )}
              {form.dueDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Deadline: {new Date(form.dueDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })} kl {form.dueTime}
                </p>
              )}
            </section>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSaveDraft}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors',
                saved
                  ? 'bg-green-50 border-green-600 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
              )}
            >
              <Save size={15} aria-hidden="true" />
              {saved ? 'Sparat!' : 'Spara utkast'}
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-green-700 hover:bg-green-800 text-white transition-colors"
            >
              <Send size={15} aria-hidden="true" />
              Publicera uppgift
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}
