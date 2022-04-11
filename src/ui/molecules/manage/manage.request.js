import { useTransactionContext } from "../../../api/transaction"
export const ManageTransaction = ({}) => {
    const { pending, complete } = useTransactionContext()
    
    return (
        <>
            {
                pending.transfer.map(d => {
                    return (
                        <div className="m-5 border border-black w-fit px-10 text-xs" key={d.id} onClick={() => completeTransferRequest(d)}>
                            <p>
                                Pending
                            </p>
                            <p>
                                {d.id}
                            </p>
                            <br></br>
                            <p>
                                {d.type}
                            </p>
                        </div>
                    )
                })
            }
        </>
    )
}