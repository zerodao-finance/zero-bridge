import { storeContext } from './global'
import { useContext, useEffect } from 'react'


export const useData = () => {
    const {state, dispatch} = useContext(storeContext)
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

    return [state.data, isLoading, dispatch]
}


export const updateData = (event, data, dispatch) => {
    var target = event.target.id

    switch (target) {
        case 'amount':
            dispatch({ type: 'MODIFY_DATA', payload: { ...data, amount: String(Number(data.amount) + 1)}})
            return
        case 'ratio':
            dispatch({ type: 'MODIFY_DATA', payload: { ...data, ratio: data.ratio + 1}})
            return
    }

    return

}


