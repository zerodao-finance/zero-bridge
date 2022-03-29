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

    const updateAmount = (e) => {
        dispatch({ type: "UPDATE", module: "burn", effect: "input", data: { amount: e.target.value}})
    }    

    const { amount } = input
    const getBridgeBurnInputProps = ({...otherProps} = {}) => ({
        amount: amount,
        tokenPrice: eth_usd,
        effect: updateAmount
    })

    const getBurnSenderProps = ({...otherProps} = {}) => ({
        action: sendBurnRequest
    })

    return {
        getBridgeBurnInputProps,
        getBurnSenderProps
    }
}
