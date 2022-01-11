import { AiOutlineClose } from 'react-icons/ai'
import { _ErrorObserver } from '../../core/instance'
import { useState } from 'react'
export const ErrorCard = () => {
    var element = document.getElementById("error_dialog")
    const [message, setMessage] = useState()
    _ErrorObserver.show = (_message) => {
        setMessage(_message)
        if (element.classList.contains("hidden")) element.classList.toggle("hidden")
        setTimeout(() => {
            if (!element.classList.contains("hidden")) element.classList.toggle("hidden")
        }, 6000)
    }

    const hide = (e) => {
        element.classList.toggle("hidden")
    }

    return (
        <div id="error_dialog" className="dark:text-white dark:bg-slate-500 bg-white rounded-md flex hidden flex-col p-4 font-light ring-emerald-300 ring-2 relative animate-jello-vertical">
            <AiOutlineClose className="absolute top-1 right-1 hover:scale-150 dark:fill-emerald-300" onClick={hide}/>
            <p className="text-orange-400">REMINDER:</p>
            <p>{message}</p>
        </div>
    )
}