import { BridgeTransferModule } from "../molecules/bridge.transfer";

import { BridgeBurnModule } from "../molecules/bridge.burn/bridge.burn";
import { BridgeLoadingWallet } from "../molecules/bridge.transfer/bridge.loading.wallet";
import { useBridgeInput } from "../../api/global/interfaces/interface.bridge.transfer";
import { useBridgePage } from "../../api/global/interfaces/interface.bridge";
import Disclaimer from "./Disclaimer";
import { Route, Routes, useNavigate, useResolvedPath } from "react-router-dom";

export const BridgeModule = ({ wallet, mode, toggleMode }) => {
  const { getTransferMode } = useBridgeInput();
  const { getBridgePageProps } = useBridgePage();
  const { tcSigned } = getBridgePageProps();
  const navigate = useNavigate();

  const resolved = useResolvedPath(window.location.pathname);

  return !tcSigned ? (
    <Disclaimer />
  ) : (
    <div className="h-full w-full flex flex-col container h-fit bg-white shadow-xl rounded-[8px] justify-center place-items-center gap-1 md:gap-3  first:gap-0 w-fit pb-4 dark:bg-badger-black-500 text-white min-w-[370px]">
      <div
        className={`h-full w-full overflow-hidden rounded-t-[8px] grid grid-cols-2 grid-flow-rows mb-8 bg-gray-200 dark:bg-badger-gray-400 align-center font-light tracking-wider text-sm text-center`}
        style={{ maxHeight: "42px" }}
      >
        <div
          className={`py-[10px] rounded-tl-[8px] cursor-pointer ${
            resolved.pathname.includes("/transfer")
              ? "transition ease-in-out duration-150 text-black border-b-2 border-badger-yellow-neon-400 dark:text-badger-yellow-neon-400 font-bold"
              : "transition ease-in-out duration-150 text-black hover:bg-badger-yellow-400/10 dark:text-white"
          }`}
          onClick={() => navigate("/transfer")}
        >
          Transfer
        </div>
        <div
          className={`py-[10px] rounded-tr-[8px] cursor-pointer ${
            resolved.pathname.includes("/release")
              ? "transition ease-in-out duration-150 text-black border-b-2 border-badger-yellow-neon-400 dark:text-badger-yellow-neon-400 font-bold"
              : "transition ease-in-out duration-150 text-black hover:bg-badger-yellow-400/10 dark:text-white"
          }`}
          onClick={() => navigate("/release")}
        >
          Release
        </div>
      </div>

      {wallet ? (
        <BridgeLoadingWallet />
      ) : (
        <Routes>
          <Route
            path="/transfer"
            element={<BridgeTransferModule {...getTransferMode()} />}
          />
          <Route path="/release" element={<BridgeBurnModule />} />
        </Routes>
      )}
    </div>
  );
};
