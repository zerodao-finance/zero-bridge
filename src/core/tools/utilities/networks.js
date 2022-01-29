import { ethers } from 'ethers'
import { controller } from './zero'
const curveABI = [
    {
      stateMutability: "view",
      type: "function",
      name: "get_dy",
      inputs: [
        { name: "i", type: "uint256" },
        { name: "j", type: "uint256" },
        { name: "dx", type: "uint256" },
      ],
      outputs: [{ name: "", type: "uint256" }],
      gas: 3122,
    },
]


export const NETWORK_ROUTER = {
    Polygon: {
        normal_chainId: 137,
        swap_address: '0x751B1e21756bDbc307CBcC5085c042a0e9AaEf36',
        abi: curveABI,
        get contract() {
            return new ethers.Contract(this.swap_address, [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], controller.provider)
         }
        },
    Arbitrum: {
        normal_chainId: 42161,
        swap_address: '0x960ea3e3C7FB317332d990873d354E18d7645590',
        curveABI: curveABI,
        get contract() {
            return new ethers.Contract(this.swap_address, [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], controller.provider)
            }
    }
}