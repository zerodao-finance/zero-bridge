import { MdDarkMode } from 'react-icons/md'
export const DarkLight = () => {
    return <MdDarkMode className="fill-black dark:fill-white dark:stroke-white h-8 w-8" onClick={() => {document.documentElement.classList.toggle("dark")}}/>
}