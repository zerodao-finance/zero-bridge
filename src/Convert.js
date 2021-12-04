import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  TransferRequest,
  createZeroConnection,
  createZeroUser,
} from "zero-protocol/dist/lib/zero.js";
import { ethers } from "ethers";
import { userSetter } from "core-js/fn/symbol";
import { getContract } from './contracts'

/*
DEVELOPMENT CONSTANTS
*/

const connectedWallet = "0xD903338baE3D5C59259E562a49E4ab177E3149a1";
const zeroModule = "0x59741D0210Dd24FFfDBa2eEEc9E130A016B8eb3F"; // arbitrum convert module address
const trivialUnderwriter = "0xd0D8fA764352e33F40c66C75B3BC0204DC95973e";
const asset = "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501"; // renBTC on arbitrum
const controller = getContract('ZeroController')
console.log("CONTROLLER", controller)
const data = ethers.utils.defaultAbiCoder.encode(
  ["uint256"],
  [ethers.utils.parseEther("0.01")]
);

//const signer = new ethers.Wallet(new ethers.providers.JsonRpcProvider('https://arb-mainnet.g.alchemy.com/v2/utMr7YLZtnhmRySXim_DuF5QMl0HBwdA'));

let value;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://zerodao.com/">
        zeroDAO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const rawCalculateETH = async (props, amount) => {
  console.log("PROPS.CONTRACT", props.contract);
  if (!props.contract) {
    return 0;
  }
  const res = await props.contract.methods.get_dy(1, 2, amount).call();
  return res;
};
window.submitProps = null;
var calculateEth = _.debounce(
  (amount) => rawCalculateETH(window.submitProps, amount),
  { wait: 100 }
);
const contract = new ethers.Contract('0x960ea3e3C7FB317332d990873d354E18d7645590', [ 'function get_dy(uint256, uint256, uint256) view returns (uint256)' ], getContract('ZeroController').provider);
export default function Submit(props) {
  const [address, setAddress] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [ratio, setRatio] = React.useState(0);
  const [ ethPrice, setETHPrice ] = React.useState('0');
  const [eth, setETH] = React.useState(0);
  const [renBTC, setrenBTC] = React.useState(0);
  React.useEffect(async () => {
    const listener = async () => {
      try {
        setETHPrice((await contract.get_dy(1, 2, ethers.utils.parseUnits('1', 8))).toString());
      } catch (e) {
        console.error(e);
      }
    };
    listener().catch((err) => console.error(err));
    contract.provider.on('block', listener);
    return () => contract.provder.removeListener('block', listener);
  });
	const ln = (v) => ((console.log(ethers.utils.formatEther(v))), v);
  const updateAmounts = async () => {
    setrenBTC(ethers.utils.formatUnits(ln(ethers.utils.parseEther('1').sub(ethers.BigNumber.from(String(ratio)).mul(ethers.utils.parseEther('0.01')))).mul(ethers.utils.parseUnits(String(amount), 8)).div(ethers.utils.parseEther('1')), 8));
    setETH(ethers.utils.formatEther(ethers.BigNumber.from(String(ratio)).mul(ethers.utils.parseEther('0.01')).mul(ethers.utils.parseUnits(String(amount), 8).mul(ethPrice)).div(ethers.utils.parseEther('1', 18)).div(ethers.utils.parseUnits('1', 8))));
  };
  React.useEffect(updateAmounts, [ amount, ethPrice, ratio ]);
  const updateSlider = async (event) => {
    setAmount(event.target.value);
  };

  const getSigner = async () => {
    const ethProvider = new ethers.providers.Web3Provider(web3.currentProvider);
    await ethProvider.send("eth_requestAccounts", []);
    const signer = await ethProvider.getSigner();
    return signer
  }

  const signRequest = async (signer, transferRequest) => {
    await transferRequest.sign(signer, controller.address);
    const gateway = await transferRequest.toGatewayAddress();
    setAddress(gateway);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = ethers.utils.defaultAbiCoder.encode(
      ["uint256"],
      [ethers.utils.parseEther(String(Number(event.target[0].value) / 100 * ratio))]
    );

    console.log("AMT", event.target[0].value)
    console.log("ETH AMT", event.target[0].value / 100 * ratio)

    const transferRequest = new TransferRequest({ 
      to: connectedWallet,
      underwriter: trivialUnderwriter,
      module: zeroModule,
      asset,
      amount: event.target[0].value,
      data: String(data),
    });


    transferRequest.setUnderwriter(trivialUnderwriter);
    getSigner().then(signer => signRequest(signer, transferRequest));
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5"></Typography>
          <p>{address && `Deposit Address: ${address}`}</p>
          <Box
            component="form"
            onSubmit={handleSubmit}
            onChange={(evt) => setAmount(evt.target.value)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="BTC Amount"
	      onChange={ (evt) => setAmount(evt.target.value) }
              name="amount"
              color="success"
              autoFocus
            />
            <p>ETH-renBTC ratio</p>
            <Slider
              aria-label="Ratio"
              value={ratio}
              valueLabelDisplay="on"
              onChange={(evt) => setRatio(evt.target.value)}
            />
            <p>{`ETH: ${eth}`}</p>
            <p>{`renBTC: ${renBTC}`}</p>
            <p>value: {amount}</p>
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
