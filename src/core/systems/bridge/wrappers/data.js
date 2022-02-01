import { useEffect, useReducer } from 'react'
import { dataReducer, data_state } from '../reducers'
import { _events } from '../../event'
import { Provider } from '../context/data'
import { useETH } from '../../chainData'
import { ethers } from 'ethers'
export function DataProvider({children}) {
    const ETH = useETH()
    const [ state, dispatch ] = useReducer(dataReducer, data_state)
    
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