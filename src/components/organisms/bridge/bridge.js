import { Hooks, Context, useBridgeContext } from '../../../core/systems/bridge'
import { Confirmation, Mechanism } from '../../molecules/bridge'
const { useBridgePage } = Hooks
export const BridgeComponent = () => {
    const state = useBridgePage()
    return (
        <div className="animate-swing-in-top-fwd">
            {
                state.page == 1 ? <Mechanism _transactionSender={Hooks.useTransactionSender} _context={Context.useBridgeContext} /> : <Confirmation transferRequest={state.data.transferRequest} back={state.data.back} status={state.status}/> 
            }
        </div>
    )
}