import {
  TransferRequest,
  UnderwriterTransferRequest,
} from "zero-protocol/dist/lib/zero";
import { ethers } from "ethers";

async function fallbackMint(request, signer) {
  try {
    request.getController = async () =>
      new ethers.Contract(
        request.contractAddress,
        [
          "function fallbackMint(address, address, address, uint256, uint256, uint256, address, bytes32, bytes, bytes)",
        ],
        signer
      );

    const tx = await request.fallbackMint(signer);
    console.log("falling back");
    console.log(await tx.wait());
  } catch (error) {
    console.error("error running fallback mint");
  }
}

export { fallbackMint };
