import { BsWallet2 } from 'react-icons/bs'
import { useWalletConnection } from '../../../api/global/interfaces/interfaces.wallet'

export const WalletStatus = () => {
    const { connect, disconnect, wallet, isLoading } = useWalletConnection()

    return (

        <div className={`flex flex-row w-fit justify-center items-center gap-2 ring-[1px] rounded-lg px-2 py-2 ring-black    ${wallet ? "bg-emerald-300 dark:bg-emerald-300" : "bg-white dark:bg-slate-700 dark:text-white"}  group-hover:bg-emerald-300 transition-all duration-200 ease-in cursor-pointer`} >
                    {
                    isLoading ? 
                            <button onClick={connect}>
                                <BsWallet2 className="w-[13px] h-[13px] group-hover:fill-black "/>
                                <p className="font-light text-[13px] group-hover:text-black ">Loading</p> 
                            </button> 
                            :
                        wallet.address ?
                            <button onClick={connect} className="flex flex-row items-center gap-2"> 
                                <BsWallet2 className="w-[13px] h-[13px] group-hover:fill-black"/>
                                <p className="font-light text-[13px] group-hover:text-black">{wallet.address}</p> 
                            </button>
                            :
                            <button onClick={connect} className="flex flex-row items-center gap-2"> 
                                <BsWallet2 className="w-[13px] h-[13px] group-hover:fill-black"/>
                                <p className="font-light text-[13px] group-hover:text-black">Connect Wallet</p> 
                            </button>

                    }
        </div>
    )
}

