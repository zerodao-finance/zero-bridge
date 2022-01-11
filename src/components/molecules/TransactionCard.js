import { Title, ProgressBar } from '../atoms/pt_atoms'
import { useState, useEffect, useContext } from 'react'

const TransactionCard = ({confs, btc, hash}) => {

    const [step, setStep] = useState(0)
    const stepSetter = (num) => {
        setStep(num)
    }
    useEffect(async () => {
        console.log("test")
        console.log(confs)
        await confs   
            .confirmed()
            .on('confirmation', async (confs, target) => {
                console.log(`${confs}/${target} confirmations`)
                stepSetter(Number(confs))
            })
    }, [confs, step, setStep])





    return (
        <div className="shadow-2xl rounded-xl w-fit m-4 bg-white dark:bg-gray-600 dark:text-white animate-swing-in-top-fwd z-40">
            <div className=" w-fit p-10 flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <p>{hash}</p>
                    <Title btc_address={btc}></Title>
                    { step === 6 ? 
                    <h1 className="text-emerald-300">completed</h1>
                    :
                    <h1 className="text-orange-300" onClick={() => stepSetter(step+1)}>inflight</h1>
                    }
                </div>
                <ProgressBar step={step}/>
            </div>
        </div>
    )
}
export default TransactionCard