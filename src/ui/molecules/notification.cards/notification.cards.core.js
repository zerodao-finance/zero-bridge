export const getCard = (_ref) => {
    switch (_ref.type) {
        case "error":
            return ErrorCard({..._ref})
        case "message":
            return MessageCard({..._ref})
        default:
            return MessageCard({..._ref})
    }
}
export const ErrorCard = ({type, message, id, callback, close}) => {
    console.log(callback)
    return (
        <div className="bg-red-100 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] text-sm p-5 rounded-md shadow-md text-xs md:text-sm" key={id}>
            <span className="absolute top-4 right-1 text-md" onClick={close}>
                &times;
            </span> 
            <div className="text-black">
                {message}
            </div>
        </div>
    )
}

export const MessageCard = ({type, message, id, callback, close}) => {
    console.log(callback)
    return (
        <div className="bg-gray-50 min-h-[50px] min-w-[100px] max-h-[200px] max-w-[250px] md:max-h-[1000px] md:max-w-[300px] text-sm p-5 rounded-md shadow-md text-xs md:text-sm" key={id}>
            <span className="absolute top-4 right-1 text-md" onClick={close}>
                &times;
            </span> 
            <div className="text-black">
                {message}
            </div>
        </div>
    )
}

