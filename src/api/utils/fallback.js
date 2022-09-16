import { ethers } from "ethers";
import deployments from "@zerodao/protocol";
import { FIXTURES } from "@zerodao/sdk";

const renZECController = ethers.utils.getAddress(
  deployments["1"]["mainnet"]["contracts"]["RenZECController"].address
);

const getRenBTCAddress = async (signer) => {
  const { chainId } = await signer.provider.getNetwork();
  return FIXTURES[
    (() => {
      switch (Number(chainId)) {
        case 1:
          return "ETHEREUM";
        case 42161:
          return "ARBITRUM";
        case 137:
          return "MATIC";
        case 43114:
          return "AVALANCHE";
        case 10:
          return "OPTIMISM";
      }
    })()
  ].renBTC;
};

export const fallbackMint = async (request, signer) => {
  try {
    request.getController = async () =>
      new ethers.Contract(
        request.contractAddress,
        [
          "function fallbackMint(address, address, address, uint256, uint256, uint256, address, bytes32, bytes, bytes)",
        ],
        signer
      );
    request.asset =
      ethers.utils.getAddress(request.contractAddress) == renZECController
        ? FIXTURES.ETHEREUM.renZEC
        : await getRenBTCAddress(signer);
    const address = await signer.getAddress();
    request.destination = () => address;
    await request.fallbackMint(signer);
  } catch (error) {
    console.error("error running fallback mint", error);
  }
};
