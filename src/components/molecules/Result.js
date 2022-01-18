import { useBridgeContext } from '../../core/instance'
const Result = () => {

    const {state, dispatch} = useBridgeContext()
    return (

            <div className='flex flex-row justify-evenly divide-x-[.008rem] divide-emerald-300'>
                <div className="flex flex-col gap-2 w-[8rem]">
                    <p className="text-xl  text-emerald-300 truncate text-center">{state.ETH}</p>
                    <p className="text-sm text-center text-black dark:text-white">ETH</p>
                </div>
                <div className="flex flex-col gap-2 w-[8rem]">
                    <p className="text-xl text-emerald-300 text-center">{state.renBTC}</p>
                    <p className="text-sm text-center text-black dark:text-white">renBTC</p>
                </div>
            </div>

    )
}
export default Result