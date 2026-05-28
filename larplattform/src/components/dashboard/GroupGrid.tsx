import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GroupIcon } from '@/components/shared/GroupIcon'
import { groups } from '@/data/groups'
import { currentUser } from '@/data/user'

export function GroupGrid() {
  const navigate = useNavigate()

  return (
    <section aria-labelledby="groups-heading" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 id="groups-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Mina grupper
        </h2>
        <button
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
          aria-label="Hantera grupper"
        >
          Hantera
        </button>
      </div>

      {/* Skolmärke */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: '#166534' }}
          aria-hidden="true"
        >
          SI
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.school}</span>
      </div>

      {/* Gruppkortsgrid */}
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none m-0 p-0"
        role="list"
        aria-label="Kurslista"
      >
        {groups.map(group => (
          <li key={group.id}>
            <button
              onClick={() => navigate(`/grupp/${group.id}`)}
              className="flex flex-col w-full text-left rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md hover:border-green-200 dark:hover:border-gray-700 transition-all duration-200"
              aria-label={`Öppna ${group.name}`}
            >
              {/* Färgad toppstripe */}
              <div
                className="h-2 w-full flex-shrink-0 rounded-t-2xl"
                style={{ backgroundColor: group.color }}
                aria-hidden="true"
              />
              {/* Kortets kropp */}
              <div className="flex items-start gap-3 p-4 flex-1">
                <GroupIcon code={group.code} size="lg" color={group.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {group.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{group.subject}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{group.memberCount} elever</p>
                </div>
              </div>
              {/* Footer */}
              <div className="px-4 pb-3 flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400">
                Visa grupp
                <ArrowRight size={12} aria-hidden="true" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
