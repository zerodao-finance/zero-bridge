import { BridgeTransferModule } from '../molecules/bridge.transfer';

import { BridgeBurnModule } from '../molecules/bridge.burn/bridge.burn';
import { BridgeLoadingWallet } from '../molecules/bridge.transfer/bridge.loading.wallet';
import { useBridgeInput } from '../../api/global/interfaces/interface.bridge.transfer';
import { useBridgePage } from '../../api/global/interfaces/interface.bridge';
import Disclaimer from './Disclaimer';

export const BridgeModule = ({ wallet, mode, toggleMode }) => {
	const { getTransferMode } = useBridgeInput();
	const { getBridgePageProps } = useBridgePage();
	const { tcSigned } = getBridgePageProps();
	return !tcSigned ? (
		<Disclaimer />
	) : (
		<div className="flex flex-col container h-fit bg-white shadow-xl rounded-[30px] justify-center place-items-center gap-1 md:gap-3  first:gap-0 w-fit pb-4 dark:bg-gray-700 text-white min-w-[370px]">
			<div
				className={`h-full w-full rounded-t-[30px] grid grid-cols-2 grid-flow-rows mb-8 bg-gray-200 dark:bg-gray-800 align-center font-light tracking-wider text-sm text-center`}
			>
				<div
					className={`py-[10px] rounded-tl-[30px] cursor-pointer ${
						mode === 'transfer'
							? 'transition ease-in-out duration-150 bg-main-green hover:bg-main-green/90 text-black font-bold'
							: 'transition ease-in-out duration-150 text-black hover:bg-main-green/10 dark:text-white'
					}`}
					onClick={() => toggleMode('transfer')}
				>
					Transfer
				</div>
				<div
					className={`py-[10px] rounded-tr-[30px] cursor-pointer ${
						mode === 'release'
							? 'bg-main-green text-black font-bold'
							: 'transition ease-in-out duration-150 text-black hover:bg-main-green/10 dark:text-white'
					}`}
					onClick={() => toggleMode('release')}
				>
					Release
				</div>
			</div>
			{wallet ? (
				<BridgeLoadingWallet />
			) : mode === 'transfer' ? (
				<BridgeTransferModule {...getTransferMode()} />
			) : (
				<BridgeBurnModule />
			)}
		</div>
	);
};
