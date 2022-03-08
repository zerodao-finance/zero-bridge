import { BridgeTransferModule } from "../molecules/bridge.transfer"
import { BridgeGatewayConfirmation } from "../molecules/bridge.gateway/bridge.gateway"
import { useBridgePage } from "../../api/global/interfaces/interface.bridge.page"

export const BridgeModule = () => {
    const { page, back } = useBridgePage()
    return (
        <div className='flex flex-col container h-fit bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-1 md:gap-3  first:gap-0 w-fit pb-4 dark:bg-gray-700 text-white min-w-[370px]'>
            <p className="text-lg font-light text-black tracking-wider w-full bg-emerald-300 text-center shadow-md rounded-t-md">Bridge Funds</p>
            <div className={`h-full w-full grid grid-cols-2 grid-flow-rows mb-8 bg-gray-200 dark:bg-gray-800 pt-3 align-center font-light tracking-wider text-sm text-center`}>
            </div>
            { page == "main" ?
            <BridgeTransferModule />
            :
            <BridgeGatewayConfirmation />
            }
        </div>
    )
}