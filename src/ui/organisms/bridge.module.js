import { BridgeTransferModule } from "../molecules/bridge.transfer";
import { BridgeBurnModule } from "../molecules/bridge.burn/bridge.burn";
import { BridgeLoadingWallet } from "../molecules/bridge.transfer/bridge.loading.wallet";
import { useBridgeInput } from "../../api/global/interfaces/interface.bridge.transfer";
import { useBridgePage } from "../../api/global/interfaces/interface.bridge";
import Disclaimer from "./Disclaimer";
import { Route, Routes, Link } from "react-router-dom";

export const BridgeModule = ({ wallet, mode, toggleMode }) => {
  const { getTransferMode } = useBridgeInput();
  const { getBridgePageProps } = useBridgePage();
  const { tcSigned } = getBridgePageProps();

  return !tcSigned ? (
    <Disclaimer />
  ) : (
    <div className="h-full w-full pr-[2rem] pl-[2rem] pb-[2rem] flex flex-col container h-fit bg-white shadow-xl rounded-[8px] justify-center place-items-center gap-1 md:gap-3  first:gap-0 w-fit dark:bg-badger-black-500 text-badger-white-400 min-w-[370px]">
      <div
        className={`h-full w-[calc(100%+4rem)] overflow-hidden rounded-t-[8px] grid grid-cols-2 grid-flow-rows mb-8 bg-gray-200 dark:bg-badger-gray-400 align-center font-light tracking-wider text-sm text-center`}
        style={{ maxHeight: "42px" }}
      >
        <Link to="/transfer">
          <div
            className={`py-[10px] rounded-tl-[8px] cursor-pointer ${
              window.location.hash.includes("/transfer")
                ? "transition ease-in-out duration-150 text-black border-b-2 border-badger-yellow-400 dark:text-badger-yellow-400 font-bold"
                : "transition ease-in-out duration-150 text-black border-b-2 border-transparent hover:bg-badger-yellow-400/10 dark:text-[#8a8a8a] font-bold"
            }`}
          >
            TRANSFER
          </div>
        </Link>
        <Link to="/release">
          <div
            className={`py-[10px] rounded-tr-[8px] cursor-pointer ${
              window.location.hash.includes("/release")
                ? "transition ease-in-out duration-150 text-black border-b-2 border-badger-yellow-400 dark:text-badger-yellow-400 font-bold"
                : "transition ease-in-out duration-150 text-black border-b-2 border-transparent hover:bg-badger-yellow-400/10 dark:text-[#8a8a8a] font-bold"
            }`}
          >
            RELEASE
          </div>
        </Link>
      </div>

      {wallet ? (
        <BridgeLoadingWallet />
      ) : (
        <Routes>
          <Route
            path="/transfer/*"
            element={<BridgeTransferModule {...getTransferMode()} />}
          />
          <Route path="/release/*" element={<BridgeBurnModule />} />
        </Routes>
      )}
    </div>
  );
};
