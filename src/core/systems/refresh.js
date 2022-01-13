import _ from "lodash"
/**
 * functions for refreshing transaction tables
 * 
 * getTransferRequests -> get transferRequests sorted by pending & successful
 */

/**
 * @returns array[0] -> pending || array[1] --> success
 */
export const getTransferRequests = () => {
   const returnArr = []
   const entries = Object.entries(window.localStorage).filter(([k, v]) => k.startsWith('request:'))
   for (const [key, value] of entries){
       returnArr.push({key: key, data: JSON.parse(value)})
   }
   return _.partition(returnArr, {'status': 'pending'})
}


export const createTransferRequest = (_object) => {
    return new TransferRequest(_.omit(_object.data, ['date', 'status', 'gatewayAddress', 'dry']))
}

export const updateTransferRequest = (key, status) => {
	console.log(key);
    const item = Object.entries(window.localStorage).find(([k, v]) => k.startsWith('request:' + String(key)))
    console.log(item)
    const parsed = JSON.parse(item[1])
    parsed.status = status
    const stringified = JSON.stringify(parsed)
    window.localStorage.setItem(String(key), stringified)
}

