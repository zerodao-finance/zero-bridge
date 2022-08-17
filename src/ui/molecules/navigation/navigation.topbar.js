import { PrimaryRoundedButton } from "../../atoms";
import { NetworkIndicator } from "../../atoms/indicators/indicator.network";
import {
  useWalletConnection,
  getLedgerProvider,
} from "../../../api/global/interfaces/interfaces.wallet";
import { useZero } from "../../../api/global/interfaces/interfaces.zero";
import { useBridgePage } from "../../../api/global/interfaces/interface.bridge";
import { useState, useEffect } from "react";
import NavigationChainDropdown from "../navigation/navigation.chain.dropdown";

export const NavigationTopBar = () => {
  const [object, setObject] = useState(null);
  const { connect, disconnect, wallet } = useWalletConnection();
  const { keeper } = useZero();
  const { getBridgeChainProps } = useBridgePage();

  function truncateAddress(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  useEffect(async () => {
    const provider = await getLedgerProvider();
    setObject(provider);
  }, []);

  return (
    <nav className="w-screen flex flex-row justify-between items-center bg-white dark:bg-badger-black-500 mb-8 sticky top-0 md:px-8 px-2 py-2">
      <div id="logo">
        <img
          src="/ZDBeta_logo-02-Dark.svg"
          alt="image"
          className="h-[30px] md:h-[60px] flex"
        />
      </div>
      <div className="text-white">{JSON.stringify(object)}</div>
      <div id="content" className="flex flex-row items-center gap-3">
        <NavigationChainDropdown {...getBridgeChainProps()} />
        <PrimaryRoundedButton
          className="w-fit"
          active={true}
          label={
            wallet.address
              ? truncateAddress(wallet.address).toUpperCase()
              : "CONNECT"
          }
          action={wallet.address ? disconnect : connect}
        />
        <NetworkIndicator keeper={keeper} />
      </div>
    </nav>
  );
};
