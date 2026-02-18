"use client";

import { useEffect, useState } from "react";
import { getVotingContract } from "@/contracts/voting";

type Candidate = {
  name: string;
  votes: number;
};

export default function LiveResults() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchResults() {
    try {
      const contract = await getVotingContract();
      const total = await contract.getTotalCandidates();

      const results: Candidate[] = [];

      for (let i = 0; i < total; i++) {
        const [name, voteCount] = await contract.getCandidate(i);
        results.push({
          name,
          votes: Number(voteCount),
        });
      }

      setCandidates(results);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResults();

    const interval = setInterval(fetchResults, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading live results...</p>;
  }

  return (
    <div className="space-y-4">
      {candidates.map((c, index) => (
        <div
          key={index}
          className="border rounded p-4 flex justify-between items-center"
        >
          <span className="font-semibold">{c.name}</span>
          <span className="text-lg font-bold">{c.votes} votes</span>
        </div>
      ))}
    </div>
  );
}
