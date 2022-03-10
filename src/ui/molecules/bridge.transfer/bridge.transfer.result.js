
export const BridgeTransferResult = ({ETH, renBTC}) => {

    var dispatch = () => {}
    var state = {
        renBTC: 0,
        ETH: 0
    }
    return (

        <div className="w-fit grid grid-cols-2 gap-3 self-center">
            <div className="text-emerald-500 border-r-[1px] border-emerald-700 dark:border-slate-500 rounded-md px-4 py-2 flex flex-col justify-center items-center divide-y max-w-[90px] truncate w-[90px]">
                <p className='max-w-[75px] truncate'>
                    {ETH}
                </p>
                <p className="text-[13px]">
                    ETH
                </p>
            </div>
            <div className="text-emerald-500 border-l-[1px] border-emerald-700 dark:border-slate-500 rounded-md px-4 py-2 flex flex-col justify-center items-center divide-y max-w-[90px] truncate w-[90px]">
                <p className="max-w-[75px] truncate">
                    {renBTC}
                </p>
                <p className="text-[13px]">
                    renBTC
                </p>
            </div>

        </div>
    )
}
