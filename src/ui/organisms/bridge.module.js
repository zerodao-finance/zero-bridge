import { BridgeTransferModule } from "../molecules/bridge.transfer"
import { BridgeGatewayConfirmation } from "../molecules/bridge.gateway/bridge.gateway"
import { BridgeLoadingGateway } from "../molecules/bridge.gateway/bridge.loading.gateway"
import { BridgeLoadingSignature } from "../molecules/bridge.transfer/bridge.loading.signature"
import { useBridgePage } from "../../api/global/interfaces/interface.bridge"
import Disclaimer from "./Disclaimer"

export const BridgeModule = () => {
    const { toggleMode, back, mode, processing, signed, tcSigned, data } = useBridgePage()
    console.log('t&c signed:', tcSigned)
    
    return (
        !tcSigned ? 
                        <Disclaimer /> :
        <div className='flex flex-col container h-fit bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-1 md:gap-3 first:gap-0 w-fit pb-4 dark:bg-gray-700 text-white min-w-[370px]'>
            <p className="text-lg font-header text-black tracking-wider w-full bg-emerald-300 text-center rounded-t-md pt-[.25rem] pb-[.25rem] ">Bridge Funds</p>
            <div className={`h-full w-full grid grid-cols-2 grid-flow-rows mb-8 bg-gray-200 dark:bg-gray-800 align-center font-light tracking-wider text-sm text-center`}>
            </div>
            { processing ? 
            
                signed ? 
                    data ?
                        <BridgeGatewayConfirmation />
                        :
                        <BridgeLoadingGateway />
                    :
                    <BridgeLoadingSignature />
                :
                    mode === "transfer" ? 
                        <BridgeTransferModule />
                        :
                        <>Release</>
            
            }
        </div>
    )
}