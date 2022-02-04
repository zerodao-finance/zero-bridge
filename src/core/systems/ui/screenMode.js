import { useEffect, useState } from 'react'
export function useScreenMode(props){

    var mode = localStorage.getItem("screenMode") === "dark" ? true: false
    const [ screenMode, toggle ] = useState(mode)
    const toggleScreenMode = () => {
        var dark = document.documentElement.classList.toggle("dark")
        localStorage.setItem("screenMode", dark ? "dark" : "light")
        toggle(dark ? true : false)
    }   

    useEffect(() => {
        if (localStorage.getItem("screenMode") === "dark"){
            document.documentElement.classList.add("dark")
        }
    }, [])
    global.screenMode = [ screenMode, toggleScreenMode ]
    return [screenMode, toggleScreenMode]
}