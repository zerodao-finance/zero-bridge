import badgerBridgeJson from 'zero-protocol/deployments/localhost/BadgerBridgeZeroController.json';
import { ethers } from "ethers";

function useTransferFees(){    
    const badgerBridge = new ethers.Contract(badgerBridgeJson.address, badgerBridgeJson.abi);

    async function toRenBtcFee(){
        console.log(badgerBridge)

    }

    async function toUsdcFee(){
        
    }

    async function toIBtcFee(){
        
    }

    async function toEthFee(){
        
    }

    async function toWBtcFee(){
        
    }

    return {
        toRenBtcFee,
        toUsdcFee,
        toIBtcFee,
        toEthFee,
        toWBtcFee
    }
}

export default useTransferFees;