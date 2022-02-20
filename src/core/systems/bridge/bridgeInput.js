import {createContext, useContext, useEffect, useReducer} from "react"
import _ from 'lodash'
import {ethers} from 'ethers'
import { eventManager }  from "../event"
import { useETH } from  '../chainData'






let BridgeContext
let { Provider } = (BridgeContext = createContext())

export const useBridgeContext = () => useContext(BridgeContext)

const initialState = {
    value: 0,
    ratio: 0,
    quick: false,
    ETH: 0, 
    renBTC: 0
}

function reducer(state, action) {
    switch (action.type) {
        case 'changeValue':
            if (!isNaN(action.event.nativeEvent.data) || '.'){
                return Object.assign({ ...state }, { value: action.event.target.value == '' ? 0 : action.event.target.value });
            } 
            break
	case 'changeQuick':
            return Object.assign({ ...state }, { quick: !state.quick });
        case 'changeRatio':
            console.log(state.ratio)
            return Object.assign({ ...state }, { ratio: action.event.target.value });
            break
        case 'changeETH':
            return Object.assign({ ...state }, { ETH: action.value });
        case 'changeRenBTC':
            return Object.assign({ ...state }, { renBTC: action.value });
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
        eventManager.dispatch.on("new_transaction_confirmed", listener);

        return () => {
            eventManager.dispatch.off("new_transaction_confirmed", listener);
        };
    })


    return <Provider value={{state, dispatch}}>{children}</Provider>
}
