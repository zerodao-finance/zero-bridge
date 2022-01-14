import {useState, createContext, useContext, useEffect, useReducer} from "react"
import _ from 'lodash'
import tools from '../../utils/_utils'
import {ethers} from 'ethers'
import {_events} from "../instance"



function useETH(props){
    const [ETH, setETH] = useState('0')
    useEffect(async () => {
        const listener = async () => {
          try {
            setETH(
              (
                await tools.contract.get_dy(1, 2, ethers.utils.parseUnits("1", 8))
              ).toString()
            );
          } catch (e) {
            console.error(e, "Error setting ETH price");
          }
        };
        var invoke = _.throttle(listener, 2000)
        tools.contract.provider.on("block", invoke);
        return () => {
          tools.contract.provder.removeListener("block", invoke)
          invoke.cancel()
        }
      }, []);
    return ETH
}


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
        _events.dispatch.on("new_transaction_confirmed", () => { dispatch({type: "reset"})})

        return () => {
            _events.dispatch.off("new_transaction_confirmed", () => { dispatch({type: "reset"})})
        }
    })


    return <Provider value={{state, dispatch}}>{children}</Provider>
}