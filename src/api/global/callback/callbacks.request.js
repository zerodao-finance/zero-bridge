import hash from "object-hash"
export const storeObjectLocally = (dispatch, transaction) => {
    const key = hash(transaction)
    const data = transaction
    dispatch({ type: "ADD_DATA", module: "requests", effect: "transfer", payload: {key: key, data: data}})
    return key
}

export const updateObjectLocally = (dispatch, key, status) => {
    
}