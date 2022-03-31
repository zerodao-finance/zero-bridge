import { FaConnectdevelop } from 'react-icons/fa'

export const NetworkIndicator = ({keeper}) => {
    return (
        <div>
            <FaConnectdevelop className={`max-w-[18px] max-h-[18px] animate-[spin_5s_linear_infinite] ${keeper.length > 0 ? "fill-main-green" : "fill-red-700"}`}></FaConnectdevelop>
        </div> 
    )
}