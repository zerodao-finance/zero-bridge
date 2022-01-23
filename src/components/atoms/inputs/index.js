
const OutlinedInput = () => {
    return (
        <>
            <div className="text-black dark:text-white w-fit ring-[1px] rounded-3xl ring-emerald-200 px-5 py-2">
                <p className="text-[10px] font-light text-gray-400">
                    btc deposit address
                </p>
                <input id="transfer-amount" className=" mx-2 px-3 form-input rounded-lg caret-emerald-300 appearance-none border-0 focus:ring-0 text-sm z-40 bg-transparent border-b-[1px] focus:border-emerald-300 border-emerald-300" type="text"></input>
            </div>
        </>
    )
}


export {
    OutlinedInput
}
