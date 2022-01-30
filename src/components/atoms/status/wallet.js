import { BsWallet2 } from 'react-icons/bs'
import { useNetwork } from '../../../core/systems/wallet'
export const WalletStatus = () => {
    const {connection, connectWallet} = global.wallet
    const [ network, networks, switchNetwork ] = useNetwork()

    console.log(networks)

    return (
        <div className="group flex flex-row gap-2">
            <button onClick={() => connectWallet()}>
                <div className={`flex flex-row w-fit justify-center items-center gap-2 ring-[1px] rounded-lg px-2 py-2 ring-black    ${connection ? "bg-emerald-300 dark:bg-emerald-300" : "bg-white dark:bg-slate-700 dark:text-white"}  group-hover:bg-emerald-300 transition-all duration-200 ease-in cursor-pointer`} >
                    {
                    connection ? 
                            <>
                                <BsWallet2 className="w-[13px] h-[13px] group-hover:fill-black "/>
                                <p className="font-light text-[13px] group-hover:text-black ">connected</p> 
                            </> 
                            :
                            <> 
                                <BsWallet2 className="w-[13px] h-[13px] group-hover:fill-black"/>
                                <p className="font-light text-[13px] group-hover:text-black">not connected</p> 
                            </>
                    }
                </div>
            </button>
            <div className="flex flex-col items-center cursor-pointer">
                {
                    connection ?
                    <div className="group flex flex-col items-center">
                        <p className="text-[10px] font-light underline group-hover:hidden dark:text-white">Connected Network</p>
                        <p className="text-[13px] group-hover:hidden uppercase text-light text-blue-500">{network}</p>
                        <div className="hidden group-hover:flex flex-col items-center transition-all duration-200 ease-in animate-fade">
                            <p className="text-[10px] font-light underline dark:text-white">Switch Network</p>
                            {
                                networks.map(i => <p className="text-[13px] uppercase text-light text-blue-500 hover:underline" key={i[0]} onClick={() => switchNetwork(i[0])}>{i[1]}</p>)
                            }
                        </div>
                    </div>
                    :
                    <p className="text-[10px] font-light underline dark:text-white">No Network</p>
                }
            </div>
        </div>
    )
}

