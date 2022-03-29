export const PrimaryRoundedButton = ({ label, action }) => {
    return (
        <>
            <button onClick={action} className="px-2 py-1 hover:bg-emerald-200 border dark:border-emerald-300 w-full hover:border-slate-500/75 dark:hover:border-white rounded-xl bg-emerald-300 w-full truncate text-black text-[13px] md:text-[15px]">
                    {label}
            </button>
        </>
    )
}