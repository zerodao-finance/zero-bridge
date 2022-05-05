import * as React from "react";
import { PersistanceStore } from "../storage/storage";
import _ from "lodash";
import async from "async";
import {
  UnderwriterTransferRequest,
  UnderwriterBurnRequest,
} from "zero-protocol/dist/lib/zero";

export function usePersistanceRefresh(dispatch) {
  let [initialState, setInitialState] = React.useState();
  let queue = async.queue(function (task, callback) {
    callback(null, task);
  });

  React.useEffect(async () => {
    let fetchedData = await PersistanceStore.get_all_data();
    let transformedData = _.chain(fetchedData)
      .groupBy((i) => i.status)
      .transform((result, value, key) => {
        let t = _.transform(
          value,
          (result, i) => {
            result.push(JSON.parse(i.data));
          },
          []
        );
        let tx = _.groupBy(t, (i) => i.type);
        result[key] = tx;
      }, {})
      .value();

    if (!_.isEmpty(transformedData)) {
      // console.log(transformedData)
      console.log(transformedData);
      let dataSettled = {
        pending: {
          burn: [],
          transfer: [],
        },
        completed: {
          burn: [],
          transfer: [],
        },
      };

      let merged = _.merge(dataSettled, transformedData);
      console.log(merged);
      if (!_.isEmpty(merged.pending.transfer)) {
        getPendingRequestStatus(merged.pending.transfer, queue, dispatch);
      }
      dispatch({ type: "INIT", payload: merged });
    }
  }, []);
}

export async function getPendingRequestStatus(array, queue, dispatch) {
  for (const i of array) {
    queue.push(i, callback);
  }

  async function callback(error, task) {
    console.log(task);
    const req = new UnderwriterTransferRequest({
      ...task._data,
    });

    const mint = await req.submitToRenVM();

    if (process.env.REACT_APP_TEST) {
      mint.on("deposit", async (deposit) => {
        const confirmed = await deposit.confirmed();
        confirmed.on("status");
      });
    } else {
      // console.log(mint.processDeposit())
      mint.on("deposit", async (deposit) => {
        console.log(
          "transaction id:",
          task.id,
          "confirmations:",
          deposit.depositDetails.transaction.confirmations
        );
        if (deposit.depositDetails.transaction.confirmations === 6) {
          dispatch({
            type: "COMPLETE",
            payload: {
              type: task.type,
              id: task.id,
              data: task._data,
            },
          });
          PersistanceStore.add_data(task.id, task, "completed");
        }
        await deposit.confirmed().on("confirmation", (confs, target) => {
          if (confs >= target) {
            //handle setting as confirmed
            dispatch({
              type: "COMPLETE",
              payload: {
                type: task.type,
                id: task.id,
                data: task._data,
              },
            });
          }
        });
        await deposit
          .signed()
          .on("status", (status) => console.log("status", status));
      });
    }
  }
}
