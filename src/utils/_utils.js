import { ethers } from 'ethers'
import { getContract } from '../contracts'
import moment from 'moment'
// import {enableGlobalMockRuntime, createMockKeeper} from "zero-protocol/dist/lib/mock.js"

/**
 * Arbitrum Chain Data
 */
const chainData = [{
    chainId: '0xA4B1',
    chainName: 'Arbitrum',
    nativeCurrency:
        {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
}]

// createMockKeeper()
// enableGlobalMockRuntime()

/**
 * Curve Arbitrum Address & ABI
 */
const curveArbitrum = '0x960ea3e3C7FB317332d990873d354E18d7645590';  // Swap wBTC for wETH (indeces to swap are 1 -> 2 in pool.coins)

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
];

/**
 * Keeper Connection Settings (TESTING)
 */
const SIGNALING_MULTIADDR =
  "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/";
const TEST_KEEPER_ADDRESS = 
  process.env.REACT_APP_TEST_KEEPER_ADDRESS ||
  "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494";



// 0x960ea3e3C7FB317332d990873d354E18d7645590 -- old contract address
// 0x53f38bEA30fE6919e0475Fe57C2629f3D3754d1E

const controller = getContract('ZeroController')
const contract = new ethers.Contract('0x960ea3e3C7FB317332d990873d354E18d7645590', [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], controller.provider);
console.log('CONTRACT', contract)
console.log("CONTROLLER", controller)
const connectedWallet = "0xD903338baE3D5C59259E562a49E4ab177E3149a1";
 const zeroModule = "0x6b9F827D9e0607098d5DdA6D84D2c2164e1B90A9"; // arbitrum convert module address
 const trivialUnderwriter = "0xd0D8fA764352e33F40c66C75B3BC0204DC95973e";
 const asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501"; // renBTC on arbitrum
 
  


import { LocalStoragePersistenceAdapter } from "zero-protocol/dist/lib/persistence/localStorage"
const storage = new LocalStoragePersistenceAdapter()

LocalStoragePersistenceAdapter.prototype.getAllTransferRequests = () => {
  const returnArr = []
  const entries = Object.entries(window.localStorage).filter(([k, v]) => k.startsWith('request:'))
  for (const [key, value] of entries){
    returnArr.push(JSON.parse(value))
  }
  returnArr.sort((a,b) => {return new Date(a.date) - new Date(b.date)})
  // returnArr.sort((a, b) => {
  //   moment(a.date).diff(b.date)
  // })
  return returnArr.reverse()
}

LocalStoragePersistenceAdapter.prototype.getLastTransferRequest = () => {
  const returnArr = []
  const entries = Object.entries(window.localStorage).filter(([k, v]) => k.startsWith('request:'))
  for (const [key, value] of entries){
    returnArr.push({key: key, data: JSON.parse(value)})
  }
  returnArr.sort((a,b) => {return new Date(a[1].date) - new Date(b[1].date)})
  // returnArr.sort((a, b) => {
  //   moment(a.date).diff(b.date)
  // })
  return returnArr.reverse()
}

LocalStoragePersistenceAdapter.prototype.setStatus = (key, value) => {
  console.log(key, typeof key)
  const item = Object.entries(window.localStorage).find(([k, v]) => k.startsWith('request:' + key))
  console.log(item)
  const parsed = JSON.parse(item[1])
  parsed.status = "success"
  const unparsed = JSON.stringify(parsed)
  window.localStorage.setItem(`request:${key}`, unparsed)
}






let tools
export default tools = {
    chainData: chainData,
    curveABI: curveABI, 
    curveArbitrum: curveArbitrum,
    TEST_KEEPER_ADDRESS: TEST_KEEPER_ADDRESS,
    SIGNALING_MULTIADDR: SIGNALING_MULTIADDR,
    contract: contract,
    connectedWallet: connectedWallet,
    zeroModule: zeroModule,
    trivialUnderwriter: trivialUnderwriter,
    asset: asset,
    controller: controller,
    storage: storage,
    

}