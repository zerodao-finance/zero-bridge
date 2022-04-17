import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useTransferPrices from './transfer-prices';
import { useBridgeInput } from "../global/interfaces/interface.bridge.transfer";

function useTransferCalculate(){
    const { getRenBtcEthPair } = useTransferPrices();
    const { getTransferInputProps } = useBridgeInput();
    const { amount, token, tokenPrice } = getTransferInputProps();

    const [calculateWith, setCalculateWith] = useState(1);
    const [calculateLoading, setCalculateLoading] = useState(false);

    useEffect(async () => {
        setCalculateLoading(true)
        if(token.toLowerCase() === 'eth'){
            const pair = await getRenBtcEthPair();
            setCalculateWith(pair);
        }
        else if(token.toLowerCase() === 'usdc'){
            if(tokenPrice){
                const btcPrice = ethers.utils.formatUnits(tokenPrice, 6);
                setCalculateWith(1 / btcPrice)
            }
        }
        else {
            setCalculateWith(1);
        }
        setCalculateLoading(false);
    }, [token]);

    const calculateAmount = (amountToCalc) => {
        if(amount == 0){
            return amount;
        } else {
            if(amountToCalc){
                return (amountToCalc / calculateWith).toFixed(6);
            } else {
                return (amount / calculateWith).toFixed(6);
            }
        }
    }

    return {
        calculateAmount,
        calculateLoading
    }
}

export default useTransferCalculate;