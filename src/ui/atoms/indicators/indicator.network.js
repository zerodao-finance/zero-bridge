import { FaConnectdevelop } from 'react-icons/fa'

export const NetworkIndicator = ({keeper}) => {
    console.log("keeper: ", keeper, keeper.length)
    return (
        <div>
            <FaConnectdevelop className={`max-w-[18px] max-h-[18px] animate-[spin_5s_linear_infinite] ${keeper.length > 0 ? "fill-emerald-700" : "fill-red-700"}`}></FaConnectdevelop>
        </div> 
    )
}