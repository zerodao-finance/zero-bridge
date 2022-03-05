import _ from 'lodash';
import { ethers } from 'ethers'

const getSigner = _.memoize(() => {
    new ethers.provider.jsonRPCSigner(process.env.REACT_APP_JSONRPC)
})