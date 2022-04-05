import { NavigationTopBar } from "../molecules/navigation/navigation.topbar"
import { BridgeModule } from '../organisms/bridge.module'
import { LayoutSidebarNavigation } from "./layout.sidebar.nav"
import { MobileNavigationSidebar } from "../molecules/navigation/navigation.sidebar.mobile"
import { useActiveModuleSwitcher } from "../../api/global/interfaces/interfaces.active.module"
import { TopLeftCardLayout } from './layout.card.top.left'
import { NotificationTransferCard } from '../organisms/card.notif'

import { useCheckWalletConnected } from '../../api/global/interfaces/interfaces.wallet'
import { useBridgePage } from '../../api/global/interfaces/interface.bridge'

export const DashboardLayout = () => {
    const { changeActiveModule, resetModule, currentModule, isLoading } = useActiveModuleSwitcher()
    const { getWalletConnectionProps } = useCheckWalletConnected()
    const { getBridgePageProps } = useBridgePage()
    
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
                    <p className="pb-[.5rem] text-center font-bold dark:text-badger-gray-300"> Bridge </p>
                    <div className="flex flex-row row-[span_8_/_span_8] justify-center items-center isolate" id="hero">
                        {
                            isLoading ?
                                "Loading"
                                :
                                currentModule === 'bridge' ? <BridgeModule {...getWalletConnectionProps()} {...getBridgePageProps()}/> : ''

                        }
                    </div>
                </div>
                
                <div className="footer grid grid-cols-8 justify-center mr-12 items-end mb-2 text-[13px] md:text-md">
                    <p className="text-gray-400 ml-2 col-start-2 col-end-6">
                        Powered By ZeroDAO - Copyright (the "zeroDAO Site"). Z DAO, LLC ("ZD"){" "}
                        <a href="ZeroDao.com">ZeroDao.com</a>
                    </p>
                    <img src="/ZDBeta_logo-02-Dark.svg" alt="image" className="h-[40px] md:h-[70px] w-[225px] col-start-6 col-end-8" />
                </div>
            </div>
        </>
    )
}