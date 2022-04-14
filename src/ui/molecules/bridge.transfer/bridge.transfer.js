import { useState } from 'react'
import { BridgeTransferInput } from './bridge.transfer.input'
import { BridgeTransferResult } from './bridge.transfer.result'
import { BridgeTransferRatio } from './bridge.transfer.ratio'
import { BridgeTransferSubmit } from './bridge.transfer.submit'
import { BridgeModuleToggle } from './bridge.module.toggle'
import { BridgeLoadingSignature } from './bridge.loading.signature'
import { BridgeLoadingGateway } from './bridge.loading.gateway'
import { BridgeGatewayConfirmation } from '../bridge.gateway/bridge.gateway'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useBridgeInput } from '../../../api/global/interfaces/interface.bridge.transfer'
import { useCheckWalletConnected } from '../../../api/global/interfaces/interfaces.wallet'
import BridgeTransferFrom from './bridge.transfer.from'
import useTransferFees from '../../../api/hooks/transfer-fees'
import { useEffect } from 'react'

export const BridgeTransferModule = ({ mode }) => {
    const { 
        getTransferSenderProps,
        getTransferInputProps,
        getTransferRatioProps,
        getTransferResultsProps,
        getTransferModuleToggleProps,
        getGatewayData,
    } = useBridgeInput();

    // Getting Fees - START
    const { getTransferOutput } = useTransferFees();
    const { amount, token } = getTransferInputProps();
    const [isFeeLoading, setIsFeeLoading] = useState(false);
    const [fee, setFee] = useState();
    useEffect(async () => {
        if(amount > 0) {
            setIsFeeLoading(true);
            const output = await getTransferOutput({ amount, token });
            setFee(output);
            setIsFeeLoading(false);
        }
    }, [amount, token])
    // Getting Fees - END
    
    const { 
        open
    } = useCheckWalletConnected()

    if ( mode === "input") {
        return (
            <>
                <div className="container h-max flex flex-row place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around items-center px-1 md:px-8 z-10">
                    <div className='flex flex-col w-full justify-center items-center'>
                        <p className="animate-flip-in-hor-top text-[10px] text-black dark:text-white opacity-60 w-full whitespace-nowrap text-left"> transfer amount </p>
                        <div className="flex flex-col gap-2 justify-center max-w-[100%]">
                            <div className="animate-flip-in-hor-top [animation-delay:400ms]">
                                <BridgeTransferFrom {...getTransferInputProps()} />
                            </div>
                            <AiOutlineArrowDown className="animate-flip-in-hor-top [animation-delay:500ms] fill-white self-center" />
                            <div className="animate-flip-in-hor-top [animation-delay:600ms]">
                                <BridgeTransferInput {...getTransferInputProps()}/>
                            </div>
                        </div>
                        
                        {amount > 0 && (
                            <div className="w-full shadow-inner flex justify-between px-5 py-2 mt-5 text-white rounded-xl dark:bg-badger-gray-500 bg-gray-100">
                                <div>
                                    <span>Fee</span>
                                </div>
                                <div>
                                    <span className={`${isFeeLoading && "animate-pulse"}`}>
                                        {fee || 0}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="animate-flip-in-hor-top [animation-delay:700ms] w-10/12 mt-4 pb-2">
                    <BridgeTransferSubmit {...getTransferSenderProps()}/>
                </div>
            </>
        )
    } else if ( mode === "showSigning") {
        return <BridgeLoadingSignature />
    } else if ( mode === "waitingDry") {
        return (
            <BridgeLoadingGateway />
        )
    } else if (mode === "showGateway") {
        return (
            <BridgeGatewayConfirmation {...getGatewayData()}/>
        )
    }
}
