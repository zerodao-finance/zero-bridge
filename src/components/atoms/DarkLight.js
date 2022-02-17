import { MdDarkMode } from 'react-icons/md'



export const DarkLight = () => {
    const [screenMode, toggleScreenMode] = global.screenMode
    return (
    <div style={{cursor:'pointer'}} className="flex flex-row justify-center items-center group-hover:w-2/3 group-hover:rounded-full group-hover:ring-2 group-hover:ring-black" onClick={toggleScreenMode}>
        <MdDarkMode className="fill-black dark:fill-white dark:stroke-white h-8 w-8" />
        <p className="hidden group-hover:block group-hover:opacity-100 opacity-0 transition-all delay-75">
            {screenMode ? 'Dark' : 'Light'} Mode
        </p>    
    </div>
    )
    
}