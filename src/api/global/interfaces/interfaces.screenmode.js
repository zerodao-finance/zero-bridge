import { storeContext } from '../global'
import { useContext, useEffect } from 'react'
export function useScreenMode(props) {
    const { state, dispatch } = useContext(storeContext)
    const { utilities } = state
    var mode = localStorage.getItem("screenMode") === 'dark' ? true : false
    const toggleScreenMode = () => {
        var dark = document.documentElement.classList.toggle("dark")
        localStorage.setItem("screenMode", dark ? "dark" : "light")
        dispatch({type: "SUCCEED_REQUEST", effect: "utilities", payload: { effect: "themeMode", data: dark}})
    }
    useEffect(() => {
        if (localStorage.getItem("screenMode") === "dark") {
            document.documentElement.classList.add("dark")
        }
    }, [])

    var themeMode = utilities.themeMode
    

    return {
        themeMode, toggleScreenMode
    }
}