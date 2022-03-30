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

export const BridgeTransferModule = ({ mode }) => {
    const { 
        getTransferSenderProps,
        getTransferInputProps,
        getTransferRatioProps,
        getTransferResultsProps,
        getTransferModuleToggleProps,
        getGatewayData,
    } = useBridgeInput()
    
    const { 
        open
    } = useCheckWalletConnected()

    if ( mode === "input") {
        return (
            <>
                    <div className="animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around pr-[4.5rem] items-center px-1 md:px-8 ">
                        <div className='flex flex-col w-full justify-center items-center'>
                            <p className="text-[10px] w-10/12 text-black dark:text-white opacity-60 whitespace-nowrap text-left"> transfer amount </p>
                            <div className="flex flex-col w-10/12">
                                <BridgeTransferInput {...getTransferInputProps()}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`animate-flip-in-hor-top [animation-delay:500ms] flex flex-col justify-center place-items-center mt-5`}>
                        <BridgeTransferRatio {...getTransferRatioProps()}/>
                        <AiOutlineArrowDown  className="fill-black" />
                    </div>
                    <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-col place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around items-center px-1 md:px-8  pt-8 pb-4`}>
                        <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                        <div className="flex flex-col w-full">
                            <BridgeTransferResult {...getTransferResultsProps()} />
                        </div>
                    </div>
                    <BridgeModuleToggle {...getTransferModuleToggleProps()}/>
                    <div className="animate-flip-in-hor-top [animation-delay:700ms] w-10/12 mt-4">
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

    // return (
    //     <>{
    //         open ? 
    //         <BridgeLoadingWallet />
    //         :
    //         <>{ isLoading ? <BridgeLoadingSignature /> 
    //             :
    //             <>
    //                 <div className="animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around pr-[4.5rem] items-center px-1 md:px-8 ">
    //                     <p className="text-[10px] text-gray-300 whitespace-nowrap"> transfer amount </p>
    //                     <div className="flex flex-col">
    //                         <BridgeTransferInput {...getTransferInputProps()}/>
    //                     </div>
    //                 </div>
    //                 <div className={`animate-flip-in-hor-top [animation-delay:500ms] flex flex-col justify-center place-items-center mt-5`}>
    //                     <BridgeTransferRatio {...getTransferRatioProps()}/>
    //                     <AiOutlineArrowDown  className="fill-black" />
    //                 </div>
    //                 <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-col place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around items-center px-1 md:px-8  pt-8 pb-4`}>
    //                     <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
    //                     <div className="flex flex-col w-full">
    //                         <BridgeTransferResult {...getTransferResultsProps()} />
    //                     </div>
    //                 </div>
    //                 <BridgeModuleToggle {...getTransferModuleToggleProps()}/>
    //                 <div className="animate-flip-in-hor-top [animation-delay:700ms] mt-4">
    //                     <BridgeTransferSubmit {...getTransferSenderProps()}/>
    //                 </div>
    //             </>
    //         }
    //         </>
            
    //     }</>
    // )
}