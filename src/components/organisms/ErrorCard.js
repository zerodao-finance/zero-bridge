import { AiOutlineClose } from 'react-icons/ai'
import { _ErrorObserver } from '../../core/instance'
import { useEffect, useState } from 'react'
export const ErrorCard = ({data}) => {
    var element = document.getElementById("error_dialog")
    let timer = null
    if (data.time) timer = setTimeout(() => data.next(), data.time)
    
    const click = () => {
        if (timer) clearTimeout(timer)
        data.next()
    }

    const hide = (e) => {
        element.classList.toggle("hidden")
    }

    return (
        <div id="error_dialog" className="dark:text-white dark:bg-slate-500 bg-white rounded-md flex flex-col p-4 font-light ring-emerald-300 ring-2 relative animate-jello-vertical">
            <AiOutlineClose className="absolute top-1 right-1 hover:scale-150 dark:fill-emerald-300" onClick={click}/>
            <p className="text-orange-400">REMINDER:</p>
            <p>{data.data}</p>
        </div>
    )
}