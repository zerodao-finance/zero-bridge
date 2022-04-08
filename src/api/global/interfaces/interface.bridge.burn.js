import { storeContext } from '../global'
import { useContext, useEffect, useState, useMemo } from 'react'
import { useInputSubmit } from '../hooks/useInputSubmit'
import { useBridgeDisplay } from './interface.bridge'
import { ethers } from 'ethers'
import _ from 'lodash'

export const useBridgeBurnInput = () => {
    const { state, dispatch } = useContext( storeContext )
    const { eth_usd, btc_eth, btc_usd } = state.priceFeeds.data
    const { sendBurnRequest } = useInputSubmit('burn')
    const { input } = state.burn
    var { amount, destination, token } = input

    const updateAmount = (e) => {
        dispatch({ type: "UPDATE", module: "burn", effect: "input", data: { token, amount: e.target.value, destination }})
    }    
    const updateDestination = (e) => {
        dispatch({ type: "UPDATE", module: "burn", effect: "input", data: { token, destination: e.target.value, amount }})
    };
    const setToken = (e) => {
        dispatch({ type: "UPDATE", module: "burn", effect: "input", data: { destination, amount, token: e }})
    };

    const getBridgeBurnInputProps = ({...otherProps} = {}) => ({
        amount: amount,
        destination: destination,
        setToken,
        token,
        tokenPrice: eth_usd,
        effect: updateAmount,
        updateAmount,
	    updateDestination
    })

    const getBurnSenderProps = ({...otherProps} = {}) => ({
        action: sendBurnRequest
    })

    return {
        getBridgeBurnInputProps,
        getBurnSenderProps
    }
}
