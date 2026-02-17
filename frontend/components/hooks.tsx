import { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingABI from "@/services/VotingABI.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Candidate {
  id: number;
  name: string;
  party?: string;
}

export const useElection = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, VotingABI, signer);
  };

  const loadElectionData = async () => {
    try {
      const contract = await getContract();

      const candidateCount = await contract.getCandidateCount();
      const fetched: Candidate[] = [];

      for (let i = 1; i <= candidateCount; i++) {
        const c = await contract.candidates(i);
        fetched.push({
          id: Number(c.id),
          name: c.name,
          party: c.party,
        });
      }

      const voterAddress = await contract.signer.getAddress();
      const voted = await contract.hasVoted(voterAddress);

      setCandidates(fetched);
      setHasVoted(voted);
    } catch (err) {
      console.error("Failed to load election data", err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (candidateId: number) => {
    const contract = await getContract();
    const tx = await contract.vote(candidateId);
    await tx.wait();
    setHasVoted(true);
  };

  useEffect(() => {
    if (window.ethereum) {
      loadElectionData();
    }
  }, []);

  return {
    candidates,
    hasVoted,
    vote,
    loading,
  };
};
