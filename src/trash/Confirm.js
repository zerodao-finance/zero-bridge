import { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'


export const Confirm = () => {
    const [show, hide] = useState(false)
    // ConvertObserver.hide = (state) => {
    //     hide(state)
    // }

       return ( 
           show && <div className="absolute w-full h-full z-30 backdrop-blur-sm flex justify-center items-center">
            <div>
                <svg viewBox="0 0 50 50" className="w-[10rem] h-[10rem]">
                        <circle cx={25} cy={25} r={20} fill="none" strokeWidth="3"   className="animate-trace-path stroke-emerald-300 opacity-0" strokeDasharray="130" />
                        <line x1="15" y1="20" x2="25" y2="33" strokeWidth="3" strokeCap="round" className="animate-trace-path stroke-emerald-300 opacity-0" strokeDasharray="130"></line>
                        <line x1="24" y1="33" x2="45" y2="4"  strokeWidth="3" strokeCap="round" className="animate-trace-path stroke-emerald-300 opacity-0" strokeDasharray="130"></line>
                </svg>
            </div>
        </div>
    )
    

}