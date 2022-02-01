import {getContract} from './contracts'
import {NETWORK_ROUTER} from './networks'

export const test = {
    TEST_KEEPER_ADDRESS : "0x12fBc372dc2f433392CC6caB29CFBcD5082EF494",
    SIGNALING_MULTIADDR : "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/"
}

export const controller = getContract("ZeroController")

