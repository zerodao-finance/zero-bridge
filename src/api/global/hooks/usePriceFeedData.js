import { storeContext } from '../global'
import { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import _ from 'lodash'
import { calculateToUSDPrice } from '../../utils/priceFeed'




export const usePriceFeedContracts = () => {
    const { state, dispatch } = useContext(storeContext)
    const { network } = state
    const { priceFeedContract } = network
    const { wallet: {address} } = state
    const { bridge: { mode }, transfer, burn} = state
    
    

    const setTokenPrice = (network, token) => (new Promise( async (resolve, reject) => {
        console.log(network, token)
        
        try {
            let price = await calculateToUSDPrice(token, "ETHEREUM", network.provider)
            resolve(price.toString())
        } catch (error) {
            reject(error.message)
        }
    }))
    
    const getBtcEthPrice = (network) => (new Promise( async (resolve, reject) => {
        let x = await _.attempt(network.priceFeedContract.get_dy, 1, 2, ethers.utils.parseUnits("1", 8))
        if (_.isError(x)){
            reject(new Error("failed to fetch price"))
        } else {
            console.log(x)
            resolve(x.toString())
        }
    }))
    
    const getBtcUsdPrice = (network) => (new Promise( async (resolve, reject) => {
        let price = await calculateToUSDPrice('USDC', 'ETHEREUM', network.provider)
        console.log(price.toString())
        // resolve(price)
        let x = await _.attempt(network.priceFeedContract.get_dy, 1, 0, ethers.utils.parseUnits("1", 8))
        if (_.isError(x)){
            reject(new Error("failed to fetch price"))
        } else {
            console.log(x.toString())
            resolve(price.toString())
        }
    }))
    const getEthUsdPrice = (network) => (new Promise( async (resolve, reject) => {
        let x = await _.attempt(network.priceFeedContract.get_dy, 2, 0, ethers.utils.parseUnits("1", 18))
        if (_.isError(x)){
            reject(new Error("failed to fetch price"))
        } else {
            resolve(x.toString())
        }
    }))


    useEffect(() => {
        const call = (token) => {
            setTokenPrice(network, token).then((value) => {
                dispatch({ type: "UPDATE", module: "priceFeeds", effect: "data", data: { tokenPrice: value }})
            })
            // Promise.allSettled([getBtcEthPrice(network), getBtcUsdPrice(network), getEthUsdPrice(network)])
            //     .then(async result => {
            //         dispatch({ type: "UPDATE", module: "priceFeeds", effect: "data", data: {btc_usd: result[1].value ,eth_usd: result[2].value, btc_eth: result[0].value,}})
            //     })
            
        }

        // var invoke = _.throttle(call, 1000)
        if (!network.provider) return
        if ( mode.mode === "transfer" ) {
            call("WBTC")
            // priceFeedContract.provider.on("block", invoke)
        } else if ( mode.mode === "release") {
            call(burn.input.token)
        }

        return () => {
            // if ( priceFeedContract ) {
            //     priceFeedContract.provider.removeListener( "block", invoke )
            //     invoke.cancel()
            // }
        }
        
    }, [mode.mode, network.provider])
}