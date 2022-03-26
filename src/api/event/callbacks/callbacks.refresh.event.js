import { UnderwriterTransferRequest } from 'zero-protocol/dist/lib/zero'
export async function handleRefreshEvent ( error, transfer ) {
    var transferRequestObject = JSON.parse(transfer)
    //TODO: create transferRequest Object from Transfer Request Object
    const transferRequest = new UnderwriterTransferRequest(...transferRequestObject)
    const mint = await transferRequest.submitToRenVM()
    return mint

}