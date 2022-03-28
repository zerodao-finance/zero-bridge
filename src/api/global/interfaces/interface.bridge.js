import { storeContext } from '../global'
import { useContext, useEffect, useState, useMemo } from 'react'
import _ from 'lodash'


export const useBridgePage = () => {
    const { state, dispatch } = useContext(storeContext)
    const { mode } = state.bridge

    const toggleMode = (newMode) => {
        dispatch({ type: "UPDATE", module: "bridge", effect: "mode", data: {mode: newMode}})
    }

    const getBridgePageProps = ({...otherProps} = {}) => ({
        mode: mode.mode,
        toggleMode: toggleMode
    })

    return {
        getBridgePageProps
    }
}

