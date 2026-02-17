const hre = require("hardhat");

async function main() {
  const BookingContract = await hre.ethers.getContractFactory("BookingContract");
  const bookingContract = await BookingContract.deploy();
  await bookingContract.waitForDeployment();

  console.log("BookingContract deployed to:", await bookingContract.getAddress());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
