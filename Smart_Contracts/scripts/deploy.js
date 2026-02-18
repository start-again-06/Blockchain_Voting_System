const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("VotingContract");

  const voting = await Voting.deploy([
    "Alice",
    "Bob",
    "Charlie"
  ]);

  await voting.waitForDeployment();

  console.log("VotingContract deployed to:", await voting.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
