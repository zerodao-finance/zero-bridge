import { useState, useEffect, useContext } from 'react'
import { createZeroUser, createZeroConnection } from "zero-protocol/dist/lib/zero.js";
import _ from 'lodash'
// import { _BridgeMonitor } from '../../instance'
import { sdk } from './sdk'
import {enableGlobalMockRuntime, createMockKeeper} from "zero-protocol/dist/lib/mock.js"


const enableMocks = _.memoize(async () => {
  if (process.env.REACT_APP_TEST) {
    await createMockKeeper()
    await enableGlobalMockRuntime()
	  console.log('enabled mocks');
  }
});

export const initializeZeroUser = async () => {
    await enableMocks();
    const zeroUser = createZeroUser(await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/'));
	console.log('created zeroUser');
	
    await zeroUser.conn.start();
    await zeroUser.subscribeKeepers();
    window.user = zeroUser
    sdk.zeroUser = zeroUser
    return zeroUser
}

