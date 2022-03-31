import { PrimaryRoundedButton } from '../../atoms';
import { NetworkIndicator } from '../../atoms/indicators/indicator.network';
import { useWalletConnection } from '../../../api/global/interfaces/interfaces.wallet';
import { useZero } from '../../../api/global/interfaces/interfaces.zero';
import { useScreenMode } from '../../../api/global/interfaces/interfaces.screenmode';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';

export const NavigationTopBar = ({}) => {
	const { connect, disconnect, wallet, isLoading } = useWalletConnection();
	const { keeper } = useZero();
	const { themeMode, toggleScreenMode } = useScreenMode();
    console.log('theme mode:', themeMode)

	function truncateAddress(address) {
		return address.slice(0, 6) + '...' + address.slice(-4);
	}

	return (
		<nav className="w-screen flex flex-row justify-between items-center sticky top-0 px-2 py-2">
			<div id="logo">
				<img src="/ZDBeta_logo-02-Dark.svg" alt="image" className="h-[40px] md:h-[70px] hidden dark:flex" />
				<img src="/ZDBeta_logo-02.svg" alt="image" className="h-[40px] md:h-[70px] dark:hidden" />
			</div>
			<div id="content" className="flex flex-row items-center gap-3">
				<div className="flex flex-row justify-center self-center cursor-pointer" onClick={() => toggleScreenMode()}>
					<FaSun className={`${themeMode == 'dark' ? 'block' : 'hidden'} w-fit h-[24px] w-[24px] pr-2 fill-main-green`}/>
					<FaMoon className={`${themeMode == 'dark' ? 'hidden' : 'block'} w-fit h-[24px] w-[24px] pr-2 fill-main-green`} />
				</div>
				<PrimaryRoundedButton
                    className="w-fit"
					active={true}
					label={wallet.address ? truncateAddress(wallet.address).toUpperCase() : 'CONNECT'}
					action={wallet.address ? disconnect : connect}
				/>
				<NetworkIndicator keeper={keeper} />
			</div>
		</nav>
	);
};
