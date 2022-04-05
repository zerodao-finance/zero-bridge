import { DashboardLayout } from "../layouts/layouts.dashboard"
import { TopLeftCardLayout } from '../layouts/layout.card.top.left' 
import { useEvents } from "../../api/global/interfaces/interface.events"
import { usePriceFeedContracts } from "../../api/global/hooks/usePriceFeedData"
import Disclaimer from "../organisms/Disclaimer"
import { useBridgePage } from "../../api/global/interfaces/interface.bridge"

export const DashboardPage = () => {
    useEvents()
    usePriceFeedContracts()
    const { getBridgePageProps } = useBridgePage();
	const { tcSigned } = getBridgePageProps();
    console.log('tc signed?', tcSigned)
    return ( 
        <div className="fixed h-full w-full dark:bg-badger-black-800" >
            {/* <TopLeftCardLayout /> */}
            {!tcSigned ? <Disclaimer /> : <DashboardLayout />}
        </div>
    )
}