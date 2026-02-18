import { ethers } from "ethers";

export const BOOKING_CONTRACT_ADDRESS =
  "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

export const BOOKING_ABI = [
  "function createBooking(string details)",
  "function getTotalBookings() view returns (uint256)",
  "function getBooking(uint256 index) view returns (address, string, uint256)"
];

export function getBookingContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(
    BOOKING_CONTRACT_ADDRESS,
    BOOKING_ABI,
    signer
  );
}
