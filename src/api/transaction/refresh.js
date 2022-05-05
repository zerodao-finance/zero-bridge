import * as React from "react";
import { PersistanceStore } from "../storage/storage";
import _ from "lodash";

export function usePersistanceRefresh(dispatch) {
  let [initialState, setInitialState] = React.useState();

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

    dispatch({ type: "INIT", payload: transformedData });
    setInitialState(transformedData);
  }, []);
}
