import { ethers } from "ethers";
export const NETWORK_ROUTER = {
  137: {
    name: "Polygon",
    swap_address: "0x751B1e21756bDbc307CBcC5085c042a0e9AaEf36",
  },
  42161: {
    name: "Arbitrum",
    swap_address: "0x960ea3e3C7FB317332d990873d354E18d7645590",
  },
  1: {
    name: "Mainnet",
    swap_address: ethers.constants.AddressZero,
  },
};
