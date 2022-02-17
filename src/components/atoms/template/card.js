export const CardTemplate = ({children}) => {
    return (
        <div className="flex flex-col static justify-center max-w-sm aspect-[5/2] rounded-md m-2 p-1 shadow-xl bg-red-100 ">
            {children}
        </div>
    )
}