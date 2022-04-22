import * as UNISWAP from '@uniswap/sdk'
import { ethers } from 'ethers'
import { ETHEREUM, MATIC, ARBITRUM} from 'zero-protocol/dist/lib/fixtures'

const tokenRouterTable = {
    get renBTC() {
        return {
            ETHEREUM: new UNISWAP.Token(UNISWAP.ChainId.MAINNET, ethers.utils.getAddress(ETHEREUM.renBTC), 8),
            MATIC: new UNISWAP.Token(137, ethers.utils.getAddress(MATIC.renBTC), 8),
            ARBITRUM: new UNISWAP.Token(42161, ethers.utils.getAddress(ARBITRUM.renBTC), 8),
        }
    },
    get WBTC() {
        let mainnetAddress = ethers.utils.getAddress(ETHEREUM.WBTC)
        let maticAddress = ethers.utils.getAddress(MATIC.WBTC)
        let arbitrumAddress = ethers.utils.getAddress(ARBITRUM.WBTC)
        return {
            ETHEREUM: new UNISWAP.Token(UNISWAP.ChainId.MAINNET, mainnetAddress, 8),
            MATIC: new UNISWAP.Token(137, maticAddress, 8),
            ARBITRUM: new UNISWAP.Token(42161, arbitrumAddress, 8),
        }
    },
    get ibBTC() {
        return {
            ETHEREUM: new UNISWAP.Token(UNISWAP.ChainId.MAINNET, ETHEREUM.WBTC),
            MATIC: new UNISWAP.Token(137, MATIC.WBTC),
            ARBITRUM: new UNISWAP.Token(42161, ARBITRUM.WBTC),
        }
    },
    get USDC() {
        return {
            ETHEREUM: new UNISWAP.Token(UNISWAP.ChainId.MAINNET, ethers.utils.getAddress(ETHEREUM.USDC), 6),
            MATIC: new UNISWAP.Token(137, ethers.utils.getAddress(MATIC.USDC), 6),
            ARBITRUM: new UNISWAP.Token(42161, ethers.utils.getAddress(ARBITRUM.USDC), 6)
        }
    }, 
    get WETH() {
        return {
            ETHEREUM: UNISWAP.WETH[1], 
            MATIC: new UNISWAP.Token(137, ethers.utils.getAddress("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"), 18),
            ARBITRUM: null
        }
    }

}

// async function findRoute(token, network, provider){
//     let renBTC = (tokenRouterTable.renBTC)[network]
//     let USDC = (tokenRouterTable.USDC)[network]
//     let renToUSD = await UNISWAP.Fetcher.fetchPairData(renBTC, USDC)
//     try { 
//         const pair = await UNISWAP.Fetcher.fetchPairData(token, renBTC)
//         const route = new UNISWAP.Route([pair, renToUSD], token)
//         return route
//     } catch (error) {
//         console.log(error)
//     }
// }

export async function calculateToUSDPrice(token, network, provider) {
    var inputToken
    let USDC = (tokenRouterTable.USDC)[network]
    switch (token) {
        case "USDC":
            inputToken = (tokenRouterTable['WBTC'])[network]
            break;
        case "ibBTC":
            inputToken = (tokenRouterTable['renBTC'])[network]
            break;
        default:
            inputToken = (tokenRouterTable[token])[network]
    }
    // let route = await findRoute(inputToken, network, provider)
    // console.log(route)
    const ioPair = await UNISWAP.Fetcher.fetchPairData(inputToken, USDC)
    const route = new UNISWAP.Route([ioPair], inputToken)
    return ethers.utils.parseUnits(route.midPrice.toFixed(6), 6) 
}