import { StateProvider, storeContext } from '../core/global'
import { useContext, useEffect } from 'react'
import { useBridgeInput, useBridgeDisplay, useWalletConnection } from '../core/input_interfaces'
import { FaEthereum, FaBtc } from 'react-icons/fa'
import _ from 'lodash'

export const FE = ({children}) => {
    return (
        <StateProvider>
            <ChildTest />
        </StateProvider>
    )
}

export const LocalStorageTest = ({}) => {
    useEffect(async () => {
        


    }, [])
    return (
        <></>
    )
}

export const ChildTest = ({}) => {
    // const [data, isLoading, dispatch] = useData()
    // const { bridgeState, bridgeDispatch } = useContext( storeContext )
    // const { state, dispatch } = useContext( storeContext )
    // const { isLoading, error } = state
    const { ratio, amount, updateRatio, updateAmount } = useBridgeInput()
    const { ETH, renBTC } = useBridgeDisplay()
    const {connectWallet, wallet, address, network} = useWalletConnection()
    return (

        <>
        {
            // <button onClick={() => dispatch({ type: 'UPDATE_INPUT', payload: { type: "RATIO", data: state.input.ratio + 1}})}>Create Transaction</button>
            // // <button onClick={(event) => updateData(event, data, dispatch)} id="amount">click me</button>
            <div className="flex flex-col gap-2 self-center text-black dark:text-white">
                <div className="flex flex-row w-full justify-between items-center px-5 gap-2">
                    <span className="flex items-center"><FaEthereum className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max text-xs"/><p className="text-xs">{`${ratio}%`}</p></span>
                    <input type="range" className="z-40 overflow-hidden form-range appearance-none h-1 focus:outline-none focus:ring-0 focus:shadow-none rounded-full bg-slate-400 w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={ratio} onChange={updateRatio}/>
                    <span className="flex items-center font-bold"><p className="text-xs">{`${100-ratio}%`}</p><FaBtc className="fill-gray-900 dark:fill-gray-300 h-[1.3rem] w-max"/></span> 
                </div>
                <div className="w-fit p-2">
                    <input id="transfer-amount" className="dark:bg-gray-600 dark:text-white form-input text-center border-0 focus:ring-0 text-md font-medium text-gray-600 bg-transparent caret-green-500 z-40 w-fit max-w-[5rem] rounded-xl bg-gray-100" type="number" value={amount} onChange={updateAmount}/>
                </div>
                <div className='flex flex-row justify-evenly divide-x-[.008rem] divide-emerald-300'>
                    <div className="flex flex-col gap-2 w-[8rem]">
                        <p className="text-xl  text-emerald-300 truncate text-center">{ETH}</p>
                        <p className="text-sm text-center text-black dark:text-white">ETH</p>
                    </div>
                    <div className="flex flex-col gap-2 w-[8rem]">
                        <p className="text-xl text-emerald-300 text-center">{renBTC}</p>
                        <p className="text-sm text-center text-black dark:text-white">renBTC</p>
                    </div>
                </div>
                { network_config && network_config.name}
                <button onClick={connectWallet}>
                    { address ? 
                        address : "connect wallet"
                    }
                </button>

            </div>
        }   
        </>
    )
}