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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransferRequest, createZeroConnection, createZeroUser } from 'zero-protocol/dist/lib/zero.js';

/*
DEVELOPMENT CONSTANTS
*/

const connectedWallet = '0xD903338baE3D5C59259E562a49E4ab177E3149a1';
const zeroModule = '0x59741D0210Dd24FFfDBa2eEEc9E130A016B8eb3F'; // arbitrum convert module address
const trivialUnderwriter = '0xd0D8fA764352e33F40c66C75B3BC0204DC95973e';
const asset = '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501'; // renBTC on arbitrum
const data = '0x0';





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

export default function Submit() {

  const [user, setUser] = React.useState(null);

  const initializeConnection = async () => {
    const connection = await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/');
    const user = createZeroUser(connection);
    await user.conn.start();
    await user.subscribeKeepers();
    setUser(user);
  }

  initializeConnection();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const transferRequest = new TransferRequest({
      to: connectedWallet,
      underwriter: trivialUnderwriter,
      module: zeroModule,
      asset,
      amount,
      data
    })

    console.log({
      amount: data.get('amount'),
      keepers: user.keepers
    });
  };

  const [address, setAddress] = React.useState(null);

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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          {!address && `Deposit Address: ${address}`}
        </Box>
        <Box>
        {`Status: ${user ? "Connected" : "Disconnected"}`}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
