import { MdDarkMode } from 'react-icons/md'
import { useScreenMode } from '../../../core/instance'

export const DarkLight = () => {
    const [ screenMode, toggleScreenMode ] = global.screenMode
    return (
        <>
            <div className="flex flex-row justify-center items-center group-hover:w-2/3 group-hover:rounded-full group-hover:ring-2 group-hover:ring-black">
                <MdDarkMode className="fill-black dark:fill-white dark:stroke-white h-8 w-8" onClick={toggleScreenMode} />
                <p className="hidden group-hover:block group-hover:opacity-100 opacity-0 transition-all delay-75" >
                    Dark/Light
                </p>
            </div>
        </>
    )
}