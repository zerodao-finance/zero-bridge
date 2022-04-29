import { storeContext } from "../global";
import { useContext } from "react";
export const useInputHooks = (module) => {
  const { state, dispatch } = useContext(storeContext);
  const updateRatio = (e) => {
    dispatch({
      type: "UPDATE",
      module: module,
      effect: "input",
      data: { ratio: e.target.value },
    });
  };

  const updateAmount = (e) => {
    dispatch({
      type: "UPDATE",
      module: module,
      effect: "input",
      data: { amount: e.target.value },
    });
  };

  const updateModule = (e) => {
    dispatch({
      type: "UPDATE",
      module: module,
      effect: "input",
      data: { isFast: !!e.target.checked },
    });
  };

  return {
    updateRatio,
    updateAmount,
    updateModule,
  };
};
