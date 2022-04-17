import { DefaultInput } from '../../atoms/inputs/input.default'
import { ethers } from 'ethers'
import TokenDropdown from '../../atoms/dropdowns/dropdown.tokens'
import useTransferCalculate from '../../../api/hooks/transfer-calculate'

export const BridgeTransferInput = ({ amount, effect, tokenPrice, setToken, token }) => {
    const { calculateAmount, calculateLoading } = useTransferCalculate();

    var formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    return (
        <div className="self-center px-0 py-0 w-full">
            <div className="w-100 flex items-center justify-between gap-5 dark:bg-badger-gray-500 bg-gray-100 px-2 rounded-2xl min-h-[74px]" >
                <div className="flex items-center pl-2 max-w-[100%]">
                    <p className="text-[10px] text-gray-300 whitespace-nowrap">TO</p>
                    <TokenDropdown token={token} setToken={setToken} /> 
                </div>
                <DefaultInput value={calculateAmount()} onChange={effect} loading={calculateLoading} disabled maxW="150px" />
            </div>
            <div className=" xl:mr-5 italic tracking-wider w-full text-right text-[10px] text-badger-yellow-neon-400">
                ~ { tokenPrice && formatter.format(amount * ethers.utils.formatUnits(tokenPrice, 6)) }
            </div> 
        </div> 
    )
}