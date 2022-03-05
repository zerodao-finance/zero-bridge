// import Button from '../atoms/Buttons'
import { StatusModal } from '../../molecules/status'
import { BsAppIndicator } from 'react-icons/bs'





export const Appbar = () => {
    const {zeroUser, keepers} = global.keeper
    const {connection, connectWallet} = global.wallet
    const [screenMode, toggleScreenMode] = global.screenMode
  return (
      <div className="w-screen px-12 py-3 sticky top-0 flex flex-row justify-between bg-neutral-50 dark:bg-slate-900 z-40 bg-opacity-0 backdrop-blur-md">
          { screenMode ? 
              <img src="/ArbitrumLogo@2x.png" alt="image" className="h-[30px] md:h-[70px]" /> :
              <img src="/ArbitrumLogoDark@2x.png" alt="image" className="h-[48px] md:h-[70px]" /> 
          }
            <div className="self-center flex justify-between gap-3">
                    <StatusModal />
            </div>
      </div> 
  )
}

