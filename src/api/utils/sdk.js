import { ethers } from 'ethers'
import { deployments, deploymentsFromSigner } from './zero'
import { UnderwriterTransferRequest } from 'zero-protocol/dist/lib/zero';


export class sdkTransfer {
    constructor (
        zeroUser,
        value,
        ratio,
        signer,
        to,
        isFast,
        _data
    ) {
        this.isFast = isFast;
        this.ratio = ratio;
        this.zeroUser = zeroUser;
        
        // initialize Transfer Request Object

        this.transferRequest = (async function() {
            var asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501"
            const contracts = await deploymentsFromSigner(signer)   
            const amount = ethers.utils.parseUnits(String(value), 8)
            const data = String(_data)

            console.log(amount)
            return new UnderwriterTransferRequest({
                amount,
                asset,
                to,
                data,
                pNonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
                nonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
                underwriter: contracts.DelegateUnderwriter.address,
                module: contracts.Convert.address,
                contractAddress: contracts.ZeroController.address
        })
        
        
        })();
    }


    async submitTX() {
        
        // set correct module based on past in speed
        const transferRequest = await this.transferRequest
        transferRequest.module = this.isFast ? deployments.arbitrum.Convert : deployments.localhost.ArbitrumConvertQuick
        console.log(transferRequest)

    }

    
}