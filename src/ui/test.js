import {NetworkIndicator, PrimaryOutlinedButton, PrimaryRoundedButton, DefaultInput } from './atoms'
import { NavigationTopBar } from './molecules/navigation.topbar'
import { MobileNavigationSidebar } from './molecules/navigation.sidebar.mobile'
import { LayoutSidebarNavigation } from './layouts/layout.sidebar.nav'
export const TestUI = () => {
    return (
        <div className='relative'>
            <NavigationTopBar />
            <div className="w-1/2 md:w-1/4 right-0 absolute mx-2">
                <LayoutSidebarNavigation>
                    <MobileNavigationSidebar />
                </LayoutSidebarNavigation>
            </div> 
        </div>
    )
}