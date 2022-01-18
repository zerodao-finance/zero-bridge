import { useEffect, useState } from 'react'

import moment from 'moment'
import { ethers } from 'ethers'
import { _BridgeMonitor, storage } from "../../core/instance"
export const ManageTool = () => {
    const [requests, setRequests ] = useState([]);
    useEffect(() => {
      (async () => {
        setRequests((await storage.getTransferRequests())[1]);
      })().catch((err) => console.error(err));
    }, []);
    return (
        <div className="w-2/4 h-2/5 bg-neutral-100 dark:bg-gray-700 flex flex-col rounded-b-xl shadow-lg relative animate-swing-in-top-fwd">
            <div className="w-full h-fit bg-emerald-300 rounded-t-lg shadow-lg text-center text-lg tracking-wider font-light ">Manage Transactions</div>
            <div className="grid grid-col-row grid-cols-2 lg:grid-cols-3 overflow-scroll p-3">
                {
                requests.map((i, index) => <Transaction key={index} date={i.data.date} status={i.data.status} data={i.data} item_key={i}/>)
                }
            </div>
        </div>
    )
}

const Transaction = ({date, status, data, item_key}) => {
    const key = item_key.key

    const [gateway, setGateway] = useState(null)
    const openModal = () => {
        var details = document.getElementById(`${date}`)
        details.showModal()
    }
    
    const swap = async (e) => {
        _BridgeMonitor._key = key
        let gateway = _BridgeMonitor.load(data)
        setGateway(await gateway)
    }
    
    const load = async (e) => {
        console.log(key)
        _BridgeMonitor._key = key
        var details = document.getElementById(`${date}`)
        let gateway = await _BridgeMonitor.pollTX(data)
        setGateway(await _BridgeMonitor._gatewayAddress)
        details.close()
    }
    return (
        <>
            <div className="hover:shadow-lg group rounded-xl m-4 bg-white dark:bg-gray-600 dark:text-white animate-swing-in-top-fwd z-40" onClick={openModal}>
                <div className="flex flex-col gap-3 p-2 overflow-scroll">
                    <div className="flex flex-row justify-between">
                        <div className="max-w-full h-full flex flex-row divide-x gap-3">
                            <div className="grid-rows-2 text-right max-w-fit text-[8px]">
                                <p className="text-gray-500">{moment(new Date(date)).format('M/D/YY')}</p>
                                <p className="text-gray-500">{moment(new Date(date)).format('hh:mm z')}</p>
                            </div>
                            <div className="grid-rows-2 text-left max-w-fit pl-3">
                                <p className="uppercase text-gray-400 font-medium text-[8px] whitespace-nowrap">TXN HASH</p>
                                <p className="text-[11px] whitespace-nowrap text-emerald-300">0x321...195e</p>
                            </div>
                        </div>
                        <div className="flex pr-1">
                            <p className="text-[10px] text-gray-300 invisible group-hover:visible">click to expand</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-col-dense justify-items-start w-fit">
                        <div className="flex flex-col xl:items-end gap-2">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide text-left xl:text-right xl:w-max w-1/2 truncate">deposit address:</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide text-left xl:text-right w-min">status:</p>
                        </div>
                        <div className="flex flex-col items-start w-min gap-2">
                            <p className="text-[11px] text-gray-600 w-1/2 xl:w-min text-left truncate">32xy312ns8dxn3359e90</p>
                            <p className={`text-[11px] ${_.isEqual(status, 'success') ? 'text-emerald-300' : 'text-red-400'} uppercase w-max text-left xl:w-max w-1/2 truncate`}>{status}</p>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id={`${date}`} className="rounded-xl dark:bg-slate-600 filter dark:text-white open:animate-scale-in-hor-center closed:animate-swing-out-top-bck">
            <div className="flex flex-col gap-3 p-2 overflow-scroll">
                    <div className="flex flex-row justify-between">
                        <div className="max-w-full h-full flex flex-row divide-x gap-3">
                            <div className="grid-rows-2 text-right max-w-fit text-[8px]">
                                <p className="text-gray-500 dark:text-white">{moment(new Date(date)).format('M/D/YY')}</p>
                                <p className="text-gray-500 dark:text-white">{moment(new Date(date)).format('hh:mm z')}</p>
                            </div>
                            <div className="grid-rows-2 text-left max-w-fit pl-3">
                                <p className="uppercase text-gray-400 font-medium text-[8px] whitespace-nowrap dark:text-white">TXN HASH</p>
                                <p className="text-[11px] whitespace-nowrap text-emerald-300">0x321...195e</p>
                                <p></p>
                            </div>
                        </div>
                        <div className="flex pr-1">
                            <p className="text-[10px] text-gray-400 dark:text-white">[ESC] to close</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-col-dense justify-items-start w-fit">
                        <div className="flex flex-col xl:items-end gap-2">
                            <p className="dark:text-white text-[11px] text-gray-400 uppercase tracking-wide text-left xl:text-right w-min">status:</p>
                            <p className="dark:text-white text-[11px] text-gray-400 uppercase tracking-wide text-left xl:text-right w-min">chainid:</p>
                            <p className="dark:text-white text-[11px] text-gray-400 uppercase tracking-wide text-left xl:text-right w-min">asset:</p>
                            <p className="dark:text-white text-[11px] text-gray-400 uppercase tracking-wide text-left xl:text-right w-min">amount:</p>
                            <p className="dark:text-white text-[11px] text-gray-400 uppercase tracking-wide text-left xl:text-right w-min">underwriter:</p>
                            {gateway && <p className="dark:text-white text-[11px] text-gray-400 uppercase tracking-wide text-left xl:text-right xl:w-max w-1/2 truncate">deposit address:</p>}
                        </div>
                        <div className="flex flex-col items-start w-min gap-2">
                            <p className={`text-[11px] ${_.isEqual(status, 'success') ? 'text-emerald-300' : 'text-red-400'} uppercase w-max text-left xl:w-max w-1/2 truncate`}>{status}</p>
                            <p className="dark:text-white text-[11px] text-gray-600 w-1/2 xl:w-min text-left truncate">{data.chainId}</p>
                            <p className="dark:text-white text-[11px] text-gray-600 w-1/2 xl:w-min text-left truncate">{data.asset}</p>
                            <p className="dark:text-white text-[11px] text-gray-600 w-1/2 xl:w-min text-left truncate">{ethers.utils.formatUnits(ethers.BigNumber.from(data.amount), 8)}</p>
                            <p className="dark:text-white text-[11px] text-gray-600 w-1/2 xl:w-min text-left truncate">{data.underwriter}</p>
                            {gateway && <p className="dark:text-white text-[11px] text-gray-600 w-1/2 xl:w-min text-left truncate">{gateway}</p>}
                        </div>
                    </div>
                    <div className="w-1/3 ring-orange-300 ring-2 rounded-md self-center text-center text-[13px]">
                        Deposit the exact amount of BTC to the Deposit Address
                    </div>
                    <div className="flex flex-row justify-center gap-4 mt-3">
                        <button className="bg-emerald-300 text-xs px-3 py-2 text-white w-fit rounded-md" onClick={_.isEqual(status, 'pending') ? swap : load}>Send TXN</button>
                        <button className="bg-emerald-300 text-xs px-3 py-2 text-white w-fit rounded-md">Fallback Mint</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
