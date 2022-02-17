// import Button from '../atoms/Buttons'
import { StatusModal } from '../../molecules/status'
import { BsAppIndicator } from 'react-icons/bs'





export const Appbar = () => {
    const {zeroUser, keepers} = global.keeper
    const {connection, connectWallet} = global.wallet
    const [screenMode, toggleScreenMode] = global.screenMode
  return (
      // <div>
      //     <StatusModal />
      // </div>
      <div className="w-screen px-12 py-3 sticky top-0 flex flex-row justify-between bg-neutral-50 dark:bg-slate-900 z-40 bg-opacity-0 backdrop-blur-md">
          { screenMode ? 
              <img src="/ArbitrumLogo@2x.png" alt="image" className="h-[70px]" /> :
              <img src="/ArbitrumLogoDark@2x.png" alt="image" className="h-[70px]" /> 
          }
            <div className="self-center flex justify-between gap-3">
                    {/* <Button text={connection ? "Connected" : "Connect Wallet"} variant={connection ? "valid" : "outlined"} action={connection ? null : connectWallet}/> */}
                    {/* <span className="flex gap-4 self-center text-lg ml-8">
                        {keepers.length > 0 && <p className="font-medium text-emerald-300 hidden md:block text-sm">Keeper Status</p>}
                        {keepers.length === 0 && <p className="font-medium text-red-500 text-sm">Keeper Status</p>}
                        {keepers.length > 0 ?
                        <BsAppIndicator className="fill-emerald-400 scale-150 self-center animate hover:animate-ping"/> :
                        <BsAppIndicator className="fill-red-500 scale-150 self-center animate animate-ping"/> 
                        }
                    </span> */}
                    <StatusModal />
            </div>
      </div> 
  )
}

