import {NetworkIndicator, PrimaryOutlinedButton, PrimaryRoundedButton, DefaultInput } from './atoms'
import { NavigationTopBar } from './molecules/navigation.topbar'
import { MobileNavigationSidebar } from './molecules/navigation.sidebar.mobile'
import { LayoutSidebarNavigation } from './layouts/layout.sidebar.nav'
import { BridgeModule } from './organisms/bridge.module'
import { DashboardPage } from './pages/dashboard'

export const TestUI = () => {
    return (
        <div className='relative'>
            <DashboardPage />
        </div>
    )
}