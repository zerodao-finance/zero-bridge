import { FaRegFrownOpen } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
export const ErrorIndicator = ({message}) => {
    return (
        <>
            <IoCloseOutline className="absolute top-3 left-3 hover:scale-[1.1] transition-all duration-150"/>
            <div className="flex flex-col items-center gap-5">
                <FaRegFrownOpen className="w-[30px] h-[30px] fill-red-600"/>
                <p className="text-red-700 tracking-wider">
                    {message}
                </p>
            </div>
        </>
    )
}