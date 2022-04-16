import { useTransactionContext } from "../../../api/transaction"
import { ManageTransactionCard } from "../../atoms/cards/card.manage.tx"
import { ManageTransactionLayout } from "../../layouts/layout.manage"
import _ from 'lodash'
export const TransactionHistory = ({}) => {
    const { pending, completed } = useTransactionContext()
    
    return (
        <ManageTransactionLayout title="Transaction History">
            {
                completed.transfer.map((d, index) => {
                    return (
                        <ManageTransactionCard data={d} key={index} type="pending"/>
                    )
                })
            }
            {
                <div className="dark:text-gray-300">
                    {_.isEmpty(completed.transfer) ? "No Transactions" : ''}
                </div>
            }
        </ManageTransactionLayout>
    )
}