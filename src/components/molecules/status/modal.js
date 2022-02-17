import {KeeperStatus, WalletStatus} from '../../atoms/status'
export const StatusModal = () => {
    return (
        <>
            <WalletStatus />
            <KeeperStatus />
        </>
    )
}