import ConvertBox, { ConfirmBox } from '../molecules/Box'
import {ConvertObserver} from '../../utils/TransactionMonitor'
import {useState} from 'react'


const ConversionTool = () => {
    const [screen, switchScreen] = useState(1)
    const [renderData, addData] = useState(null)
    const screens = {
        1: 'convert', 
        3: 'fee',
        2: 'confirm'
    }

    
    const nextScreen = (data) => {
        if (screen < 3) switchScreen(screen+1)
        if (data) addData(data)
    }
    
    const prevScreen = (data) => {
        if (screen > 1) switchScreen(screen-1)
    }

    ConvertObserver._screen = nextScreen
    ConvertObserver._prevScreen = prevScreen

    return (
        <div className="animate-swing-in-top-fwd">
            { screens[screen] == 'convert' ? <ConvertBox/> : screens[screen] == 'fee' ? <></> : <ConfirmBox transferRequest={renderData} back={prevScreen}/>}
        </div>
    )
}
export default ConversionTool 