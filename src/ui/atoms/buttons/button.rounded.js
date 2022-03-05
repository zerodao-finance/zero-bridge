export const PrimaryRoundedButton = ({ label, action }) => {
    return (
        <>
            <button onClick={action} className="px-2 py-1 hover:bg-emerald-300 rounded-xl bg-emerald-300 max-w-[160px] truncate dark:text-white text-[13px] md:text-[15px]">
                    {label}
            </button>
        </>
    )
}