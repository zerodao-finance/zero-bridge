import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Convert from './Convert'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';
import {useEffect, useState} from "react";
import wallet_model from './WalletModal';
import { TransferRequest, createZeroConnection, createZeroUser } from 'zero-protocol/dist/lib/zero.js';
import CircleIcon from '@mui/icons-material/Circle';


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

const drawerWidth = 0;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#585858',
    },
    secondary: {
      main: '#a0dcad',
    },
    info: {
      main: '#ffffff',
    },
  }
});

function DashboardContent() {

  const [open, setOpen] = React.useState(true);
  const [keepers, setKeepers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [status, setStatus] = React.useState(false);
  const [renBTC, setRenBTC] = React.useState(0);
  const [eth, setETH] = React.useState(0);  

  const initializeConnection = async () => {
    const connection = await createZeroConnection('/dns4/lourdehaufen.dynv6.net/tcp/443/wss/p2p-webrtc-star/');
    const zUser = createZeroUser(connection);
    await zUser.conn.start();
    await zUser.subscribeKeepers();
    setUser(zUser);
    return zUser;
  }

  React.useEffect(async () => {
    await initializeConnection();
  }, [user]);

  React.useEffect(async () => {
    const listener = (keeper) => {
      setKeepers(user.keepers.slice());
    };
    if (user) user.on('keeper', listener)
    return () => user && user.removeListener('keeper', listener);
  }, [user])

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const {web3Loading, getweb3} = wallet_model ();
  const [web3, setWeb3] = useState ();

  async function connectWallet() {
      await getweb3(). then ((response) => {
        setWeb3(response);
        response.eth.getAccounts().then((result) => {
          console.log(result)
        });
    });
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
	      zeroDAO Arbitrum
            </Typography>
            Keeper Status
            <CircleIcon sx={{fill: `${keepers ? 'green' : 'red'}`, margin: '0 50px 0 10px'}}/>
            {web3 ? 'Wallet Connected' : (<Button variant="test" onClick={connectWallet}>Connect Wallet</Button>)}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {console.log('WEB3', web3)}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
	  	  <Convert user={user}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent/>;
}
