import { StateProvider, storeContext } from '../core/global'
import { useContext, useEffect } from 'react'
import _ from 'lodash'

export const FE = ({children}) => {
    return (
        <StateProvider>
            <ChildTest />
        </StateProvider>
    )
}

export const LocalStorageTest = ({}) => {
    useEffect(async () => {
        


    }, [])
    return (
        <></>
    )
}

export const ChildTest = ({}) => {
    const { state, dispatch } = useContext(storeContext)
    const { isLoading } = state
    useEffect(() => {
        const call = () => {
            try {
                dispatch({ type: 'SUCCEED_REQUEST', payload: { type: 'transaction', data: { stuff: 'new_data' } }})
            } catch (err){
                dispatch({ type: 'FAIL_REQUEST', payload: err.message })
            }
        }
        
        if ( isLoading ) {
            call()
            console.log(state)
        }

    }, [isLoading])


    return (
        <>
        {
            !isLoading ?
            <button onClick={() => dispatch({ type: 'START_REQUEST' })}>Load Data</button>
            :
            <div>
                Loading
            </div>
        }
        </>
    )
}