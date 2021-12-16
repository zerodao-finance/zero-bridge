import { WalletProviderContext, KeeperContext } from '../../context/WalletContext'
import wallet_model from '../../WalletModal';
import Contract from 'web3-eth-contract'; 
import { useEffect, useState, useContext } from 'react'
import { ContractContext, Web3Context, ConversionToolContext } from '../../context/Context'
import ConversionTool from '../organisms/ConversionTool'
import Transactions from '../organisms/Transactions'
import { TransferRequest, createZeroConnection, createZeroUser, createZeroKeeper } from 'zero-protocol/dist/lib/zero.js';

import Button from '../atoms/Buttons'
import AppBar from '../organisms/AppBar'


const chainData = [{
    chainId: '0xA4B1',
    chainName: 'Arbitrum',
    nativeCurrency:
        {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
  }]

const curveArbitrum = '0x960ea3e3C7FB317332d990873d354E18d7645590';  // Swap wBTC for wETH (indeces to swap are 1 -> 2 in pool.coins)
const curveABI = [{"stateMutability":"view","type":"function","name":"get_dy","inputs":[{"name":"i","type":"uint256"},{"name":"j","type":"uint256"},{"name":"dx","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3122},]



const Dashboard = () => {
    const [connected, setConnection] = useState(false)
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [user, setUser] = useState(null);
    const [keepers, setKeepers] = useState([]);


    // - sets ZeroDao User Connection
    // const initializeConnection = async () => {
    //     const connection = await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/');
    //     const zUser = createZeroUser(connection)// new LocalStoragePersistenceAdapter());
    //     await zUser.conn.start();
    //     await zUser.subscribeKeepers();
    //     window.user = window.user || zUser;
    //     setUser(zUser);
    //     return zUser;
    //   }

    // - sets ZeroDao User Connection
    const initializeConnection = async () => {
      let keeper
      if (process.env.REACT_APP_TEST === 'test') (async () => {
        keeper = await createZeroKeeper(await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/'));
        keeper.setTxDispatcher = function (fn) {
          this._txDispatcher = fn;
        };
        keeper.setTxDispatcher(async (transferRequest) => {
          const trivialRequest = new TrivialUnderwriterTransferRequest(
            transferRequest
          );
          await trivialRequest.loan(await ethers.provider.getSigner('0x12fBc372dc2f433392CC6caB29CFBcD5082EF494'));
        });
      })();
      const connection = await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/');
      const zUser = createZeroUser(connection)// new LocalStoragePersistenceAdapter());
      if (process.env.REACT_APP_TEST === 'test') zUser.publishTransferRequest = (transferRequest) => setTimeout(() => keeper._txDispatcher(transferRequest), 0)
      if  (process.env.REACT_APP_TEST !== 'test') await zUser.subscribeKeepers()
      await zUser.conn.start();
      zUser.keepers.push(keeper)

      window.user = window.user || zUser;
      setUser(zUser);
      return zUser;
    }
    
    
    // use effect for initializing zero user connection  
    useEffect(async () => {
        await initializeConnection();
      }, []);

    // set keeper state from zero user
    useEffect(async () => {
        const listener = (keeper) => {
          setKeepers(user.keepers.slice());
        };
        if (user) user.on('keeper', listener)
        return () => user && user.removeListener('keeper', listener);
      }, [user])



   

    return (
      
        <KeeperContext.Provider value={keepers}>
            <div className="h-screen fixed bg-gradient-to-tl from-white via-slate-50 to-neutral-50">
                <AppBar />
                <div className="flex flex-col h-full items-center justify-center">
                    <div className="grow"></div>
                    <ConversionTool />
                    <Transactions />
                </div>
            </div>
        </KeeperContext.Provider>
    )
}

export default Dashboard