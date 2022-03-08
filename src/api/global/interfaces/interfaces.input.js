import { storeContext } from '../global'
import { useContext, useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'

export const useBridgeInput = () => {
    const { state, dispatch } = useContext( storeContext )

    const updateRatio = (e) => {
        dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: {effect: "ratio", data: e.target.value}})
    }

    const updateAmount = (e) => {
        dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: { effect: "amount", data: e.target.value}})
    }

    const updateModule = (e) => {
        dispatch({type: 'SUCCEED_REQUEST', effect: 'input', payload: { effect: 'isFast', data: !!e.target.checked}})
    }

    var { ratio, amount, isFast } = state.input
    
    return {
        ratio,
        amount,
        isFast,
        updateRatio,
        updateAmount,
        updateModule
    }    
}