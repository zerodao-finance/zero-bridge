import { storeContext } from "../global"
import { useContext } from 'react'
export const useBridgePage = () => {
    const { state, dispatch } = useContext(storeContext)
    const { transfer } = state
    const { page, request, isLoading } = transfer
    
    const back = () => {
        dispatch({ type: "SUCCEED_REQUEST", effect: "transfer", payload: { type: "page", data: "main"}})
    }

    return {
        page,
        back,
        request,
        isLoading
    }
}