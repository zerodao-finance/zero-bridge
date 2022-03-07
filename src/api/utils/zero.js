// import {getContract} from './contracts'
// import {NETWORK_ROUTER} from './networks'
import { mapValues } from 'lodash';
import { ethers } from 'ethers';

export const test = {
    TEST_KEEPER_ADDRESS : "0x4A423AB37d70c00e8faA375fEcC4577e3b376aCa",
    SIGNALING_MULTIADDR : "/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/"
}

// export const controller = getContract("ZeroController")

export const deployments = {
  matic: {
    ZeroController: require('zero-protocol/deployments/matic/ZeroController'),
    DelegateUnderwriter: require('zero-protocol/deployments/matic/DelegateUnderwriter'),
    Convert: require('zero-protocol/deployments/matic/PolygonConvert'),
    BTCVault: require('zero-protocol/deployments/matic/BTCVault'),
  },
  arbitrum: {
    ZeroController: require('zero-protocol/deployments/arbitrum/ZeroController'),
    DelegateUnderwriter: require('zero-protocol/deployments/arbitrum/DelegateUnderwriter'),
    Convert: require('zero-protocol/deployments/arbitrum/ArbitrumConvert'),
    BTCVault: require('zero-protocol/deployments/arbitrum/BTCVault')
  },
  localhost: {
    ArbitrumConvertQuick: require('zero-protocol/deployments/localhost/ArbitrumConvertQuick')
  }
};

export const chainIdToNetworkName = (chainId) => {
  return {
    [42161]: 'arbitrum',
    [137]: 'matic',
    [1]: 'ethereum'
  }[chainId];
};


export const deploymentsFromSigner = async (signer) => {
  const { chainId } = await signer.provider.getNetwork();
  return mapValues(deployments[chainIdToNetworkName(chainId)], (v) => new ethers.Contract(v.address, v.abi, signer));
};
