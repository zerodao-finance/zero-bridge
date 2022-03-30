import { FaBtc, FaEthereum } from 'react-icons/fa'
import { SliderInput } from '../../atoms/inputs/input.slider'

export const BridgeTransferRatio = ({ratio, effect}) => {


    return (
        <div className="flex flex-col gap-2 self-center text-black dark:text-white scale-[0.8] md:scale-[1]">
            <div className="flex flex-row w-full justify-between items-center px-5 gap-2">
                <span className="flex items-center"><FaEthereum className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max text-xs"/><p className="text-xs">{`${ratio}%`}</p></span>
                <SliderInput ratio={ratio} effect={effect} />
                <span className="flex items-center font-bold"><p className="text-xs">{`${100-ratio}%`}</p><FaBtc className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max"/></span> 
            </div>
        </div>
    )
}