import { BridgeTransferInput } from './bridge.transfer.input'
import { BridgeTransferResult } from './bridge.transfer.result'
import { BridgeTransferRatio } from './bridge.transfer.ratio'
import { BridgeTransferSubmit } from './bridge.transfer.submit'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useBridgeInput } from '../../../api/global/interfaces/interfaces.input'
import { useBridgeDisplay } from '../../../api/global/interfaces/interfaces.display'

export const BridgeTransferModule = () => {
    const { 
        ratio,
        amount,
        isFast,
        updateRatio,
        updateAmount,
        updateModule
    } = useBridgeInput()

    const {
        ETH,
        renBTC,
        btc_usd
    } = useBridgeDisplay()

    return (
        <>
            <div className="animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around pr-[4.5rem] items-center px-1 md:px-8 ">
                <p className="text-[10px] text-gray-300 whitespace-nowrap"> transfer amount </p>
                <div className="flex flex-col">
                    <BridgeTransferInput amount={amount} effect={updateAmount} tokenPrice={btc_usd}/>
                </div>
            </div>
            <div className={`animate-flip-in-hor-top [animation-delay:500ms] flex flex-col justify-center place-items-center mt-5`}>
                <BridgeTransferRatio ratio={ratio} effect={updateRatio}/>
                <AiOutlineArrowDown className="mt-3 fill-black dark:fill-white"/>
            </div>
            <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-row  place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around pr-[4.5rem] items-center px-1 md:px-8  pt-10 pb-4`}>
                <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                <div className="flex flex-col w-full">
                    <BridgeTransferResult ETH={ETH} renBTC={renBTC} />
                </div>
            </div>
            <div className="animate-flip-in-hor-top [animation-delay:700ms]">
                <BridgeTransferSubmit />
            </div>
        </>
    )
}