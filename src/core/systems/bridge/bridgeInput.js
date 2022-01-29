import {createContext, useContext, useEffect, useReducer} from "react"
import _ from 'lodash'
import {ethers} from 'ethers'
import {_events} from "../event"
import { useETH } from  '../chainData'






let BridgeContext
let { Provider } = (BridgeContext = createContext())

export const useBridgeContext = () => useContext(BridgeContext)

const initialState = {
    value: 0,
    ratio: 0,
    ETH: 0, 
    renBTC: 0
}

function reducer(state, action) {
    switch (action.type) {
        case 'changeValue':
            if (!isNaN(action.event.nativeEvent.data) || '.'){
                return (action.event.target.value == '' ?  {value: 0, ratio: state.ratio, ETH: state.ETH, renBTC: state.renBTC} : {value: action.event.target.value, ratio: state.ratio, ETH: state.ETH, renBTC: state.renBTC})
            }
            break
        case 'changeRatio':
            console.log(state.ratio)
            return {value: state.value, ratio: action.event.target.value, ETH: state.ETH, renBTC: state.renBTC}
            break
        case 'changeETH':
            return {value: state.value, ratio: state.ratio, ETH: action.value, renBTC: state.renBTC}
            break
        case 'changeRenBTC':
            return {value: state.value, ratio: state.ratio, ETH: state.ETH, renBTC: action.value}
        case 'reset':
            return initialState
        default:
		    return state;
    }
}
export function BridgeProvider({children}) {
    const ETH = useETH()
    const [ state, dispatch ] = useReducer(reducer, initialState)
    
    const ln = (v) => (console.log(ethers.utils.formatEther(v)), v);
    
    const updateAmounts = async () => {
        dispatch({type: "changeRenBTC", value: 
        ethers.utils.formatUnits(
            ln(
            ethers.utils
                .parseEther("1")
                .sub(
                ethers.BigNumber.from(String(state.ratio)).mul(
                    ethers.utils.parseEther("0.01")
                )
                )
            )
            .mul(ethers.utils.parseUnits(String(state.value), 8))
            .div(ethers.utils.parseEther("1")),
            8
        )});
        dispatch({type: "changeETH", value: 
        ethers.utils.formatEther(
            ethers.BigNumber.from(String(state.ratio))
            .mul(ethers.utils.parseEther("0.01"))
            .mul(
                ethers.utils
                .parseUnits(String(state.value), 8)
                .mul(ETH)
            )
            .div(ethers.utils.parseEther("1", 18))
            .div(ethers.utils.parseUnits("1", 8))
        )});
    };

    useEffect(updateAmounts, [state.amount, state.ratio, ETH])
    useEffect(() => {
        const listener = () => dispatch({ type: 'reset ' });
        _events.dispatch.on("new_transaction_confirmed", listener);

        return () => {
            _events.dispatch.off("new_transaction_confirmed", listener);
        };
    })


    return <Provider value={{state, dispatch}}>{children}</Provider>
}
