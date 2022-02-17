import { Input, Ratio, Result } from './submolecules'
import { AiOutlineArrowDown, AiOutlineClose } from 'react-icons/ai'

export const TransferTool = ({ _action, _isLoading, _context }) => {
    return (
        <>
            <div className={`animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 ${_isLoading && 'invisible'}`}>
                <p className="text-[10px] text-gray-300 whitespace-nowrap">transfer amount</p>
                <div className="flex flex-col">
                    {/* <Convert /> */}
                    <Input _token="bitcoin" _context={_context}/>
                </div>
            </div>
            <div className={`animate-flip-in-hor-top [animation-delay:500ms] ${_isLoading && 'invisible'} flex flex-col justify-center place-items-center mt-5`}>
                <Ratio _context={_context}/>
                <AiOutlineArrowDown className="mt-3 fill-black dark:fill-white"/>
            </div>
            <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-row  place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 pt-10 ${_isLoading && 'invisible'} pb-4`}>
                <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                <div className="flex flex-col w-full">
                    <Result _context={_context}/>
                </div>
            </div>
            <button className={`animate-flip-in-hor-top [animation-delay:700ms] rounded-full bg-emerald-300 dark:bg-emerald-500 text-white px-3 py-2 mt-4 hover:scale-90 transition-all font-fine duration-150 hover:ring-2 ring-emerald-700 tracking-wider ${_isLoading && 'invisible'}`} onClick={_action}>
                Initiate & Sign
            </button>
        </>
    )
}

