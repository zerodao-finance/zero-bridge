import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransferRequest, createZeroConnection, createZeroUser } from 'zero-protocol/dist/lib/zero.js';
import { ethers } from 'ethers';

/*
DEVELOPMENT CONSTANTS
*/

const connectedWallet = '0xD903338baE3D5C59259E562a49E4ab177E3149a1';
const zeroModule = '0x59741D0210Dd24FFfDBa2eEEc9E130A016B8eb3F'; // arbitrum convert module address
const trivialUnderwriter = '0xd0D8fA764352e33F40c66C75B3BC0204DC95973e';
const asset = '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501'; // renBTC on arbitrum
const data = ethers.utils.defaultAbiCoder.encode(['uint256'], [ ethers.utils.parseEther('0.01') ]);

//const signer = new ethers.Wallet(new ethers.providers.JsonRpcProvider('https://arb-mainnet.g.alchemy.com/v2/utMr7YLZtnhmRySXim_DuF5QMl0HBwdA'));

let value;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://zerodao.com/">
	  zeroDAO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Submit(props) {

  const [user, setUser] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [status, setStatus] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [ratio, setRatio] = React.useState(0);


  React.useEffect(async () => {
    setUser(await initializeConnection());
    setStatus(user && user.keepers && user.keepers.length > 0)
  }, [status]);

  React.useEffect(async () => {
    setStatus(user && user.keepers.length > 0)
  }, [])

  const initializeConnection = async () => {
    if (window.user) return window.user;
    const connection = await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/');
    const user = createZeroUser(connection);
    window.user = user;
    await user.conn.start();
    await user.subscribeKeepers();
    return user;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("user", user)
    console.log("wallet", connectedWallet)
    console.log("to:", connectedWallet)
    console.log("underwriter:", trivialUnderwriter)
    console.log("module:", zeroModule)
    console.log("asset:", asset)
    console.log("amount", event.target[0].value)
    console.log("data:", data)

    const transferRequest = new TransferRequest({
      to: connectedWallet,
      underwriter: trivialUnderwriter,
      module: zeroModule,
      asset,
      amount: event.target[0].value,
      data: String(data)
    });

    //transferRequest.setUnderwriter(trivialUnderwriter);
    //transferRequest.sign(signer, Controller.address).then(transferRequest.toGatewayAddress().then(setAddress(transferRequest)))

    //transferRequest.toGatewayAddress().then(setAddress);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
          </Typography>
          {user && console.log(user)}
          <Box component="form" onSubmit={handleSubmit} onChange={setAmount} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="BTC Amount"
              name="amount"
	      color="success"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
	            color="success"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Move
            </Button>
          </Box>
          <p>
          {address && `Deposit Address: ${address}`}
          </p><p>
          {`Keeper Status: ${status ? "Connected" : "Disconnected"}`}
          </p><p>
          {`Wallet Status: ${props.wallet ? "Connected" : "Disconnected"}`}
          </p>
          <p>ETH-renBTC ratio</p>
          <p>{`ETH: ${(ratio / 100 * (amount || 0)).toFixed(4)}`}</p>
          <p>{`renBTC: ${((1-ratio) / 100 * (amount || 0)).toFixed(4)}`}</p>
          <p>value: {amount}</p>
          <Slider aria-label="Ratio" value={ratio} valueLabelDisplay="on" onChange={(r)=>setRatio(Number(r))} />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


