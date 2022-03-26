import { BridgeLoadingWallet } from "../bridge.transfer/bridge.loading.wallet"
import { BridgeLoadingSignature } from "./bridge.loading.signature"
import { useCheckWalletConnected } from "../../../api/global/interfaces/interfaces.wallet"
import { BridgeBurnResult } from './bridge.burn.result'
import { BridgeBurnInput } from './bridge.burn.amount'

export const BridgeBurnModule = () => {
    const { open } = useCheckWalletConnected()
    const isLoading = false

    const amount = 2
    const updateAmount = () => {}
    const btc_usd = 4000
    const BTC = 30
    return (
        <>
        {
            open ?
            <BridgeLoadingWallet />
            : 
            <>
            {
                isLoading ? <BridgeLoadingSignature />
                :
                <>
                    <div className="animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around pr-[4.5rem] items-center px-1 md:px-8 ">
                        <p className="text-[10px] text-gray-300 whitespace-nowrap"> release amount </p>
                        <div className="flex flex-col">
                            <BridgeBurnInput amount={amount} effect={updateAmount} tokenPrice={btc_usd}/>
                        </div>
                    </div>
                    <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-col place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around items-center px-1 md:px-8  pt-8 pb-4`}>
                        <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                        <div className="flex flex-col w-full">
                            <BridgeBurnResult BTC={BTC} />
                        </div>
                    </div>
                </>
            }
            </>
        }
        </>
    )
}