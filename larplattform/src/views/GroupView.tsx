import { ArrowLeft, Users, BookOpen, ClipboardList } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { groups } from '@/data/groups'
import { assignments } from '@/data/assignments'
import { GroupIcon } from '@/components/shared/GroupIcon'

export function GroupView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const group = groups.find(g => g.id === id)

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500 dark:text-gray-400">Gruppen hittades inte.</p>
        <button onClick={() => navigate('/')} className="text-sm text-green-700 hover:underline">
          ← Tillbaka
        </button>
      </div>
    )
  }

  const groupAssignments = assignments.filter(a => a.groupId === id)

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Tillbaka"
          >
            <ArrowLeft size={18} />
          </button>
          <GroupIcon code={group.code} size="md" color={group.color} />
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              {group.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{group.subject}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 main-area">
        <div className="max-w-3xl space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Users, label: 'Elever', value: group.memberCount },
              { icon: ClipboardList, label: 'Uppgifter', value: groupAssignments.length },
              { icon: BookOpen, label: 'Material', value: 4 },
            ].map(stat => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 gap-1"
              >
                <stat.icon size={20} className="text-green-700 dark:text-green-400" aria-hidden="true" />
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Assignments in this group */}
          {groupAssignments.length > 0 && (
            <section aria-labelledby="group-tasks">
              <h2 id="group-tasks" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Uppgifter
              </h2>
              <ul className="space-y-2 list-none m-0 p-0" role="list">
                {groupAssignments.map(a => (
                  <li key={a.id}>
                    <button
                      onClick={() => navigate(`/uppgifter/${a.id}`)}
                      className="flex items-center justify-between w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-green-300 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{a.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {a.submissions} inlämn.
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Placeholder material section */}
          <section aria-labelledby="group-material">
            <h2 id="group-material" className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Material
            </h2>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-600 text-center">
              <BookOpen size={24} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" aria-hidden="true" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Inga material uppladdade ännu.
              </p>
              <button className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium">
                + Lägg till material
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
