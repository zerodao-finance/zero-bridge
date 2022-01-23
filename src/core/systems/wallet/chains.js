import { ethers } from 'ethers'
const ETH = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
}

const MATIC = {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
}

export const chainFromHexString = (_hex) => {
    let bn = ethers.BigNumber.from(_hex)
    return (CHAINS[Number(bn.toString())])
}

export const CHAINS = {
    42161: {
        chainId: ethers.utils.hexValue(42161),
        chainName: 'Arbitrum',
        nativeCurrency: ETH,
        rpcUrls: [
            process.env.infuraKey ? `https://arbitrum-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://arb1.arbitrum.io/rpc',
        ].filter((url) => url !== undefined),
        blockExplorerUrls: ['https://arbiscan.io'],
    },
    137: {
        chainId: ethers.utils.hexValue(137),
        chainName: 'Polygon',
        nativeCurrency: MATIC,
        rpcUrls: [
          process.env.infuraKey ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
          'https://polygon-rpc.com',
        ].filter((url) => url !== undefined),
        blockExplorerUrls: ['https://polygonscan.com'],
      },
}

export const URLS = Object.keys(CHAINS).reduce((accumulator, chainId) => {
    const validUrls = CHAINS[Number(chainId)].rpcUrls

    if (validUrls.length) {
        accumulator[chainId] = validUrls
    }

    return accumulator
}, {})