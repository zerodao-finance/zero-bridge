import { RiFileListLine, RiExchangeFundsLine } from 'react-icons/ri'
import { MdOutlinePending } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import { useActiveModuleSwitcher } from '../../../api/global/interfaces/interfaces.active.module';

export const  DefaultNavigationSidebar = () => {
    const { changeActiveModule } = useActiveModuleSwitcher();

    function changeView(view){
        changeActiveModule(view)
    }

    return (
        <div className="hidden min-h-full md:flex fixed right-0 bg-white w-20 hover:w-[14rem] hover:rounded-l-[7rem] group rounded-l-[7rem] shadow-2xl z-50 dark:bg-emerald-300 transition-all ease-in-out duration-150 text-black font-light text-sm">
        <div className="grow w-full flex flex-col items-center justify-between pb-40 mt-[8rem]">
            <div className="flex flex-col gap-16 ">
                <div className="flex flex-row gap-3 hover:scale-125">
                    <RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>

                    <button 
                        className="hidden group-hover:block opacity-0 group-hover:opacity-100 transition-all delay-75 hover:text-emerald-300 dark:hover:text-white" 
                        onClick={() => changeView("bridge")}
                    >
                        Bridge Tool
                    </button>
                </div>
                <div className="flex flex-row gap-3 hover:scale-125">
                    <MdOutlinePending className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>

                    <button 
                        className="hidden group-hover:block opacity-0 group-hover:opacity-100 transition-all delay-75 hover:text-emerald-300 dark:hover:text-white" 
                        onClick={() => changeView("transactions")}
                    >
                        Manage Transactions
                    </button>
                </div>
                <div className="flex flex-row gap-3 hover:scale-125">
                    <BiTransfer className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>

                    <button 
                        className="hidden group-hover:block opacity-0 group-hover:opacity-100 transition-all delay-75 hover:text-emerald-300 dark:hover:text-white" 
                        onClick={() => changeView("history")}
                    >
                        History
                    </button>
                </div>
                <div className="flex flex-row gap-3 hover:scale-125">
                    <RiFileListLine className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>
                    <a href="https://docs.zerodao.com" target="_blank">
                        <button className="hidden group-hover:block group-hover:opacity-100 opacity-0 transition-all delay-75 hover:text-emerald-300 dark:hover:text-white">
                            Documentation
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
    )
}