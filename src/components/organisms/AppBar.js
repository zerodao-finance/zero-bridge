import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '../atoms/Buttons'
import {ContractContext, Web3Context} from '../../context/Context';
import { GrBeacon } from 'react-icons/gr'




export default function AppBar() {
  return (
      <div className="w-screen px-12 py-3 sticky top-0 flex flex-row justify-between shadow-xl bg-neutral-50 z-40">
            <img src="/ArbitrumLogo@1x.png" alt="image" className="scale-125"/>
            <div className="self-center flex justify-between gap-3">
                <ContractContext.Consumer>
                    { value =>
                    <span className="flex gap-4 self-center text-lg mr-8">

                        {value.get.keepers.length > 0 && <p className="font-medium text-green-500">Keeper Status</p>}
                        {value.get.keepers.length === 0 && <p className="font-medium text-red-500">Keeper Status</p>}
                        {value.get.keepers.length > 0 ?
                        <GrBeacon className="fill-green-500 scale-150 self-center animate animate-pulse"/> :
                        <GrBeacon className="fill-red-500 scale-150 self-center animate animate-pulse"/> 
                        }
                    </span>
                    }
                </ContractContext.Consumer>
                <Web3Context.Consumer>
                { value =>
                        <Button text={value.get.connection ? "Conntected" : "Connect Wallet"} variant={value.get.connection ? "valid" : "outlined"} action={value.get.connection ? null : value.set.connectWallet}/>
                }
                </Web3Context.Consumer>
                <IconButton className="fill-emerald-400 self-center" color="primary">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </div>
      </div> 
  )
}