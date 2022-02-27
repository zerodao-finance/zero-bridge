import { StateProvider, storeContext } from '../core/global'
import { useContext, useEffect } from 'react'
import { useData, updateData } from '../core/input_interfaces'
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
    const [data, isLoading, dispatch] = useData()


    return (
        <>
        {data.amount}
        {
            !isLoading ?
            // <button onClick={() => dispatch({ type: 'MODIFY_DATA', payload: { ...data, amount: String(Number(data.amount) + 1)}})}>Create Transaction</button>
            <button onClick={(event) => updateData(event, data, dispatch)} id="amount">click me</button>
            :
            <div>
                Loading
            </div>
        }
        </>
    )
}