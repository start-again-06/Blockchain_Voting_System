import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ethers } from "ethers";
import VotingABI from "@/services/VotingABI.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export default function AdminPage() {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [status, setStatus] = useState("");

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, VotingABI, signer);
  };

  const addCandidate = async () => {
    const contract = await getContract();
    await contract.addCandidate(name, party);
    setName("");
    setParty("");
  };

  const startElection = async () => {
    const contract = await getContract();
    await contract.startElection();
    setStatus("Election started");
  };

  const endElection = async () => {
    const contract = await getContract();
    await contract.endElection();
    setStatus("Election ended");
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <div className="mt-6 space-y-4">
          <input
            className="w-full rounded border p-2"
            placeholder="Candidate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full rounded border p-2"
            placeholder="Party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
          />

          <button
            onClick={addCandidate}
            className="w-full rounded bg-black py-2 text-white"
          >
            Add Candidate
          </button>

          <button
            onClick={startElection}
            className="w-full rounded bg-green-600 py-2 text-white"
          >
            Start Election
          </button>

          <button
            onClick={endElection}
            className="w-full rounded bg-red-600 py-2 text-white"
          >
            End Election
          </button>

          {status && (
            <p className="text-center text-sm text-gray-600">{status}</p>
          )}
        </div>
      </main>
    </>
  );
}
