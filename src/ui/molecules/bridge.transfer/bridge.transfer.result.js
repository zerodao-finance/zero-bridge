
export const BridgeTransferResult = () => {

    var dispatch = () => {}
    var state = {
        renBTC: 0,
        ETH: 0
    }
    return (

            <div className='flex flex-row justify-evenly divide-emerald-300 scale-[0.8] md:scale-[1]'>
                <div className="flex flex-col gap-2 w-[8rem] border-r border-emerald-300">
                    <p className="text-xl  text-emerald-300 truncate text-center">{state.ETH}</p>
                    <p className="text-sm text-center text-black dark:text-white">ETH</p>
                </div>
                <div className="flex flex-col gap-2 w-[8rem] border-l border-emerald-300">
                    <p className="text-xl text-emerald-300 text-center">{state.renBTC}</p>
                    <p className="text-sm text-center text-black dark:text-white">renBTC</p>
                </div>
            </div>

    )
}
