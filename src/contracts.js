'use strict';

import ArbitrumConvert from 'zero-protocol/deployments/arbitrum/ArbitrumConvert';
import BTCVault from 'zero-protocol/deployments/arbitrum/BTCVault';
import DummyVault from 'zero-protocol/deployments/arbitrum/DummyVault';
import StrategyRenVM from 'zero-protocol/deployments/arbitrum/StrategyRenVM';
import TrivialUnderwriter from 'zero-protocol/deployments/arbitrum/TrivialUnderwriter';
import UnwrapNative from 'zero-protocol/deployments/arbitrum/UnwrapNative';
import WrapNative from 'zero-protocol/deployments/arbitrum/WrapNative';
import ZeroController from 'zero-protocol/deployments/arbitrum/ZeroController';
import ZeroCurveFactory from 'zero-protocol/deployments/arbitrum/ZeroCurveFactory';
import ZeroUniswapFactory from 'zero-protocol/deployments/arbitrum/ZeroUniswapFactory';
import { ethers } from 'ethers';

const contracts = {
  ArbitrumConvert,
  BTCVault,
  DummyVault,
  StrategyRenVM,
  TrivialUnderwriter,
  UnwrapNative,
  WrapNative,
  ZeroController,
  ZeroCurveFactory,
  ZeroUniswapFactory
};

export const toSignerIfPossible = (providerOrSigner) => {
  try {
    return providerOrSigner.getSigner(0);
  } catch (e) {
    return providerOrSigner;
  }
};

export const providerOrDefault = (providerOrSigner) => toSignerIfPossible(providerOrSigner || new ethers.providers.JsonRpcProvider(process.env.REACT_APP_JSONRPC || 'http://localhost:8545'));

export const getContract = (n, providerOrSigner) => new ethers.Contract(contracts[n].address, contracts[n].abi, providerOrDefault(providerOrSigner));

export const getContracts = (providerOrSigner) => mapValues(contracts, (v) => new ethers.Contract(v.address, v.abi, providerOrDefault(providerOrSigner)));

