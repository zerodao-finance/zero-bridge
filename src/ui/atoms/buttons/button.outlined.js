export const PrimaryOutlinedButton = ({ label, action }) => {
    return (
        <>
            <button onClick={action} className="px-2 py-1 hover:bg-emerald-300 border hover:border-slate-500/75 rounded-md bg-emerald-300 max-w-[160px] truncate dark:text-black text-[13px] md:text-[15px]">
                    {label}
            </button>
        </>
    )
}