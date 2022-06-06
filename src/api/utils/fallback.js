import { ethers } from "ethers";

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

    await request.fallbackMint(signer);
  } catch (error) {
    console.error("error running fallback mint");
  }
};
