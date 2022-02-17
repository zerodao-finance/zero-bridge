import { FaConnectdevelop } from 'react-icons/fa'
export const KeeperStatus = () => {
    const {zeroUser, keepers} = global.keeper
    return (
        <div className="flex flex-row w-max justify-center items-center gap-2">
            <FaConnectdevelop className={`w-[18px] h-[18px] font-emerald-300 dark:text-white animate-[spin_5s_linear_infinite] ${keepers.length > 0 ? "fill-emerald-600" : "fill-red-700"}`}/>
        </div>
    )
}