import * as React from 'react'
export const getCard = (_ref) => {
    switch (_ref.type) {
        case "error":
            return ErrorCard({..._ref})
        case "warning":
            return WarningCard({..._ref})
        case "success":
            return SuccessCard({..._ref})
        case "message":
            return MessageCard({..._ref})
        case "transfer":
            return TransferCard({ ..._ref})
        default:
            return MessageCard({..._ref})
    }
}

export const TransferCard = ({ id, close, data}) => {
    return (
        <div className="bg-gray-200 shadow-md text-black">{max} // {current}</div>
    )
}
export const ErrorCard = ({type, message, id, callback, close}) => {
    console.error(message)
    return (
        <div className="bg-[#E4D4D4] dark:bg-[#D32F2F] min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] text-sm p-5 rounded-md shadow-md text-xs md:text-sm" key={id}>
            <span className="absolute top-1 right-1 text-md text-black dark:text-white cursor-pointer" onClick={close}>
                &times;
            </span> 
            <div className="text-black dark:text-white">
                {message}
            </div>
            <div className="bg-[#CF6679] h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
        </div>
    )
}

export const MessageCard = ({type, message, id, callback, close}) => {
    console.log(message)
    return (
        <div className="bg-[#D7E0DA] dark:bg-gray-500 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] text-sm p-5 rounded-md shadow-md text-xs md:text-sm" key={id}>
            <span className="absolute top-1 right-1 text-md dark:text-white cursor-pointer" onClick={close}>
                &times;
            </span> 
            <div className="text-black dark:text-white">
                {message}
            </div>
            <div className="bg-[#59616D] dark:bg-gray-300 h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
        </div>
    )
}

export const WarningCard = ({type, message, id, callback, close}) => {
    console.warn("Warning: ", message)
    return (
        <div className="bg-[#E8DFD2] dark:bg-[#F9A825] min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] text-sm p-5 rounded-md shadow-md text-xs md:text-sm" key={id}>
            <span className="absolute top-1 right-1 text-md text-black cursor-pointer" onClick={close}>
                &times;
            </span> 
            <div className="text-black">
                {message}
            </div>
            <div className="bg-[#F4B755] h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
        </div>
    )
}

export const SuccessCard = ({type, message, id, callback, close}) => {
    return (
        <div className="bg-[#D7E0DA] dark:bg-main-green min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] text-sm p-5 rounded-md shadow-md text-xs md:text-sm" key={id}>
            <span className="absolute top-1 right-1 text-md text-black cursor-pointer" onClick={close}>
                &times;
            </span> 
            <div className="text-black ">
                {message}
            </div>
            <div className="bg-[#73C288] dark:bg-gray-300 h-[6px] w-full absolute bottom-0 left-0 rounded-b-md" />
        </div>
    )
}

