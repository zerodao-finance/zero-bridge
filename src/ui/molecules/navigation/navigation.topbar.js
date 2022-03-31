import {PrimaryOutlinedButton} from '../../atoms/buttons/button.outlined'
import {NetworkIndicator} from '../../atoms/indicators/indicator.network'
import { useWalletConnection } from '../../../api/global/interfaces/interfaces.wallet'
import { useZero } from '../../../api/global/interfaces/interfaces.zero'

export const NavigationTopBar = ({}) => {
    
    const { connect, disconnect, wallet, isLoading } = useWalletConnection()
    const { keeper } = useZero()

    function truncateAddress(address) {
        return address.slice(0, 6) + "..." + address.slice(-4)
    }

    return (
        <nav className="w-screen flex flex-row justify-between items-center sticky top-0 px-2 py-2">
            <div id="logo">
                <img src="/ZDBeta_logo-02-Dark.svg" alt="image" className="h-[40px] md:h-[70px] hidden dark:flex" />
                <img src="/ZDBeta_logo-02.svg" alt="image" className="h-[40px] md:h-[70px] dark:hidden" />
            </div>
            <div id="content" className="flex flex-row items-center gap-3">
                <PrimaryOutlinedButton label={wallet.address ? truncateAddress(wallet.address).toUpperCase() : "CONNECT"} action={wallet.address ? disconnect : connect}/>
                <NetworkIndicator keeper={keeper}/>
            </div>
        </nav>
    )
}