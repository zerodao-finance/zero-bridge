import { ethers } from 'ethers'
import { getContract } from '../contracts'

/**
 * Global Variable Declerations
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
const SIGNALING_MULTIADDR =
  "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/";
const TEST_KEEPER_ADDRESS = 
  process.env.REACT_APP_TEST_KEEPER_ADDRESS ||
  "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494";

function setValue(event) {
    console.log("typing")
    if (!isNaN(event.nativeEvent.data) || '.'){
        event.target.value == '' ? setAmount(0) :
        setAmount(event.target.value)
        return
    } else {
        return
    }
}
const contract = new ethers.Contract('0x960ea3e3C7FB317332d990873d354E18d7645590', [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], getContract('ZeroController').provider);
const connectedWallet = "0xD903338baE3D5C59259E562a49E4ab177E3149a1";
 const zeroModule = "0x59741D0210Dd24FFfDBa2eEEc9E130A016B8eb3F"; // arbitrum convert module address
//  const trivialUnderwriter = "0xd0D8fA764352e33F40c66C75B3BC0204DC95973e";
 const trivialUnderwriter = "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494";
 const asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501"; // renBTC on arbitrum
 const controller = getContract('ZeroController')
 console.log("CONTROLLER", controller)
 const data = ethers.utils.defaultAbiCoder.encode(
   ["uint256"],
   [ethers.utils.parseEther("0.01")]
 );
  
  /** 
   * Connect Wallet: <void>
   */



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

}