import {getContract} from './contracts'
import {NETWORK_ROUTER} from './networks'

export const test = {
    TEST_KEEPER_ADDRESS : "0x4A423AB37d70c00e8faA375fEcC4577e3b376aCa",
    SIGNALING_MULTIADDR : "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/"
}

export const controller = getContract("ZeroController")

