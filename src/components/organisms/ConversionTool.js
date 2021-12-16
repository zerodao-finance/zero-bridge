import ConvertBox from '../molecules/Box'
import { useState, createContext, useEffect } from 'react'
// import { ConversionToolContext } from '../../context/WalletContext'
import { getContract } from '../../contracts'
import { ethers } from 'ethers';
import {
    TransferRequest,
    createZeroConnection,
    createZeroUser,
  } from "zero-protocol/dist/lib/zero.js";

/**
 * DEVELOPMENT CONSTANTS
 * TODO: REMOVE
 */
 const connectedWallet = "0xD903338baE3D5C59259E562a49E4ab177E3149a1";
//  const connectedWallet = "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494";
 const zeroModule = "0x59741D0210Dd24FFfDBa2eEEc9E130A016B8eb3F"; // arbitrum convert module address
 const trivialUnderwriter = "0xd0D8fA764352e33F40c66C75B3BC0204DC95973e";
//  const trivialUnderwriter = "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494";
 const asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501"; // renBTC on arbitrum
 const controller = getContract('ZeroController')
 console.log("CONTROLLER", controller)
 const data = ethers.utils.defaultAbiCoder.encode(
   ["uint256"],
   [ethers.utils.parseEther("0.01")]
 );
/**
 * END development constants
 */


/**
 * Utility function declarations
 */
 const rawCalculateETH = async (props, amount) => {
    console.log("PROPS.CONTRACT", props.contract);
    if (!props.contract) {
      return 0;
    }
    const res = await props.contract.methods.get_dy(1, 2, amount).call();
    return res;
  };
window.submitProps = null
var calculateEth = _.debounce(
(amount) => rawCalculateETH(window.submitProps, amount),
{ wait: 100 }
);
const contract = new ethers.Contract('0x960ea3e3C7FB317332d990873d354E18d7645590', [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], getContract('ZeroController').provider);




const ConversionTool = () => {
    const [address, setAddress] = useState(null);
    const [amount, setAmount] = useState(0)
    const [ratio, setRatio] = useState(0)
    const [eth, setEth] = useState(0)
    const [renBTC, setrenBTC] = useState(0)
    const [ethPrice, setEthPrice] = useState('0')

    /**
     * Declare user input functions
     */
    /**
     * End declaration
     */

    /**
     * Declare utilities
     */
    useEffect(async () => {
        const listener = async () => {
            try {
            setEthPrice((await contract.get_dy(1, 2, ethers.utils.parseUnits('1', 8))).toString());
            } catch (e) {
            console.error(e, "Error setting ETH price");
            }
        };
        listener().catch((err) => console.error(err));
        contract.provider.on('block', listener);
        return () => contract.provder.removeListener('block', listener);
    });

    const getSigner = async () => {
        const ethProvider = new ethers.providers.Web3Provider(web3.currentProvider);
        await ethProvider.send("eth_requestAccounts", []);
        const signer = await ethProvider.getSigner();
        return signer
      }
    
      const signRequest = async (signer, transferRequest) => {
        await transferRequest.sign(signer, controller.address);
        const gateway = await transferRequest.toGatewayAddress();
        setAddress(gateway);
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = ethers.utils.defaultAbiCoder.encode(
          ["uint256"],
          [ethers.utils.parseEther(String(Number(amount) / 100 * ratio))]
        );
    
        console.log("AMT", amount)
        console.log("ETH AMT", amount / 100 * ratio)
        console.log("CHAIN IS", process.env.CHAIN || process.env.REACT_APP_CHAIN || 'MATIC')
        const transferRequest = new TransferRequest({ 
          to: connectedWallet,
          contractAddress: controller.address,
          underwriter: trivialUnderwriter,
          module: zeroModule,
          asset,
          amount: ethers.utils.parseUnits(amount, 8),
          data: String(data),
        });
    
    
        console.log('TRANSFER REQUEST:', { 
          to: connectedWallet,
          underwriter: trivialUnderwriter,
          contractAddress: controller.address,
          module: zeroModule,
          asset,
          amount: ethers.utils.parseUnits(amount, 8),
          data: String(data),
        })
        const signer = await getSigner();
        await transferRequest.sign(signer);
        setAddress(await transferRequest.toGatewayAddress());
        console.log({ ...transferRequest });
        await window.user.publishTransferRequest(transferRequest);
        
      };



    
    return (
        <div className="grow">
                <ConvertBox />
        </div>
    )
}
export default ConversionTool 