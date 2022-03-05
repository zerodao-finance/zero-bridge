import {PrimaryOutlinedButton} from '../atoms/buttons/button.outlined'
import {NetworkIndicator} from '../atoms/indicators/indicator.network'
export const NavigationTopBar = ({}) => {
    return (
        <nav className="w-screen flex flex-row justify-between items-center sticky top-0 px-2 py-2">
            <div id="logo">
                <img src="/ArbitrumLogoDark@2x.png" alt="image" className="h-[40px] md:h-[70px]" />
            </div>
            <div id="content" className="flex flex-row items-center gap-3">
                <PrimaryOutlinedButton label="connect wallet" />
                <NetworkIndicator />
            </div>
        </nav>
    )
}