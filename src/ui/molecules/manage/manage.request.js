import { useTransactionContext } from "../../../api/transaction";
import { CardTypeSwitch } from "../../atoms/cards/card.manage.tx";
import { ManageTransactionLayout } from "../../layouts/layout.manage";
import _ from "lodash";
export const ManageTransaction = () => {
  const { pending } = useTransactionContext();

  return (
    <ManageTransactionLayout title="Pending Transactions">
      {_.isEmpty(pending.transfer) && _.isEmpty(pending.burn) ? (
        <div className="text-gray-300 flex justify-center w-full">
          <span>No Pending Transactions</span>
        </div>
      ) : (
        CardGrid(pending)
      )}
    </ManageTransactionLayout>
  );
};

function CardGrid(pending) {
  return (
    <>
      {_.concat(pending.burn, pending.transfer).map((d, index) => {
        return <CardTypeSwitch data={d} key={index} type="pending" />;
      })}
    </>
  );
}
