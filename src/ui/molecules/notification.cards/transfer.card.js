import { TransferCardTitle } from "../../atoms/cards/card.title.transfer";
import { ProgressDots } from "../../atoms/progress/progress.dots";
import { useEvents } from '../../../api/global/interfaces/interface.events'

export const TransferRequestCard = () => {
    useEvents()
    return (
        <div className="flex flex-col isolate w-fit md:min-w-[300px] shadow-md dark:bg-slate-700 rounded-lg p-4 mx-3 my-5">
            <TransferCardTitle />
            <ProgressDots current={3} max={6}/>
        </div>
        
    )
}