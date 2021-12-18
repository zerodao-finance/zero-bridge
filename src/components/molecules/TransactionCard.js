import { Title, ProgressBar } from '../atoms/pt_atoms'
import { useState } from 'react'
const TransactionCard = () => {
    const [step, setStep] = useState(0)
    const next = () => {
        console.log(step)
        setStep(step+1)
    }
    return (
        <div className="shadow-2xl rounded-xl w-fit m-4 bg-gradient-to-r from-gray-200 to-gray-50">
            <div className=" w-fit p-10 flex flex-col gap-4">
                <div className="flex flex-row justify-between" onClick={next}>
                    <Title></Title>
                    { step === 6 ? 
                    <h1 className="text-emerald-300">completed</h1>
                    :
                    <h1 className="text-orange-300">inflight</h1>
                    }
                </div>
                <ProgressBar step={step}/>
            </div>
        </div>
    )
}
export default TransactionCard