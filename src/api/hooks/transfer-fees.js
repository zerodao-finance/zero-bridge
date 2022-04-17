import { computeOutputBTC } from 'zero-protocol/lib/badger';
import { ethers } from "ethers";

function processAmount(amount, token) {
    switch(token) {
        case 'USDC':
            return ethers.utils.parseUnits(amount, 6)
        default:
            return ethers.utils.parseUnits(amount, 18)
    }
}

function formatOutput(output, token) {
    switch(token) {
        case 'USDC':
            return ethers.utils.formatUnits(output, 8)
        default:
            return ethers.utils.formatUnits(output, 18)
    }
}

function useTransferFees(){
    async function getTransferOutput({ amount, token }) {
        const input = {
            asset: token,
            amount: processAmount(amount, token)
        }
        let output = await computeOutputBTC(input);
        output = formatOutput(output, token);
        return output;
    }

    return {
        getTransferOutput
    }
}

export default useTransferFees;