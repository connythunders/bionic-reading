import { useNavigate } from 'react-router-dom'
import { GroupIcon } from '@/components/shared/GroupIcon'
import { groups } from '@/data/groups'
import { currentUser } from '@/data/user'

export function GroupGrid() {
  const navigate = useNavigate()

  return (
    <section aria-labelledby="groups-heading" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 id="groups-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Mina grupper
        </h2>
        <button
          className="text-xs text-green-700 dark:text-green-400 hover:underline"
          aria-label="Hantera grupper"
        >
          Hantera
        </button>
      </div>

      {/* School label */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded text-white text-xs font-bold"
          style={{ backgroundColor: '#166534' }}
          aria-hidden="true"
        >
          SI
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.school}</span>
      </div>

      {/* Group cards grid */}
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none m-0 p-0"
        role="list"
        aria-label="Kurslista"
      >
        {groups.map(group => (
          <li key={group.id}>
            <button
              onClick={() => navigate(`/grupp/${group.id}`)}
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              aria-label={`Öppna ${group.name}`}
            >
              <GroupIcon code={group.code} size="md" color={group.color} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {group.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {group.memberCount} elever
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
