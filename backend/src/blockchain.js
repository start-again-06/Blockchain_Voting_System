const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const ABI = [
  "function getTotalCandidates() view returns (uint256)",
  "function getCandidate(uint256) view returns (string,uint256)"
];

const contract = new ethers.Contract(
  process.env.VOTING_CONTRACT_ADDRESS,
  ABI,
  provider
);

async function fetchResults() {
  const total = await contract.getTotalCandidates();
  const results = [];

  for (let i = 0; i < total; i++) {
    const [name, votes] = await contract.getCandidate(i);
    results.push({
      name,
      votes: Number(votes)
    });
  }

  return results;
}

module.exports = { fetchResults };
