function GenericCard({ children, type }) {
    if(type === "error"){
        return (
            <div className="w-full py-2 px-4 bg-red-800 dark:bg-red-600 rounded-xl text-sm">
                <p>{children}</p>
            </div>
        )
    }
    else if(type === "warning"){
        return (
            <div className="w-full py-2 px-4 bg-[#E8DFD2] dark:bg-[#F9A825] text-black rounded-xl text-sm">
                <p>{children}</p>
            </div>
        )
    }
    else if(type === "success"){
        return (
            <div className="w-full py-2 px-4 bg-[#D7E0DA] dark:bg-main-green rounded-xl text-sm">
                <p>{children}</p>
            </div>
        )
    }
    else {
        return (
            <div className="w-full py-2 px-4 dark:bg-badger-gray-500 bg-gray-100 rounded-xl text-sm">
                <p>{children}</p>
            </div>
        )
    }
}

export default GenericCard;