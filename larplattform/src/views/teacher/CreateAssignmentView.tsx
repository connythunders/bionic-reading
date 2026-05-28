import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Send, Plus, Sparkles, BookOpen, Users, Calendar, Star, Loader2, CheckCircle } from 'lucide-react'
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
  { value: 'AF',   label: 'A–F',    desc: 'Traditionellt betygssystem' },
  { value: 'GIG',  label: 'G / IG', desc: 'Godkänt / Icke godkänt' },
  { value: 'none', label: 'Ingen',  desc: 'Uppgiften betygsätts inte' },
]

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-green-700 dark:text-green-400" aria-hidden="true" />
      </div>
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h2>
    </div>
  )
}

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

  // AI state
  const [instructionsLoading, setInstructionsLoading] = useState(false)
  const [instructionsAiGenerated, setInstructionsAiGenerated] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
    if (key === 'instructions') setInstructionsAiGenerated(false)
  }

  function validate(): boolean {
    const errs: typeof errors = {}
    if (!form.title.trim()) errs.title = 'Titel krävs'
    if (!form.groupId)      errs.groupId = 'Välj en grupp'
    if (!form.dueDate)      errs.dueDate = 'Deadline krävs'
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

  function handleGenerateInstructions() {
    if (!form.title.trim() || instructionsLoading) return
    setInstructionsLoading(true)
    setInstructionsAiGenerated(false)
    setTimeout(() => {
      setForm(f => ({
        ...f,
        instructions: `Skriv ett reflekterande svar på minst 200 ord om ämnet "${form.title}".\n\nDu ska:\n• Använda egna ord och visa att du förstår ämnet\n• Koppla till det vi har gått igenom i klassen\n• Ge minst ett konkret exempel\n• Ha en tydlig inledning, reflektion och slutsats\n\nRedovisningsform: Skriftligt individuellt arbete.`,
      }))
      setInstructionsLoading(false)
      setInstructionsAiGenerated(true)
    }, 1800)
  }

  const selectedGroup = groups.find(g => g.id === form.groupId)
  const canGenerateAI = form.title.trim().length > 0

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/uppgifter')}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Avbryt och gå tillbaka"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Ny uppgift</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-5xl lg:grid lg:grid-cols-[1fr_320px] lg:gap-6 lg:items-start">

          {/* Left: form */}
          <div className="space-y-6">

            {/* Section 1: Om uppgiften */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
              <SectionHeader icon={BookOpen} title="Om uppgiften" />

              {/* Title */}
              <div className="mb-4">
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
                    'w-full px-4 py-2.5 rounded-xl border text-sm',
                    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                    'placeholder-gray-400 dark:placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                    errors.title ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
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
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="task-instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Instruktioner till elever
                  </label>
                  <div className="flex items-center gap-2">
                    {instructionsAiGenerated && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} aria-hidden="true" />
                        AI-genererad
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleGenerateInstructions}
                      disabled={!canGenerateAI || instructionsLoading}
                      title={!canGenerateAI ? 'Fyll i en titel först' : 'Generera instruktioner med AI'}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors',
                        canGenerateAI && !instructionsLoading
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                      )}
                      aria-disabled={!canGenerateAI || instructionsLoading}
                    >
                      {instructionsLoading
                        ? <Loader2 size={12} className="animate-spin" aria-hidden="true" />
                        : <Sparkles size={12} aria-hidden="true" />
                      }
                      {instructionsLoading ? 'Genererar…' : 'AI – Generera'}
                    </button>
                  </div>
                </div>
                <textarea
                  id="task-instructions"
                  value={form.instructions}
                  onChange={e => set('instructions', e.target.value)}
                  rows={6}
                  placeholder="Beskriv uppgiften, vad eleverna ska göra och eventuella krav…"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border text-sm leading-relaxed resize-y',
                    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                    'placeholder-gray-400 dark:placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                    'border-gray-200 dark:border-gray-700',
                    instructionsAiGenerated ? 'border-purple-200 dark:border-purple-800' : ''
                  )}
                  aria-label="Instruktioner till elever"
                />
              </div>
            </div>

            {/* Section 2: Grupp & Deadline */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
              <SectionHeader icon={Users} title="Grupp & Deadline" />

              {/* Group selector */}
              <div className="mb-4">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grupp <span className="text-red-500" aria-hidden="true">*</span>
                  </legend>
                  <div
                    className={cn(
                      'grid grid-cols-1 sm:grid-cols-2 gap-2',
                      errors.groupId ? 'ring-1 ring-red-400 rounded-xl p-2' : ''
                    )}
                    role="radiogroup"
                    aria-required="true"
                  >
                    {groups.map(g => (
                      <label
                        key={g.id}
                        className={cn(
                          'flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors',
                          form.groupId === g.id
                            ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
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
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs font-bold flex-shrink-0"
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
                      'w-full px-3 py-2.5 rounded-xl border text-sm',
                      'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                      'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
                      errors.dueDate ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
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
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Bedömning */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
              <SectionHeader icon={Star} title="Bedömning" />
              <fieldset>
                <legend className="sr-only">Betygsskala</legend>
                <div className="flex gap-2 flex-wrap" role="radiogroup">
                  {gradingOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={cn(
                        'flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors text-center',
                        form.gradingType === opt.value
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
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

            {/* Section 4: Filer */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
              <SectionHeader icon={Plus} title="Bifogade filer" />
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                  <Plus size={18} className="text-gray-400 dark:text-gray-500" aria-hidden="true" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Dra och släpp filer här</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">eller klicka för att bläddra</p>
                <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">PDF, Word, bilder upp till 50 MB</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pb-6">
              <button
                onClick={handleSaveDraft}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors',
                  saved
                    ? 'bg-green-50 border-green-600 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <Save size={15} aria-hidden="true" />
                {saved ? 'Sparat!' : 'Spara utkast'}
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-green-700 hover:bg-green-800 text-white transition-colors"
              >
                <Send size={15} aria-hidden="true" />
                Publicera uppgift
              </button>
            </div>
          </div>

          {/* Right: sticky preview */}
          <aside className="hidden lg:block lg:sticky lg:top-6" aria-label="Förhandsgranskning av uppgift">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={14} className="text-gray-400" aria-hidden="true" />
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  Förhandsvisning
                </p>
              </div>

              <div aria-live="polite">
                {form.title ? (
                  <p className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug mb-1">
                    {form.title}
                  </p>
                ) : (
                  <p className="text-base font-bold text-gray-300 dark:text-gray-600 italic mb-1">Titel saknas…</p>
                )}

                {selectedGroup ? (
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold text-white mt-1"
                    style={{ backgroundColor: selectedGroup.color }}
                  >
                    {selectedGroup.name}
                  </span>
                ) : (
                  <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Ingen grupp vald</p>
                )}

                {form.dueDate && (
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={11} aria-hidden="true" />
                    Deadline: {new Date(form.dueDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })} kl {form.dueTime}
                  </div>
                )}

                {form.instructions && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Instruktioner
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-6">
                      {form.instructions}
                    </p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Bedömning: <span className="font-medium text-gray-600 dark:text-gray-300">
                      {gradingOptions.find(o => o.value === form.gradingType)?.label}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  )
}
