import { Title, ProgressBar } from '../atoms/pt_atoms'
import { useState, useEffect, useContext } from 'react'

const TransactionCard = ({data}) => {

    const [step, setStep] = useState(0)
    const stepSetter = (num) => {
        setStep(num)
    }
    
    useEffect(async () => {
        if (process.env.REACT_APP_TEST){
            console.log(data)
            data.data
                .on('confirmation', (confs, target) => {
                    stepSetter(Number(confs))

                    if (confs === target){
                        data.next()
                    }
                })
        } else {
            await data.data
                .on('confirmation', async (confs, target) => {
                    stepSetter(Number(confs))
                })
        }
    }, [])





    return (
        <div className="shadow-2xl rounded-xl w-fit m-4 bg-white dark:bg-gray-600 dark:text-white animate-swing-in-top-fwd z-40">
            <div className=" w-fit p-10 flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <Title btc_address={"0x323"}></Title>
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