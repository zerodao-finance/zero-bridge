import {
  computeOutputBTC,
  getConvertedAmount,
  applyFee,
} from "zero-protocol/lib/badger";
import { ethers } from "ethers";
import fixtures from "zero-protocol/lib/fixtures";

function processAmount(amount, token) {
  switch (token) {
    case "ETH":
      return ethers.utils.parseEther(amount);
    case "USDC":
      return ethers.utils.parseUnits(amount, 6);
    case "ETH":
      return ethers.utils.parseEther(amount);
    default:
      return ethers.utils.parseUnits(amount, 8);
  }
}

function formatOutput(output) {
  return ethers.utils.formatUnits(output, 8);
}

export async function getBurnOutput({ amount, token }) {
  const input = {
    asset:
      token === "ETH" ? ethers.constants.AddressZero : fixtures.ETHEREUM[token],
    amount: processAmount(amount, token),
  };
  let output = await computeOutputBTC(input);
  output = formatOutput(output);
  return output;
}
