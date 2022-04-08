import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { ethers } from 'ethers'
import { BridgeLoadingGateway } from './bridge.loading.gateway'
import { useBridgePage } from '../../../api/global/interfaces/interface.bridge'
import { BitcoinQR } from '../../atoms/helpers/BitcoinQR'

export const BridgeGatewayConfirmation = ({transferRequest, gatewayAddress}) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 min-h-[290px] text-black dark:text-badger-yellow-neon-400">
                <BitcoinQR
                    bitcoinAddress={gatewayAddress}
                    amount={ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8 )}
                />
                <p className="cursor-copy select-all">
                    {gatewayAddress}
                </p>
                <div id="usage" className="text-[11px] indent max-w-[300px] text-main-green dark:text-badger-yellow-neon-400 justify-self-end">
                    <p>Reminder: deposit the exact amount of BTC indicated to the deposit address</p>
                </div>
                <div id="fee_data" className="flex flex-row justify-center items-center gap-5 text-[13px] text-gray-700 dark:text-gray-300">
                    <p className="text-[14px] text-red-700 dark:text-badger-blue-400">Fees Breakdown</p> 
                    <div className="flex flex-col items-end pr-5 border-r-[1px] border-black">
                        <span>RenVM Fee:</span> 
                        <span>Zero Fee:</span> 
                        <span>Curve Fee:</span> 
                    </div>
                    <div className="flex flex-col items-start pr-2">
                        <span className="truncate max-w-[80px]">
                            {ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8 ) * .002}
                        </span >
                        <span className="truncate max-w-[80px]">
                            {+ ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8 ) * .003}
                        </span>
                        <span className="truncate max-w-[80px]">
                            {ethers.utils.formatUnits(ethers.BigNumber.from(transferRequest.amount), 8 ) * .0004}
                        </span>
                    </div>
                </div>
                <div id="disclaimer" className="text-[9px] max-w-[300px] text-gray-500 dark:text-gray-300 justify-self-end">
                    <p>please note, this tool is in beta and subject to further improvements and changes.
                    use this tool at your discretion and never deposit more funds than you could afford to lose</p>
                </div>
            </div>
        </>
    )
}