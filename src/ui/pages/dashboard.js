import { DashboardLayout } from "../layouts/layouts.dashboard"
import { TopLeftCardLayout } from '../layouts/layout.card.top.left' 
export const DashboardPage = () => {
    return ( 
        <div className="h-screen w-screen bg-gradient-to-tl from-rose-50 to-teal-50 via-Fuchsia-50 dark:bg-none dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-900 dark:to-black">
            {/* <TopLeftCardLayout /> */}
            <DashboardLayout />
        </div>
    )
}