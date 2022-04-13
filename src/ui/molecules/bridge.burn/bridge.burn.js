import { useEffect, useContext, useState } from "react";
import { GlobalStateHelper } from "../../../api/utils/global.utilities"
import { storeContext } from "../../../api/global/global";
import { computeOutputBTC } from 'zero-protocol/lib/badger'
import { BridgeLoadingWallet } from "../bridge.transfer/bridge.loading.wallet"
import { BridgeLoadingSignature } from "./bridge.loading.signature"
import { useCheckWalletConnected } from "../../../api/global/interfaces/interfaces.wallet"
import { BridgeBurnInput } from './bridge.burn.amount'
import { BridgeBurnSubmit } from './bridge.burn.submit'
import { useBridgeBurnInput } from "../../../api/global/interfaces/interface.bridge.burn"
import { ethers } from "ethers";

export const BridgeBurnModule = () => {
    const { state, dispatch } = useContext(storeContext);
    const StateHelper = new GlobalStateHelper(state, dispatch)
    const { open } = useCheckWalletConnected()
    const { 
        getBridgeBurnInputProps,
        getBurnSenderProps
     } = useBridgeBurnInput() 
    const isLoading = false
    const [ BTC, setBTC ]  = useState(0)

    useEffect(() => {
        var token = getBridgeBurnInputProps().token 
        var amount = getBridgeBurnInputProps().amount
        switch(token) {
            case "renBTC":
                amount = ethers.utils.parseUnits(".00000005", 8)
            case "USDC":
                amount = ethers.utils.parseUnits(".001", 6)
        }
        var tempBurnRequest = { amount: amount , asset: StateHelper.state.wallet.network[getBridgeBurnInputProps().token] }
        const fetchBTC = async () => {
            var aBTC = await computeOutputBTC(tempBurnRequest)
            setBTC(aBTC.toNumber())
            console.log("FOUND BTC: " + BTC)
        }
        fetchBTC()
        console.log("BTC: " + BTC + ", Asset: " + getBridgeBurnInputProps().token)
        console.log(getBridgeBurnInputProps().amount)
    }, [getBridgeBurnInputProps().amount , getBridgeBurnInputProps().token])

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
                    <div className="animate-flip-in-hor-top [animation-delay:400ms] container h-max flex flex-row place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around items-center px-1 md:px-8 z-10">
                        <p className="text-[10px] text-gray-300 whitespace-nowrap"> release amount </p>
                        <div className="flex flex-col">
                            <BridgeBurnInput {...getBridgeBurnInputProps()}/>
                        </div>
                    </div>
                    <div className={` animate-flip-in-hor-top [animation-delay:600ms] container h-max flex flex-col place-content-center max-w-[25rem] gap-3 md:gap-5 justify-around items-center px-1 md:px-8  pt-8 pb-4`}>
                        <p className="text-[10px] text-gray-300 whitespace-nowrap">result</p>
                        <div className="flex flex-col w-full">
                        <div className="w-fit self-center">
                            <div className="text-badger-yellow-neon-400 flex flex-row gap-2">
                                    <p>
                                        {BTC}
                                    </p>
                                    <p>
                                        BTC
                                    </p> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="animate-flip-in-hor-top [animation-delay:700ms] mt-4">
                        <BridgeBurnSubmit {...getBurnSenderProps()}/>
                    </div>
                </>
            }
            </>
        }
        </>
    )
}
