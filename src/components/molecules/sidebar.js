import { RiFileListLine, RiExchangeFundsLine } from 'react-icons/ri'
import { MdOutlinePending } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'
import { BsBug } from 'react-icons/bs'
import { DarkLight } from '../atoms/DarkLight'


export const Sidebar = ({switcher, tool}) => {
    console.log('switcher: ', tool)
    const active = " bg-slate-100 dark:bg-emerald-400"
    return (
        <div className="min-h-full flex fixed right-0 bg-white w-20 hover:w-[14rem] hover:rounded-l-[7rem] group rounded-l-[7rem] shadow-2xl z-50 dark:bg-emerald-300 transition-all ease-in-out duration-150 text-black font-light text-sm">
            <div className="grow w-full flex flex-col items-center justify-between pb-40 mt-[8rem]">
                <div className="flex flex-col gap-8 w-full">
                    <div className={"flex flex-row gap-3 w-full py-2 hover:underline decoration-2 decoration-emerald-300 dark:decoration-white cursor-pointer hover:bg-slate-100 dark:hover:bg-emerald-400 ".concat(tool === 'convert' ? active : '')} onClick={() => switcher("convert")}>
                        <div className="flex flex-row mx-auto">
                            <RiExchangeFundsLine className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>
                            <div className="hidden group-hover:block opacity-0 group-hover:opacity-100 pl-3">
                                Bridge Tool
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-row gap-3 w-full py-2 hover:underline decoration-2 decoration-emerald-300 dark:decoration-white cursor-pointer hover:bg-slate-100 dark:hover:bg-emerald-400 ".concat(tool === 'manage' ? active : '')} onClick={() => switcher("manage")}>
                        <div className="flex flex-row mx-auto">
                            <MdOutlinePending className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>
                            <div className="hidden group-hover:block opacity-0 group-hover:opacity-100 pl-3">
                                Manage Transactions
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-row gap-3 w-full py-2 hover:underline decoration-2 decoration-emerald-300 dark:decoration-white cursor-pointer hover:bg-slate-100 dark:hover:bg-emerald-400 ".concat(tool === 'transactions' ? active : '')} onClick={() => switcher("transactions")}>
                        <div className="flex flex-row mx-auto">
                            <BiTransfer className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>
                            <div className="hidden group-hover:block opacity-0 group-hover:opacity-100 pl-3">
                                History
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 w-full py-2 hover:underline decoration-2 decoration-emerald-300 dark:decoration-white cursor-pointer hover:bg-slate-100 dark:hover:bg-emerald-400" onClick={() => window.open("https://docs.zerodao.com")}>
                        <div className="flex flex-row mx-auto">
                            <RiFileListLine className="h-[1.2rem] w-[1.2rem] dark:fill-black"/>
                            <div className="hidden group-hover:block opacity-0 group-hover:opacity-100 pl-3">
                                Documentation
                            </div>
                        </div>
                    </div>
                </div>  
                 <DarkLight />
                </div>
            </div>
    )
}
