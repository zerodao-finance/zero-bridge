import { storeContext } from '../global'
import { useInputResults } from '../hooks/useInputResults'
import { useContext, useEffect, useState, useMemo } from 'react'
import _ from 'lodash'
import { useInputHooks } from '../hooks/useInputFunctions'
import { useInputSubmit } from '../hooks/useInputSubmit'
import { GlobalStateHelper } from '../../utils/global.utilities'

// Bridge Input Hook
export const useBridgeInput = () => {
    const { state, dispatch } = useContext( storeContext )
    const StateHelper = new GlobalStateHelper(state, dispatch)
    const { btc_usd } = state.priceFeeds.data
    const { ETH, renBTC } = state.transfer.display
    const { ratio, amount, isFast } = state.transfer.input
    const { mode } = state.transfer.mode
    const { token } = state.transfer.token
    const { sendTransferRequest } = useInputSubmit("transfer")
    const { updateRatio, updateAmount, updateModule } = useInputHooks("transfer")
    useInputResults(state.transfer.input, "transfer")

    
    const getTransferInputProps = ({...otherProps} = {}) => ({
        amount: amount,
        token: token,
        setToken: setToken,
        effect: updateAmount,
        tokenPrice: btc_usd
    })
    
    const getTransferRatioProps = ({ ...otherProps } = {}) => ({
        ratio: ratio,
        effect: updateRatio
    })

    const getTransferResultsProps = ({ ...otherProps } = {}) => ({
        ETH: ETH,
        renBTC: renBTC
    })

    const getTransferModuleToggleProps = ({...otherProps} = {}) => ({
        isFast: isFast,
        action: updateModule
    })

    const getTransferSenderProps = ({ ...otherProps } = {}) => ({
        action: sendTransferRequest
    })

    const getTransferMode = ({ ...otherProps } = {}) => ({
        mode: mode
    })
    
    const setToken = (e) => {
        dispatch({ type: "UPDATE", module: "transfer", effect: "input", data: { token: e }})
    };

    const getGatewayData = ({...otherProps} = {}) => ({...(StateHelper.getModuleGatewayProps('transfer'))})

    return {
        getTransferSenderProps,
        getTransferInputProps,
        getTransferRatioProps,
        getTransferResultsProps,
        getTransferModuleToggleProps,
        getGatewayData,
        getTransferMode
    }    
}
