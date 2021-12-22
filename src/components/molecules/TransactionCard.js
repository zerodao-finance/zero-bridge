import { Title, ProgressBar } from '../atoms/pt_atoms'
import { useState, useEffect, useContext } from 'react'
import {
    ContractContext,
    Web3Context,
    ConversionToolContext,
    TransactionTableContext
  } from "../../context/Context";

const TransactionCard = ({depositTx}) => {

    let t_value = useContext(TransactionTableContext);
    const [step, setStep] = useState(0)
    useEffect(() => {
        depositTx   
            .on('target', (target) => {
                console.log(`${target}`)
                setStep(0)
            })
            .on('deposit', (confs, target) => {
                console.log(`${confs}/${target} confirmations`)
                stepSetter(Number(confs))
                if (confs === 6){
                    t_value.set.updateLastTxStatus(t_value.get.lastTx, "success")
                    t_value.get.refreshTable()
                }
            })
    }, [depositTx, step, setStep])


    const stepSetter = (num) => {
        setStep(num)
    }



    return (
        <div className="shadow-2xl rounded-xl w-fit m-4 bg-gradient-to-r from-gray-200 to-gray-50">
            <div className=" w-fit p-10 flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <Title></Title>
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