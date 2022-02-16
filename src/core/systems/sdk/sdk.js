import { UnderwriterTransferRequest, TransferRequest } from 'zero-protocol/dist/lib/zero';
import {ethers} from 'ethers';
import { MOCK_TF_RQ, controller } from '../../tools/utilities'
import { _events } from '../event'
import { chainFromHexString } from '../wallet'


class SDK {

    zeroUser
    constructor(){

    }
    
    
    
    async  submitNewTX(_signer, _value, _ratio, state) {
        console.log("Submitting a new Transfer Request")
        const { connection, connectWallet } = global.wallet
        if (!connection) return
        let chain = chainFromHexString(await connection.eth.getChainId())
        let tools = MOCK_TF_RQ[chain.chainName]

        /**
         * CREATE
         */
        var _to
        var _key
        try {
            _to = await _signer.getAddress()
        } catch (error) {
            const err = "Oops, check wallet connection"
            _events.dispatch.emit("error", err, 4000)
            return
        }
        const data = ethers.utils.defaultAbiCoder.encode(
            ["uint256"],
            [ethers.utils.parseEther(_ratio).div(ethers.BigNumber.from('100'))]
        )

        const asset = tools.asset
        const transferRequest = new TransferRequest({
            to: _to,
            contractAddress: controller.address,
            underwriter: tools.trivialUnderwriter,
            module: tools.zeroModule,
            nonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
            pNonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)), // nonce and pNonce must be unique every time, there is no special meaning to them,
            asset,
            amount: ethers.utils.parseUnits(String(_value), 8),
            data: String(data)
        })

        /**
         * SIGN
         */
        try {
            await transferRequest.sign(_signer)
        } catch(error){
            const err = "Oops, check wallet connection"
            _events.dispatch.emit("error", err, 4000)
            return
        }

        /**
         * DRY
         */

        try {
            console.log(typeof UnderwriterTransferRequest)
            await new UnderwriterTransferRequest(transferRequest).dry(_signer.provider, { from : '0x12fBc372dc2f433392CC6caB29CFBcD5082EF494'})
            _key = await storage.set(transferRequest)
            storage.storeSplit(_key, state.renBTC, state.ETH);
        } catch (error) {

		console.error(error);
            const err = "Loan will fail, double check input values"
            console.log("locan will fail", error)
            // _events.dispatch.emit("error", err, 4000)
            return
        }


        /**
         * TRANSFER
         */

        try {
            await this.zeroUser.publishTransferRequest(transferRequest)
            const _mint = await transferRequest.submitToRenVM()
            if (process.env.REACT_APP_TEST){
                //mock
                _events.dispatch.emit("new_transaction_submited", transferRequest, _mint.gatewayAddress)
                let deposit = await new Promise(async (resolve) => _mint.on("deposit", resolve))
                console.log(deposit)
                const confirmed = await deposit.confirmed();
                _events.dispatch.emit("new_transaction_confirmed")
                _events.dispatch.emit("confirmed", confirmed)
                confirmed.on('confirmation', (currentConfirmations, totalNeeded) => {
                    console.log(currentConfirmations + '/' + totalNeeded + ' confirmations seen');
                });
                const signed = await deposit.signed();
                signed.on('status', (status) => {
                    if (status === 'signed') storage.updateTransferRequest(_key, "success");
                });
            }
            else {
                //prod
                let tf = {...transferRequest}
                var _gatewayAddress = await transferRequest.toGatewayAddress()
                _events.dispatch.emit("new_transaction_submited", tf, _gatewayAddress)
                let _deposit = await _mint.on("deposit", async (deposit) => {
                    _events.dispatch.emit("new_transaction_confirmed")
                    console.log(deposit)
                    console.log(deposit.depositDetails)
                    let confirmed = deposit.confirmed()
                    let signed = deposit.signed()
                    _events.dispatch.emit("confirmed", confirmed)
                    signed.on("status", (status) => { 
                        if (status === 'done') storage.updateTransferRequest(_key, "success");
                    })
                })
                /**
                 * 
                 */
            }
        } catch (error){
            storage.deleteTransferRequest(_key)
            const err = "Error connecting to with RenVM! Try again later"
                _events.dispatch.emit("error", err, 7000)
                return
        }
                               

    }

    async submitPendingTX(data) {
        let _key = data.key
        try{
            const transferRequest = new TransferRequest(data.data)
            const _mint = await transferRequest.submitToRenVM()
            if (process.env.REACT_APP_TEST){
                console.log("here")
                //mock
                let deposit = await new Promise(async (resolve) => _mint.on("deposit", resolve))
                console.log(deposit)
                const confirmed = await deposit.confirmed();
                confirmed.on('confirmation', (currentConfirmations, totalNeeded) => {
                    console.log(currentConfirmations + '/' + totalNeeded + ' confirmations seen');
                });
                const signed = await deposit.signed();
                    signed.on('status', (status) => {
                    if (status === 'signed') storage.updateTransferRequest(_key, "success");
                });
            }
            else {
                //prod
                let _deposit = await _mint.on("deposit", async (deposit) => {
                    let signed = deposit.signed()
                    signed.on("status", (status) => { 
                        if (status === 'signed') storage.updateTransferRequest(_key, "success");
                    })
                })
                
                
                // _events.dispatch.emit("new_transaction_submited", _mint, _gatewayAddress)
            }
        } catch (error){
            // storage.deleteTransferRequest(_key)
        }
    }


}

export const sdk = new SDK
