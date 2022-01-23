/**
 * atoms
 */
import Convert from './Convert'
import RequestInput from '../atoms/_inputAtoms'
import { useBridgeContext } from '../../core/instance'
import { OutlinedInput } from '../atoms/inputs'
import { DefaultFullWidth } from '../atoms/button'
import { AiOutlineArrowDown } from 'react-icons/ai'

const ReleaseTool = ({ _isLoading }) => {
    return (
        <>
            <div className={`animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center w-[25rem] gap-5 justify-around pr-[4.5rem] items-center px-8 ${_isLoading && 'invisible'}`}>
                <p className="text-[10px] text-gray-300 whitespace-nowrap">release amount</p>
                <div className="flex flex-col">
                    <RequestInput _token="ethereum" _context={useBridgeContext}/>
                </div>
            </div>
            <div className="animate-flip-in-hor-top [animation-delay:500ms] container h-max w-max flex flex-col justify-center items-center gap-3 mt-7">
                <OutlinedInput />
                <AiOutlineArrowDown className="mt-3 fill-black dark:fill-white w-max h-max"/>
            </div>
            <div className="animate-flip-in-hor-top [animation-delay:600ms] container h-max w-max flex flex-col justify-center items-center gap-3 mt-5">
                <DefaultFullWidth text="release funds"/>
            </div>
        </>
    )
}

export default ReleaseTool