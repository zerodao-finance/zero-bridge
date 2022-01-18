import { MdDarkMode } from 'react-icons/md'
import { useScreenMode } from '../../core/instance'
export const DarkLight = () => {

    const [screenMode, toggleScreenMode] = global.screenMode
    return <MdDarkMode className="fill-black dark:fill-white dark:stroke-white h-8 w-8" onClick={toggleScreenMode} />
    
}