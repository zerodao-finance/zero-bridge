import { useState, useEffect, useContext } from 'react'
import { useSigner } from '../../wallet'
import { IBridgeMonitor } from '../../../instance'
import { useBridgeContext } from '../../bridge/context'
import { _events } from '../../event'
import _ from "lodash"
import { sdk } from '../../sdk'


export function useTransactionSender(props){
    const retrieveSigner = useSigner()
    const {connection, connectWallet} = global.wallet
    const {state, dispatch} = useBridgeContext()
    const [ isLoading, toggle ] = useState(false)

    const sign = async () => {
        sdk.submitNewTX(await retrieveSigner(), state.value, state.ratio, state)
    }
    
    return [isLoading, sign]
}

export function useTransactionListener(props){
    const [ deposit, setDeposit ] = useState(null)
    const [ signed, setSigned ] = useState(null)
    const [ mint, setMint ] = useState(null)

    useEffect(() => {
        IBridgeMonitor.listener.on("transaction", async (mint) => {
            if (process.env.REACT_APP_TEST){
                let _deposit = await new Promise((resolve) => mint.on("deposit", resolve))
                setMint(mint)
                setSigned(await _deposit.signed())
                setDeposit(await _deposit.confirmed())
            } else {
                let _deposit = await mint.on("deposit", async (deposit) => {
                    console.log(deposit.depositDetails)
                    setSigned( deposit.signed())
                    setDeposit( deposit.confirmed())
                })
                await setMint(mint)
            }
                
        })

        return () => IBridgeMonitor.listener.removeAllListeners()
    }, [])

    useEffect(async () => {
        IBridgeMonitor.listener.on("background", async (_transferRequest) => {
            console.log("Background Process: processing past TX")
            let _mint = await IBridgeMonitor.load(_transferRequest)
            let _deposit = await _mint.processDeposit
            console.log(_deposit)
            IBridgeMonitor.listener.emit("cleared")

        })
    }, [])



    useEffect(async () => {
        if (deposit && (!process.env.REACT_APP_TEST && deposit.status !== "reverted") && signed) {
            console.log(`Transaction Listener: Found TX \n`, deposit.depositDetails)
            IBridgeMonitor.listener.emit("clear")
            _TransactionNotifications.emitter.emit("add", deposit)
            signed.on("status", (status) => { if (status === "done") _TransactionNotifications.emitter.emit("delete")})
            setDeposit(null)
            setMint(null)
            setSigned(null)
        } else if (deposit && process.env.REACT_APP_TEST && signed) {
            console.log(`Transaction Listener: Found TX \n`)
            IBridgeMonitor.listener.emit("clear")
            _TransactionNotifications.emitter.emit("add", deposit)
            signed.on("status", (status) => {if (status === "signed") _TransactionNotifications.emitter.emit("delete")})
            setDeposit(null)
            setMint(null)
            setSigned(null)

        }

    }, [deposit])
}