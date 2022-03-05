/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Bridge Tool', href: '#', icon: HomeIcon, current: true, count: '5' },
  { name: 'Manage Transactions', href: '#', icon: UsersIcon, current: false },
  { name: 'History', href: '#', icon: FolderIcon, current: false, count: '19' },
  { name: 'Documentation', href: '#', icon: CalendarIcon, current: false, count: '20+' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function MobileNavigationSidebar() {
    var light = false
  return (
    <nav className="space-y-8 " aria-label="Sidebar">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current ? 'bg-gray-100 text-black font-light border border-emerald-500' : 'text-black hover:bg-gray-50 hover:text-gray-900',
            'flex items-center px-3 py-2 text-sm font-light rounded-md'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          <item.icon
            className={classNames(item.current ? 'text-gray-500' : 'text-gray-400', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6')}
            aria-hidden="true"
          />
          <span className="truncate">{item.name}</span>
          {item.count ? (
            <span
              className={classNames(
                item.current ? 'bg-gray-50' : 'bg-gray-200 text-gray-600',
                'ml-auto inline-block py-0.5 px-3 text-xs rounded-full'
              )}
            >
              {item.count}
            </span>
          ) : null}
        </a>
      ))}
        <div className="flex flex-row w-full justify-center self-center ">

            <button className="flex flex-row w-[100px] rounded-full border border-black justify-between"> 
                <div className={`${light ? '' : 'border border-black rounded-full bg-black '} px-1 text-white`}>Dark</div>
                <div className={`px-2 ${light ? 'border border-black rounded-full' : 'text-white'}`}> light </div>
            </button>
        </div>
    </nav>
  )
}