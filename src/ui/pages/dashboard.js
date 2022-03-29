import { DashboardLayout } from "../layouts/layouts.dashboard"
import { TopLeftCardLayout } from '../layouts/layout.card.top.left' 
import { useEvents } from "../../api/global/interfaces/interface.events"
import { usePriceFeedContracts } from "../../api/global/hooks/usePriceFeedData"
export const DashboardPage = () => {
    useEvents()
    usePriceFeedContracts()
    return ( 
        <div className="h-screen w-screen bg-gradient-to-tl from-rose-50 to-teal-50 via-Fuchsia-50 dark:bg-none dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-900 dark:to-black">
            {/* <TopLeftCardLayout /> */}
            <DashboardLayout />
        </div>
    )
}