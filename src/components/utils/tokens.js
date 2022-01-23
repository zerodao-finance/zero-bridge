import {FaBitcoin, FaEthereum} from 'react-icons/fa'
import { ethers } from 'ethers'
import tools from '../../utils/_utils'


const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

export const library = {
    bitcoin: {
        name: "bitcoin",
        symbol: 'BTC',
        icon: <FaBitcoin className="w-max h-[2rem] fill-gray-400"/>,
        priceFeedAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
        get priceFeed () { 
            return tools.contract.get_dy(0, 2, 1)
        }
    },
    ethereum: {
        name: "ethereum",
        symbol: "ETH",
        icon: <FaEthereum className="w-max h-[2rem] fill-gray-400"/>,
        priceFeedAddress: '0x9326BFA02ADD2366b30bacB125260Af641031331',
        get priceFeed() { 
            return tools.contract.get_dy(0, 1, ethers.utils.parseUnits("1", 11))
        }
    },
}

