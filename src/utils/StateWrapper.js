import { useState, useEffect } from 'react'
import Contract from 'web3-eth-contract'; 
import wallet_model from '../WalletModal';
import {ContractContext, Web3Context, ConversionToolContext, TransactionTableContext, TransactionObserverContext, UIContext} from '../context/Context'
import tools from './_utils'
import { ethers } from 'ethers'
import { _BridgeMonitor, _BridgeObserver, _ErrorObserver, _TransactionCardObserver } from '../core/instance'





const StateWrapper = ({children}) => {

    var mode = localStorage.getItem("screenMode") === "dark" ? true: false
    const [ screenMode, toggle ] = useState(mode)
    
    const toggleScreenMode = () => {
        var dark = document.documentElement.classList.toggle("dark")
        localStorage.setItem("screenMode", dark ? "dark" : "light")
        toggle(dark ? true : false)
    }

    const _uiContext = {
        get : screenMode,
        set : toggleScreenMode
    }


   

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
        //  const curveContract = new Contract(tools.curveABI, tools.curveArbitrum)
        //  setContract(curveContract);
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
        try {
            const ethProvider = new ethers.providers.Web3Provider(web3.currentProvider);
            await ethProvider.send("eth_requestAccounts", []);
            const signer = await ethProvider.getSigner();
            return signer
        } catch ( error ) {
            return new Error("Cannot get Provider, |Connect Wallet")
        }
    }

    const retrieveSigner = _.once(getSigner)

    const clear = () => {
        setValue(0)
        setRatio(0)
    }

    const signTxn = async (event) => {
        event.preventDefault();
        console.log(ethers.utils.parseEther(parseFloat(String(Number(value) / 100 * ratio )).toFixed(8)))
        await _BridgeMonitor._create(await retrieveSigner(), value, ratio)
        // Monitor._createTxn(await (await getSigner()).getAddress(), value, ratio)
        if (process.env.REACT_APP_TEST) {
            _BridgeMonitor.mockSign(await retrieveSigner())
            // Monitor._mockSignTxn(await getSigner())
        } else {
            await _BridgeMonitor.sign(await retrieveSigner())
            await _BridgeMonitor.dry(await retrieveSigner())
            await _BridgeMonitor.gatewayAddress()
            // Monitor._signTxn(await getSigner())
        }
        
        clear()
    };

    const submitTransfer = async (event) => {
        event.preventDefault()
        if (process.env.REACT_APP_TEST) {
            _BridgeMonitor._mockTransfer()
        } else {
            // Monitor._transfer()
            _BridgeMonitor.transfer()
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

    
    _TransactionCardObserver.clear = (item) => {
        console.log(`\nObserver: client clearing transaction card from the dom`)
        addTx([])
    }
    
    _TransactionCardObserver.append = async (item) => {
        console.log(`\nObserver: client adding transaction card to the dom`)
        addTx([item])
        // setTimeout(() => {
        //     ConvertObserver._prevScreen()
        // }, 4500)
    }
    
    
    
    
    
    useEffect(() => {
        _BridgeMonitor.attach(_BridgeObserver)
        _BridgeMonitor.attach(_ErrorObserver)
        _BridgeMonitor.attach(_TransactionCardObserver)
        
        return function cleanup(){
            _BridgeMonitor.detach(_BridgeObserver)
            _BridgeMonitor.detach(_ErrorObserver)
            _BridgeMonitor.detach(_TransactionCardObserver)
        }
    }, [])




    return (
        // <TransactionObserverContext.Provider value={Monitor}>
        // </TransactionObserverContext.Provider>
            <ContractContext.Provider value={arbitrumContext}>
                <Web3Context.Provider value={web3Context}>
                    <ConversionToolContext.Provider value={conversionToolContext}>
                        <TransactionTableContext.Provider value={TxTableContext}>
                            <UIContext.Provider value={_uiContext}>
                            {children}
                            </UIContext.Provider>
                        </TransactionTableContext.Provider>
                    </ConversionToolContext.Provider>
                </Web3Context.Provider>
            </ContractContext.Provider>
    )
}

export default StateWrapper
