import Convert from './Convert'
import RequestInput from '../atoms/_inputAtoms'
import Ratio from './Ratio'
import Result from './Result'
import { useBridgeContext } from '../../core/systems/bridge'
import { AiOutlineArrowDown, AiOutlineClose } from 'react-icons/ai'

const TransferTool = ({ _action, _isLoading }) => {
    return (
        <>
            <div className={`animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 ${_isLoading && 'invisible'}`}>
                <p className="text-[10px] text-gray-300 whitespace-nowrap">transfer amount</p>
                <div className="flex flex-col">
                    {/* <Convert /> */}
                    <RequestInput _token="bitcoin" _context={useBridgeContext}/>
                </div>
            </div>
            <div className={`animate-flip-in-hor-top [animation-delay:500ms] ${_isLoading && 'invisible'} flex flex-col justify-center place-items-center mt-5`}>
                <Ratio />
                <AiOutlineArrowDown className="mt-3 fill-black dark:fill-white"/>
            </div>
            <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-row  place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 pt-10 ${_isLoading && 'invisible'} pb-4`}>
                <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                <div className="flex flex-col w-full">
                    <Result />
                </div>
            </div>
            <button className={`animate-flip-in-hor-top [animation-delay:700ms] rounded-full bg-emerald-300 dark:bg-emerald-500 text-white px-3 py-2 mt-4 hover:scale-90 transition-all font-fine duration-150 hover:ring-2 ring-emerald-700 tracking-wider ${_isLoading && 'invisible'}`} onClick={_action}>
                Initiate & Sign
            </button>
        </>
    )
}

export default TransferTool