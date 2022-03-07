import { NavigationTopBar } from "../molecules/navigation/navigation.topbar"
import { BridgeModule } from '../organisms/bridge.module'
import { LayoutSidebarNavigation } from "./layout.sidebar.nav"
import { MobileNavigationSidebar } from "../molecules/navigation/navigation.sidebar.mobile"
import { useActiveModuleSwitcher } from "../../api/global/interfaces/interfaces.active.module"

export const DashboardLayout = () => {
    const { currentModule, isLoading } = useActiveModuleSwitcher();
    
    return ( 
        <>
            <div className="grid grid-rows-11 grid-flow-cols h-full w-full">
                <div className="row-span-1" id='navigation'>
                    <NavigationTopBar />
                    <div className="w-1/2 md:w-1/4 right-0 absolute mx-2">
                        <LayoutSidebarNavigation>
                            <MobileNavigationSidebar/>
                        </LayoutSidebarNavigation>
                    </div> 
                </div>
                <div className="flex flex-row row-[span_8_/_span_8] justify-center items-center" id="hero">
                    {isLoading ? "Loading" : 
                        currentModule === 'bridge' ? <BridgeModule /> :
                        currentModule === 'history' ? <>History</> :
                        currentModule === 'transactions' && <>Transactions</>
                    }
                </div>
                <div className="footer row-span-2 flex flex-col-reverse">
                    <p className="text-gray-400 ml-2">
                        Copyright (the "zeroDAO Site"). Z DAO, LLC ("ZD"){" "}
                        <a href="ZeroDao.com">ZeroDao.com</a>
                    </p>
                </div>
            </div>
        </>
    )
}