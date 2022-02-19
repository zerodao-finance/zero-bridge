import React from 'react'
const DefaultFullWidth = ({text}) => {
    return (
        <>
            <button className="w-full h-max bg-emerald-300 text-white rounded-2xl text-sm px-5 py-2 capitalize">
                {text}
            </button>
        </>
    )
}

const DefaultCheckBox = ({
    name, label
}) => {
    const [checked, _check] = React.useState(false)
    return (
        <div className="flex flex-row gap-3 text-light tracking-wider items-center">
            <input type="checkbox" name={name} className="input-checkbox rounded-md ring-emerald-400">
            </input>
            <label for={name} checked={!!checked} onChange={(e) => {_check(e.target.value)}}>
                {label}
            </label>
        </div>
    )
}


export { 
    DefaultFullWidth, DefaultCheckBox
} 