import { BiCheckDouble } from 'react-icons/bi'
import { AiOutlineLoading } from 'react-icons/ai'
import { useState } from 'react'
import { isCommunityResourcable } from '@ethersproject/providers'
import { ConversionToolContext } from '../../context/Context'
import { useContext } from 'react'
export const Title = () => {
    const table_context = useContext(ConversionToolContext)
    return (
        <div className="max-w-fit h-full flex flex-row divide-x gap-3">
            <div className="grid-rows-2 text-right max-w-fit">
                <p className="text-gray-500">11/23/2021</p>
                <p className="text-gray-500">16:43</p>
            </div>
            <div className="grid-rows-2 text-left max-w-fit pl-3">
                <p className="uppercase text-gray-400 font-medium">BTC Deposit Address </p>
                <p className="text-xl text-emerald-300 truncate">{table_context.get.address}</p>
            </div>
        </div>
    )
}


export const ProgressBar = ({ step }) => {
    const thisStep = step
    return (
        <div className="w-[25rem] h-[.5rem] rounded-full flex justify-between relative bg-slate-400">
            <ProgressFiller step={thisStep}/>
            <CheckIcon step={thisStep}/>
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${thisStep >= 1 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${thisStep >= 2 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${thisStep >= 3 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${thisStep >= 4 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${thisStep >= 5 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${thisStep >= 6 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
        </div>
    )
}

const ProgressFiller = ({ step }) => {
    return (
        <div className={step < 6 ? `w-${step-1}/5 h-full bg-emerald-300 absolute` : `w-full h-full bg-emerald-300 absolute`}>

        </div>
    )
}

const CheckIcon = ({ step }) => {
    return (
        <div className="w-full h-full flex flex-row justify-start absolute mt-4 ">
            <div className="hidden w-1/5"></div>
            <div className="hidden w-2/5"></div>
            <div className="hidden w-3/5"></div>
            <div className="hidden w-4/5"></div>
            <div className="hidden w-5/5"></div>
            <div className={step < 5 ? `w-${step}/5 flex flex-row justify-end` : `w-full flex flex-row justify-end ` }>
                { step < 6 && <AiOutlineLoading className="animate animate-spin relative"/>}
            </div>
            <div className={step < 6 ? `w-${step-1}/5 flex flex-row justify-end absolute` : `w-full flex flex-row justify-end absolute`}>
                {step !== 0 &&  <BiCheckDouble className="text-emerald-300 scale-150"/> }
            </div>
            {/* {step !== 0 && <div className={`w-1/5`}></div> } */}
        </div>
    )
}


