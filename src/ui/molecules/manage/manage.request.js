import { useTransactionContext } from "../../../api/transaction"
import { ManageTransactionCard } from "../../atoms/cards/card.manage.tx"
import { ManageTransactionLayout } from "../../layouts/layout.manage"
import _ from 'lodash'
export const ManageTransaction = ({}) => {
    const { pending, completed } = useTransactionContext()
    
    return (
        <ManageTransactionLayout title="Manage Transactions">
            {
                pending.transfer.map(d => {
                    return (
                        <ManageTransactionCard data={d}/>
                    )
                })
            }
            {
                <div className="dark:text-gray-300">
                    {_.isEmpty(pending.transfer) ? "No Pending Transactions" : ''}
                </div>
            }
        </ManageTransactionLayout>
    )
}