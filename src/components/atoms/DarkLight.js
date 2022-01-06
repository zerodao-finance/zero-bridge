import { MdDarkMode } from 'react-icons/md'
import { UIContext } from '../../context/Context'
export const DarkLight = () => {
    return(
    <UIContext.Consumer>
        {value =>
        <MdDarkMode className="fill-black dark:fill-white dark:stroke-white h-8 w-8" onClick={value.set} />
        }
     </UIContext.Consumer>)
}