import { BiCheckDouble } from 'react-icons/bi'
import { AiOutlineLoading } from 'react-icons/ai'
import { useState } from 'react'
import { isCommunityResourcable } from '@ethersproject/providers'
export const Title = () => {
    return (
        <div className="max-w-fit h-full flex flex-row divide-x gap-3">
            <div className="grid-rows-2 text-right max-w-fit">
                <p className="text-gray-500">11/23/2021</p>
                <p className="text-gray-500">16:43</p>
            </div>
            <div className="grid-rows-2 text-left max-w-fit pl-3">
                <p className="uppercase text-gray-400 font-medium">txn</p>
                <p className="text-xl text-emerald-300">0x323...123e</p>
            </div>
        </div>
    )
}


export const ProgressBar = (props) => {
    let step = props.step
    return (
        <div className="w-[25rem] h-[.5rem] rounded-full flex justify-between relative bg-slate-400">
            <ProgressFiller step={step}/>
            <CheckIcon step={step}/>
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${step >= 1 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${step >= 2 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${step >= 3 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${step >= 4 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${step >= 5 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
            <div className={`w-[.5rem] h-[.5rem] rounded-full ${step >= 6 ? "bg-emerald-300" : "bg-slate-400"} scale-[2]`}></div> 
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
        <div className="w-full h-full flex justify-start absolute mt-4">
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


