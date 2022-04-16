import { computeOutputBTC } from 'zero-protocol/lib/badger';
import { ethers } from "ethers";

function useTransferFees(){    
    async function getTransferOutput({ amount, token }) {
        const input = {
            asset: token,
            amount: ethers.utils.parseUnits(amount, 18),
            type: 'transfer'
        }
        let output = await computeOutputBTC(input);
        output = ethers.utils.formatEther(output);
        return output;
    }

    return {
        getTransferOutput
    }
}

export default useTransferFees;