"use client";

import { useEffect, useState } from "react";
import { getVotingContract } from "@/contracts/voting";

export default function VotingPanel() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadCandidates() {
    const contract = await getVotingContract();
    const total = await contract.getTotalCandidates();

    const list = [];
    for (let i = 0; i < total; i++) {
      const [name, votes] = await contract.getCandidate(i);
      list.push({ name, votes, index: i });
    }
    setCandidates(list);
  }

  async function vote(index: number) {
    try {
      setLoading(true);
      const contract = await getVotingContract();
      const tx = await contract.vote(index);
      await tx.wait();
      await loadCandidates();
      alert("Vote recorded");
    } catch (err: any) {
      alert(err.reason || "Voting failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCandidates();
  }, []);

  return (
    <div className="space-y-4">
      {candidates.map((c) => (
        <div key={c.index} className="border p-4 rounded">
          <h2 className="font-bold">{c.name}</h2>
          <p>Votes: {c.votes.toString()}</p>
          <button
            disabled={loading}
            onClick={() => vote(c.index)}
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
          >
            Vote
          </button>
        </div>
      ))}
    </div>
  );
}
