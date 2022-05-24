import { storeContext } from "../global";
import { useContext, useEffect } from "react";

export const useBridgePage = () => {
  const { state, dispatch } = useContext(storeContext);
  const { mode } = state.bridge;
  const { tcSigned } = state.termsAndConditions;

  // Initialize the bridge page
  useEffect(async () => {
    const isSigned = localStorage.getItem("TC_agreement_signed");
    if (isSigned == "true") {
      dispatch({ type: "UPDATE_TC", data: { tcSigned: true } });
    }
  }, []);

  const toggleMode = (newMode) => {
    dispatch({
      type: "UPDATE",
      module: "bridge",
      effect: "mode",
      data: { mode: newMode },
    });
  };

  const setChain = (newChain) => {
    dispatch({
      type: "UPDATE",
      module: "bridge",
      effect: "mode",
      data: { chain: newChain },
    });
  };

  const getBridgePageProps = ({ ...otherProps } = {}) => ({
    mode: mode.mode,
    toggleMode: toggleMode,
    tcSigned: tcSigned,
  });

  const getBridgeChainProps = ({ ...otherProps } = {}) => ({
    chain: mode.chain,
    setChain,
  });

  return {
    getBridgePageProps,
    getBridgeChainProps,
  };
};
