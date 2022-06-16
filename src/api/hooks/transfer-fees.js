import { ethers } from "ethers";
import fixtures from "zero-protocol/lib/fixtures";
import { makeCompute } from "zero-protocol/lib/badger";

const { computeTransferOutput, applyFee } = makeCompute("1");

function formatOutput(token, output) {
  switch (token) {
    case "USDC":
      return ethers.utils.formatUnits(output, 6);
    case "ETH":
      return ethers.utils.formatEther(output);
    default:
      return ethers.utils.formatUnits(output, 8);
  }
}

export async function getFeeBreakdown({ token, amount }) {
  const baseFee = applyRenVMMintFee(ethers.utils.parseUnits(amount, 8));
  var fees = await applyFee(baseFee, mintFee, 0);

  fees.gasFee = formatOutput("WBTC", fees.gasFee);
  fees.opFee = formatOutput("WBTC", fees.opFee);
  fees.totalFees = formatOutput("WBTC", fees.totalFees);
  return fees;
}

export async function getTransferOutput({ token, amount }) {
  const input = {
    module:
      token === "ETH" ? ethers.constants.AddressZero : fixtures.ETHEREUM[token],
    amount: ethers.utils.parseUnits(amount, 8),
  };
  let output = await computeTransferOutput(input);
  output = formatOutput(token, output);
  return output;
}
