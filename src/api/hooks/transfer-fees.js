import {
  computeTransferOutput,
  toUSDC,
  renBTCToETH,
  renCrv,
  mintFee,
  applyFee,
  applyRenVMMintFee,
} from "zero-protocol/lib/badger";
import { ethers } from "ethers";
import fixtures from "zero-protocol/lib/fixtures";

function formatOutput(output, token) {
  switch (token) {
    case "ETH":
      return ethers.utils.formatEther(output);
    case "USDC":
      return ethers.utils.formatUnits(output, 6);
    default:
      return ethers.utils.formatUnits(output, 8);
  }
}

export async function getFeeBreakdown({ token, amount }) {
  const baseFee = applyRenVMMintFee(ethers.utils.parseUnits(amount, 8));
  var fees = await applyFee(baseFee, mintFee, 0);
  console.log("AFTER SUB: " + baseFee.sub(fees.totalFees));
  const tokenAddress =
    token === "ETH" ? ethers.constants.AddressZero : fixtures.ETHEREUM[token];

  switch (tokenAddress) {
    case fixtures.ETHEREUM.WBTC:
      fees.gasFee = formatOutput(await toUSDC(fees.gasFee), token);
      fees.mintFee = formatOutput(await toUSDC(fees.mintFee), token);
      fees.totalFees = formatOutput(await toUSDC(fees.totalFees), token);
      console.log("THEORY TOTAL FEE: " + fees.totalFees);
      return fees;
    case fixtures.ETHEREUM.WBTC:
      fees.gasFee = formatOutput(
        await renCrv.get_dy(0, 1, fees.gasFee, 1),
        token
      );
      fees.mintFee = formatOutput(
        await renCrv.get_dy(0, 1, fees.mintFee, 1),
        token
      );
      fees.totalFees = formatOutput(
        await renCrv.get_dy(0, 1, fees.totalFees, 1),
        token
      );
      console.log("THEORY TOTAL FEE: " + fees.totalFees);
      return fees;
    case ethers.constants.AddressZero:
      fees.gasFee = formatOutput(await renBTCToETH(fees.gasFee), token);
      fees.mintFee = formatOutput(await renBTCToETH(fees.mintFee), token);
      fees.totalFees = formatOutput(await renBTCToETH(fees.totalFees), token);
      console.log("THEORY TOTAL FEE: " + fees.totalFees);
      return fees;
    default:
      fees.gasFee = formatOutput(fees.gasFee, token);
      fees.mintFee = formatOutput(fees.mintFee, token);
      fees.totalFees = formatOutput(fees.totalFees, token);
      console.log("THEORY TOTAL FEE: " + fees.totalFees);
      return fees;
  }
}

export async function getTransferOutput({ token, amount }) {
  const input = {
    module:
      token === "ETH" ? ethers.constants.AddressZero : fixtures.ETHEREUM[token],
    amount: ethers.utils.parseUnits(amount, 8),
  };
  let output = await computeTransferOutput(input);
  output = formatOutput(output, token);
  return output;
}
