import { PrimaryRoundedButton } from '../../atoms/buttons/button.rounded'
import { useZero } from '../../../api/global/interfaces/interfaces.zero'
import { useBridgeInput } from '../../../api/global/interfaces/interface.bridge.transfer'

export const BridgeTransferSubmit = ({action}) => {
    const { keeper } = useZero()
    const { getTransferInputProps } = useBridgeInput()
    const { amount } = getTransferInputProps()

    const isActive = () => { 
        console.log("amount:", amount)
        return keeper.length > 0 && amount > 0;
    }

    return (
        <PrimaryRoundedButton active={isActive() > 0 ? true : false} label={isActive() ? "Transfer Funds" : keeper.length > 0 ? "Input Valid Amount" : "Awaiting Keeper"} action={action}/>
    )
}