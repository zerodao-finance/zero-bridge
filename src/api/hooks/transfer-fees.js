import { computeTransferOutput } from 'zero-protocol/lib/badger';
import { ethers } from "ethers";
import fixtures from 'zero-protocol/lib/fixtures';

function processAmount(amount, token) {
    switch(token) {
        case 'USDC':
            return ethers.utils.parseUnits(amount, 6)
        default:
            return ethers.utils.parseUnits(amount, 8);
    }
}

function formatOutput(output, token) {
    switch(token) {
        case 'USDC':
            return ethers.utils.formatUnits(output, 4)
        default:
            return ethers.utils.formatUnits(output, 8);
    }
}

function useTransferFees(){
    async function getTransferOutput({ token, amount }) {
        const input = {
            module: fixtures.ETHEREUM[token],
            amount: processAmount(amount, token)
        }
        let output = await computeTransferOutput(input);
        output = formatOutput(output, token);
        return output;
    }

    return {
        getTransferOutput
    }
}

export default useTransferFees;