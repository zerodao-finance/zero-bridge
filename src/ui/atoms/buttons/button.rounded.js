export const PrimaryRoundedButton = ({ active, label, action }) => {
    return (
        <>
            <button onClick={action} disabled={!active} className="px-2 py-1 disabled:bg-hover-green hover:bg-hover-green text-black font-bold w-full rounded-xl bg-main-green w-full truncate text-[13px] md:text-[15px]">
                    {label}
            </button>
        </>
    )
}