import { useTransactionContext } from "../../../api/transaction";
import { ManageTransactionCard } from "../../atoms/cards/card.manage.tx";
import { ManageTransactionLayout } from "../../layouts/layout.manage";
import _ from "lodash";
export const ManageTransaction = ({}) => {
  const { pending, completed } = useTransactionContext();
  console.log(pending);
  return (
    <ManageTransactionLayout title="Manage Transactions">
      {pending.transfer.map((d, index) => {
        return <ManageTransactionCard data={d} key={index} />;
      })}
      {
        <div className="dark:text-gray-300">
          {_.isEmpty(pending.transfer) ? "No Pending Transactions" : ""}
        </div>
      }
    </ManageTransactionLayout>
  );
};
