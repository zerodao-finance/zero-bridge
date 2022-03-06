/* This example requires Tailwind CSS v2.0+ */
import { RiFileListLine, RiExchangeFundsLine } from 'react-icons/ri'
import { MdOutlinePending } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/outline'
import { useScreenMode } from '../../../api/global/interfaces/interfaces.screenmode'


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
    const { themeMode, toggleScreenMode } = useScreenMode()
    var light = false
  return (
    <nav className="space-y-8 " aria-label="Sidebar">
      {/**
       * Modules
       */}
        <div className="flex flex-row gap-3 ">
            <RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>

            <button >
                Bridge Tool
            </button>
        </div>
        <div className="flex flex-row gap-3 ">
            <MdOutlinePending className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>

            <button >
                Manage Transactions
            </button>
        </div>
        <div className="flex flex-row gap-3 ">
            <BiTransfer className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>

            <button >
                History
            </button>
        </div>
        <div className="flex flex-row gap-3 ">
            <RiFileListLine className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>
            <a href="https://docs.zerodao.com" target="_blank"><button >
                Documentation
            </button></a>
        </div>
        {
          /**
           * Dark/Light toggle
           */
        }
        <div className="flex flex-row w-full justify-center self-center ">

            <button className="flex flex-row w-[100px] rounded-full border border-black justify-between" onClick={() => toggleScreenMode()}> 
                <div className={`${themeMode ? '' : 'border border-black rounded-full bg-black '} px-1 text-white`}>Dark</div>
                <div className={`px-2 ${themeMode ? 'border border-black rounded-full' : 'text-white'}`}> light </div>
            </button>
        </div>
    </nav>
  )
}