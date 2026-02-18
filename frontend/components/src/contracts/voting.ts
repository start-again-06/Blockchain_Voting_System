import { ethers } from "ethers";

export const VOTING_CONTRACT_ADDRESS =
  "PASTE_DEPLOYED_ADDRESS_HERE";

export const VOTING_ABI = [
  "function vote(uint256 candidateIndex)",
  "function getCandidate(uint256 index) view returns (string, uint256)",
  "function getTotalCandidates() view returns (uint256)",
  "function hasVoted(address) view returns (bool)"
];

export async function getVotingContract() {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    VOTING_CONTRACT_ADDRESS,
    VOTING_ABI,
    signer
  );
}
