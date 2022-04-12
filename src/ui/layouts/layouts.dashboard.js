import { NavigationTopBar } from "../molecules/navigation/navigation.topbar"
import { BridgeModule } from '../organisms/bridge.module'
import { LayoutSidebarNavigation } from "./layout.sidebar.nav"
import { MobileNavigationSidebar } from "../molecules/navigation/navigation.sidebar.mobile"
import { useActiveModuleSwitcher } from "../../api/global/interfaces/interfaces.active.module"
import { TopLeftCardLayout } from './layout.card.top.left'
import { NotificationTransferCard } from '../organisms/card.notif'

import { useCheckWalletConnected } from '../../api/global/interfaces/interfaces.wallet'
import { useBridgePage } from '../../api/global/interfaces/interface.bridge'
import { ManageTransaction } from "../molecules/manage/manage.request"

export const DashboardLayout = () => {
    const { changeActiveModule, resetModule, currentModule, isLoading } = useActiveModuleSwitcher()
    const { getWalletConnectionProps } = useCheckWalletConnected()
    const { getBridgePageProps } = useBridgePage()

    const getTitle = () => {
        switch (currentModule) {
            default:
                return 'Bridge'
        }
    }
    
    return ( 
        <>
            <div className="grid grid-rows-11 grid-flow-cols h-full w-full">
                <div className="row-span-1" id='navigation'>
                    <NavigationTopBar />
                    <div className="w-1/2 md:w-1/4 right-0 absolute mx-2">
                        <LayoutSidebarNavigation changeModule={changeActiveModule}>
                            <MobileNavigationSidebar changeModule={changeActiveModule}/>
                        </LayoutSidebarNavigation>
                    </div> 
                </div>
                {/* <div className="absolute top-[4rem]">
                    <TopLeftCardLayout >
                        <NotificationTransferCard />
                    </TopLeftCardLayout>
                </div> */}
                <div className="flex flex-col w-fit ml-auto mr-auto">
                    <p className="pb-[.5rem] opacity-60 text-center font-bold dark:text-white">{getTitle()}</p>
                    <div className="flex flex-row row-[span_8_/_span_8] justify-center items-center isolate" id="hero">
                        {
                            isLoading ?
                                "Loading"
                                :
                                currentModule === 'bridge' ? <BridgeModule {...getWalletConnectionProps()} {...getBridgePageProps()}/> : 
                                currentModule === 'manage' ? <ManageTransaction /> : ''

                        }
                    </div>
                </div>
                
                <div className="footer row-span-2 flex flex-col-reverse text-[13px] md:text-md">
                    <p className="text-gray-400 ml-2">
                        Copyright (the "zeroDAO Site"). Z DAO, LLC ("ZD"){" "}
                        <a href="ZeroDao.com">ZeroDao.com</a>
                    </p>
                </div>
            </div>
        </>
    )
}