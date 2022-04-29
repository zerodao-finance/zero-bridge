import { computeTransferOutput } from "zero-protocol/lib/badger";
import { ethers } from "ethers";
import fixtures from "zero-protocol/lib/fixtures";

function formatOutput(output, token) {
  switch (token) {
    case "USDC":
      return ethers.utils.formatUnits(output, 6);
    default:
      return ethers.utils.formatUnits(output, 8);
  }
}

function useTransferFees() {
  async function getTransferOutput({ token, amount }) {
    const input = {
      module: fixtures.ETHEREUM[token],
      amount: ethers.utils.parseUnits(amount, 8),
    };
    let output = await computeTransferOutput(input);
    output = formatOutput(output, token);
    return output;
  }

  return {
    getTransferOutput,
  };
}

export default useTransferFees;
