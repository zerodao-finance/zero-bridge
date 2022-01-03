import { useState, useEffect } from 'react'
import Contract from 'web3-eth-contract'; 
import wallet_model from '../WalletModal';
import {ContractContext, Web3Context, ConversionToolContext, TransactionTableContext, TransactionObserverContext} from '../context/Context'
import tools from './_utils'
import { ethers } from 'ethers'
import { Monitor, CardObserver, TableObserver, ConvertObserver } from "../utils/TransactionMonitor"






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


    const [ txTable, updateTxTable ] = useState(tools.storage.getAllTransferRequests())



    

    const TxTableContext = {
        get : {
            txTable: txTable
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

    const signTxn = async (event) => {
        event.preventDefault();
        console.log(ethers.utils.parseEther(parseFloat(String(Number(value) / 100 * ratio )).toFixed(8)))

        Monitor._createTxn(await (await getSigner()).getAddress(), value, ratio)
        if (process.env.REACT_APP_TEST) {
            Monitor._mockSignTxn(await getSigner())
            // Monitor._mockTransfer()
        } else {
            // Monitor._signTransferRequest(await getSigner())
        }
        
        clear()
    };

    const submitTransfer = async (event) => {
        event.preventDefault()
        if (process.env.REACT_APP_TEST) {
            Monitor._mockTransfer()
        }
    }

    const conversionToolContext = {
        get : {
            value: value,
            ratio: ratio,
            ETH: ETH,
            renBTC: renBTC,
            ETHPrice: ETHPrice,
            address: address,
            depositTx: depositTx,
            address: address
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
            signTxn: signTxn,
            submitTxn: submitTransfer,
            setAddress: setAddress,
            addTx: addTx
        }
    }


    // const tableRefresh = () => {
    //     /**
    //      * Refresh Transaction Table State 
    //      */
    //     updateTxTable(tools.storage.getAllTransferRequests())
    // }

    // const dispatch = (conf) => {
    //     /**
    //      * Append Table To Table Card State
    //      */
    //     addTx([<TransactionCard depositTx={conf}></TransactionCard>])
    // }

    // const resolve = () => {
    //     addTx([])
    // }

    // Observer.refresh = tableRefresh
    // Observer.dispatch = dispatch
    // Observer.resolve = resolve

    CardObserver.append = (item) => {
        console.log(`\nObserver: client adding transaction card to the dom`)
        addTx([item])
        ConvertObserver._prevScreen()
    }
    
    CardObserver.clear = (item) => {
        console.log(`\nObserver: client clearing transaction card from the dom`)
        addTx([])
    }

    
    useEffect(() => {
        Monitor.attach(TableObserver)
        Monitor.attach(CardObserver)
        Monitor.attach(ConvertObserver)
        
        return function cleanup(){
            Monitor.detach(TableObserver)
            Monitor.detach(CardObserver)
            Monitor.detach(ConvertObserver)
        }
    }, [])




    return (
        <TransactionObserverContext.Provider value={Monitor}>
            <ContractContext.Provider value={arbitrumContext}>
                <Web3Context.Provider value={web3Context}>
                    <ConversionToolContext.Provider value={conversionToolContext}>
                        <TransactionTableContext.Provider value={TxTableContext}>
                            {children}
                        </TransactionTableContext.Provider>
                    </ConversionToolContext.Provider>
                </Web3Context.Provider>
            </ContractContext.Provider>
        </TransactionObserverContext.Provider>
    )
}

export default StateWrapper
