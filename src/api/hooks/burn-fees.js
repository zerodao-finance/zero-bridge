import { computeOutputBTC } from "zero-protocol/lib/badger";
import { ethers } from "ethers";
import fixtures from "zero-protocol/lib/fixtures";

function processAmount(amount, token) {
  switch (token) {
    case "USDC":
      return ethers.utils.parseUnits(amount, 6);
      break;
    case "ETH":
      return ethers.utils.parseEther(amount);
    default:
      return ethers.utils.parseUnits(amount, 8);
  }
}

function formatOutput(output) {
  return ethers.utils.formatUnits(output, 8);
}

function useBurnFees() {
  async function getBurnOutput({ amount, token }) {
    const input = {
      asset: fixtures.ETHEREUM[token],
      amount: processAmount(amount, token),
    };
    let output = await computeOutputBTC(input);
    output = formatOutput(output);
    return output;
  }

  return {
    getBurnOutput,
  };
}

export default useBurnFees;
