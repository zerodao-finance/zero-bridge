import "core-js/stable"; // For 'regenerationRuntime'
import "regenerator-runtime/runtime"; // For 'regenerationRuntime'
import '@testing-library/react-hooks';
import React from 'react'
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.React = React;
global.wallet = { connection, connectWallet };
const { connection, connectWallet } = global.wallet;