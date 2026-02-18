"use client";

import { ethers } from "ethers";
import { getBookingContract } from "@/contracts/booking";
import { useState } from "react";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);

  async function handleBooking() {
    try {
      setLoading(true);

      const contract = await getBookingContract();

      const tx = await contract.createBooking("Appointment", {
        value: ethers.parseEther("0.01"),
      });

      await tx.wait();

      alert("Booking successful!");
    } catch (error: any) {
      console.error(error);
      alert(error?.reason || "Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBooking}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? "Processing..." : "Book Appointment"}
    </button>
  );
}
