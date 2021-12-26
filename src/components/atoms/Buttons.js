const Button = ({text, variant, action}) => {
    const variants = {
        "outlined": "dark:bg-gray-900 dark:border-red-600 dark:text-red-500 border-2 rounded-full px-3 py-1 border-red-200 text-red-500 transition-all duration-100 hover:scale-110 hover:text-white hover:bg-emerald-300 hover:border-green-300 text-xl h-fit",
        "circle": "aspect-square border-2 bg-green-600 text-white rounded-full p-3 font-bold bg-gradient-to-r from-emerald-600 to-green-900 hover:scale-110 transition-all duration-100",
        "valid": "border-2 rounded-full px-3 border-emerald-300 bg-emerald-300 text-white transition-all duration-100 cursor-default"
    }

    return (
        <button
            className={variants[variant]}
            onClick={action}
        >
            {text}
        </button>
    )
}

export default Button