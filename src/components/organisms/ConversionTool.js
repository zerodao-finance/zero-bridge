import ConvertBox, { ConfirmBox } from '../molecules/Box'
import {ConvertObserver, Monitor} from '../../utils/TransactionMonitor'
import { _BridgeObserver } from '../../core/instance'
import {useState, useEffect, useContext} from 'react'
import {Web3Context} from "../../context/Context"


const ConversionTool = () => {
    let context = useContext(Web3Context)
    const [screen, switchScreen] = useState(1)
    const [renderData, addData] = useState(null)
    const screens = {
        1: 'convert', 
        3: 'fee',
        2: 'confirm'
    }

    // useEffect(() => {
    //     setTimeout(() => Monitor._checkIfLast(), 4000)
    // }, [])

    
    const nextScreen = (data) => {
        if (screen < 3) switchScreen(screen+1)
        if (data) addData(data)
    }
    
    const prevScreen = (data) => {
        if (screen > 1) switchScreen(screen-1)
    }

    _BridgeObserver.nextScreen = nextScreen
    _BridgeObserver.prevScreen = prevScreen
    // ConvertObserver._screen = nextScreen
    // ConvertObserver._prevScreen = prevScreen

    return (
        <div className="animate-swing-in-top-fwd">
            { screens[screen] == 'convert' ? <ConvertBox/> : screens[screen] == 'fee' ? <></> : <ConfirmBox transferRequest={renderData} back={prevScreen}/>}
        </div>
    )
}
export default ConversionTool 