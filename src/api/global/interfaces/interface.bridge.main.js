import { useBridgeInput, useBridgeDisplay } from '../hooks/useBridgeHooks'
export const useBridgeTransfer = () => {
    const { ratio, amount, isFast, updateRatio, updateAmount, updateModule } = useBridgeInput()
    const { ETH, renBTC, btc_usd } = useBridgeDisplay()

    const getBridgeTransferProps = ({ ...otherProps } = {}) => ({
        amount: amount,
        effect: updateAmount,
        tokenPrice: btc_usd
    })

    const geTransferRatioProps = ({ ...otherProps } = {}) => ({
        
    })

    return { getBridgeTransferProps }
}