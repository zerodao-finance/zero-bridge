import { useState } from 'react'
import Contract from 'web3-eth-contract'; 
import wallet_model from '../WalletModal';
import {ContractContext, Web3Context, ConversionToolContext, TransactionTableContext} from '../context/Context'
import tools from './_utils'
import { ethers } from 'ethers'
import {
    TransferRequest,
    createZeroConnection,
    createZeroUser,
  } from "zero-protocol/dist/lib/zero.js";


// TODO: implement overide fro LocalStorageMethods
// LocalStoragePersistenceAdapter.prototype.getAllTransferRequests = () => {

// }
import { toast } from 'react-toastify'
import { entries } from 'lodash';


const StateWrapper = ({children}) => {
/**
 * Arbitrum context state variables
 */
    const [ zUser, setUser ] = useState(null)
    const [ keepers, setKeepers ] = useState([])
    const [ _resultSignature, _setResultSignature ] = useState(null)

    const arbitrumContext = {
        get : {
            zUser: zUser, keepers: keepers
        },
        set : {
            setUser: setUser, setKeepers: setKeepers
        }
    }


/**
 * Web3 context state variables
 */
 const [ web3, setWeb3 ] = useState(null)
 const [ contract, setContract ] = useState(null)
 const [ connection, setConnection ] = useState(false)
 const { web3Loading, getweb3 } = wallet_model()

/**
* Web3 context functions
*/

 const connectWallet = async () => {
     //web3 wallet connect function
     await getweb3().then(async (response) => {
         setWeb3(response);
         const chainId = await response.eth.getChainId();
         if (chainId !== tools.chainData.chainId){
         await response.currentProvider.sendAsync({method: 'wallet_addEthereumChain', params: tools.chainData})
         }        

         Contract.setProvider(response);
         const curveContract = new Contract(tools.curveABI, tools.curveArbitrum)
         setContract(curveContract);
         setConnection(true)
     })
 }

 const web3Context = {
     get : {
         web3: web3, 
         contract: contract,
         connection: connection
     },
     set : {
         setWeb3: setWeb3, 
         setContract: setContract,
         setConnection: setConnection,
         connectWallet: connectWallet
     }
 }

/**
 * Transaction Table Context State Variables
 * 
 * txTable --> [{...transferRequest}]
 *      #updateTxTable << stateModifier
 *      #refreshTable() << Utility Function
 * 
 * lastTx --> localStorage request identifier 
 *      #setLastTx << stateModifier
 *      #purgeTx() << Utility Function
 *      #updateTx() << Utility Function
 * 
 * 
 */

    const [ lastTx, setLastTx ] = useState(null)
    const [ txTable, updateTxTable ] = useState([])

    const purgeTx = () => {
        setLastTx(null)
    }

    const updateLastTx = (txID) => {
        setLastTx(txID)
    }
    const refreshTable = () => {
        updateTxTable(tools.storage.getAllTransferRequests())
    }

    const refreshAndUpdate = (tsfrRequest) => {
        tools.storage.set(tsfrRequest)
        refreshTable()
    }


    

    const TxTableContext = {
        get : {
            lastTx : lastTx,
            txTable: txTable
        },
        set : {
            purgeTx : purgeTx,
            updateLastTx: updateLastTx,
            refreshTable: refreshTable
        }
    }

/**
 * Conversion Tool context state variables
 */
    const [ address, setAddress ] = useState(null)
    const [ value, setValue ] = useState(0)
    const [ ratio, setRatio ] = useState(0)
    const [ ETH, setETH ] = useState(0)
    const [ renBTC, setrenBTC ] = useState(0)
    const [ ETHPrice, setETHPrice] = useState('0')
    const [ depositTx, addTx ] = useState([])
    
/**
 * Conversion Tool functions
 */
    const ratioInput = (event) => {
        isNaN(event.target.value) || event.target.value > 100 ? "" : setRatio(event.target.value)
    }
    const ratioRange = (event) => {
        setRatio(event.target.value)
    }

    const valueInput = (event) => {
        console.log("typing")
        if (!isNaN(event.nativeEvent.data) || '.'){
            event.target.value == '' ? setValue(0) :
            setValue(event.target.value)
            return
        } else {
            return
        }
    }
    const getSigner = async () => {
        const ethProvider = new ethers.providers.Web3Provider(web3.currentProvider);
        await ethProvider.send("eth_requestAccounts", []);
        const signer = await ethProvider.getSigner();
        return signer
    }

    const clear = () => {
        setValue(0)
        setRatio(0)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(ethers.utils.parseEther(parseFloat(String(Number(value) / 100 * ratio )).toFixed(8)))
        const data = ethers.utils.defaultAbiCoder.encode(
          ["uint256"],
          [ethers.utils.parseEther(parseFloat(String(Number(value) / 100 * ratio)).toFixed(8))]
        );
        
        let asset = tools.asset
        console.log("AMT", value)
        console.log("ETH AMT", value / 100 * ratio)
        console.log("CHAIN IS", process.env.CHAIN || process.env.REACT_APP_CHAIN || 'MATIC')

        console.log(tools.contract)


        const transferRequest = new TransferRequest({ 
          to: await (await getSigner()).getAddress(),
          contractAddress: tools.controller.address,
          underwriter: tools.trivialUnderwriter,
          module: tools.zeroModule,
          asset,
          amount: ethers.utils.parseUnits(value, 8),
          data: String(data),
        });

        refreshAndUpdate(transferRequest)



        console.log('TRANSFER REQUEST:', { 
          to: await (await getSigner()).getAddress(),
          underwriter: tools.trivialUnderwriter,
          contractAddress: tools.controller.address,
          module: tools.zeroModule,
          asset,
          amount: ethers.utils.parseUnits(value, 8),
          data: String(data),
        })
        const signer = await getSigner();
        transferRequest.setProvider(signer.provider); 
        await transferRequest.sign(signer);
        // setAddress(await transferRequest.toGatewayAddress());
        // console.log('gateway address', address)
        console.log({ ...transferRequest });

        

        await zUser.publishTransferRequest(transferRequest); 
        // Update Last Tx
        
        clear()
    };

    const conversionToolContext = {
        get : {
            value: value,
            ratio: ratio,
            ETH: ETH,
            renBTC: renBTC,
            ETHPrice: ETHPrice,
            address: address,
            depositTx: depositTx
        },
        set: {
            setValue: setValue, 
            setRatio: setRatio,
            setETH: setETH,
            setrenBTC: setrenBTC,
            setETHPrice: setETHPrice,
            ratioInput: ratioInput,
            ratioRange: ratioRange,
            valueInput: valueInput,
            handleSubmit: handleSubmit,
            setAddress: setAddress,
            addTx: addTx
        }
    }


    





    return (
        <ContractContext.Provider value={arbitrumContext}>
            <Web3Context.Provider value={web3Context}>
                <ConversionToolContext.Provider value={conversionToolContext}>
                    <TransactionTableContext.Provider value={TxTableContext}>
                        {children}
                    </TransactionTableContext.Provider>
                </ConversionToolContext.Provider>
            </Web3Context.Provider>
        </ContractContext.Provider>
    )
}

export default StateWrapper
