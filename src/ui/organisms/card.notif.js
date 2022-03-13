import { useTransferEvents } from '../../api/event/transfer.events'
import { TransferRequestCard } from '../molecules/notification.cards/transfer.card'
export const NotificationTransferCard = ({ children }) => {
    const { display } = useTransferEvents(TransferRequestCard)
    return (
        <>
        {
            display
        }
        </>
    )
}
