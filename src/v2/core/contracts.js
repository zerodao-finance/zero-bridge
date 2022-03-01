'use strict';

import PolygonConvert from 'zero-protocol/deployments/matic/PolygonConvert';
import BTCVault from 'zero-protocol/deployments/matic/BTCVault';
import DummyVault from 'zero-protocol/deployments/matic/DummyVault';
import StrategyRenVM from 'zero-protocol/deployments/matic/StrategyRenVM';
import TrivialUnderwriter from 'zero-protocol/deployments/matic/TrivialUnderwriter';
import UnwrapNative from 'zero-protocol/deployments/matic/UnwrapNative';
import WrapNative from 'zero-protocol/deployments/matic/WrapNative';
import ZeroController from 'zero-protocol/deployments/matic/ZeroController';
import ZeroCurveFactory from 'zero-protocol/deployments/matic/ZeroCurveFactory';
import ZeroUniswapFactory from 'zero-protocol/deployments/matic/ZeroUniswapFactory';
import { ethers } from 'ethers';

const contracts = {
  PolygonConvert,
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

