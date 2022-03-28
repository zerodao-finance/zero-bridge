import { storeContext } from '../global'
import { useInputResults } from '../hooks/useInputResults'
import { useContext, useEffect, useState, useMemo } from 'react'
import _ from 'lodash'
import { useInputHooks } from '../hooks/useInputFunctions'
import { useInputSubmit } from '../hooks/useInputSubmit'

// Bridge Input Hook
export const useBridgeInput = () => {
    const { state, dispatch } = useContext( storeContext )
    const { btc_usd } = state.priceFeeds.data
    const { ETH, renBTC } = state.transfer.display
    var { ratio, amount, isFast } = state.transfer.input
    const { sendTransferRequest, isLoading } = useInputSubmit("transfer")
    const { updateRatio, updateAmount, updateModule } = useInputHooks("transfer")
    useInputResults(state.transfer.input, "transfer")

    
    const getTransferInputProps = ({...otherProps} = {}) => ({
        amount: amount,
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

    return {
        isLoading,
        getTransferSenderProps,
        getTransferInputProps,
        getTransferRatioProps,
        getTransferResultsProps,
        getTransferModuleToggleProps
    }    
}
