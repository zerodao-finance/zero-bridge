import { useEffect, useState } from "react";
import { PersistanceStore } from "../storage/storage";
import _ from "lodash";

export function usePersistanceRefresh(dispatch) {
  let [initialState, setInitialState] = useState();

  useEffect(async () => {
    let fetchedData = await PersistanceStore.get_all_data();
    let transformedData = _.chain(fetchedData)
      .groupBy((i) => i.status)
      .transform((result, value, key) => {
        let t = _.transform(
          value,
          (result, key) => {
            result.push(JSON.parse(key.data));
          },
          []
        );
        let tx = _.groupBy(t, (i) => (i.type ? i.type : i.requestType));
        result[key == "pending" ? key : "completed"] = tx;
      }, {})
      .value();
    console.log(transformedData);
    dispatch({ type: "INIT", payload: transformedData });
    setInitialState(transformedData);
  }, []);
}
