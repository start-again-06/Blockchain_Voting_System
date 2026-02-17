import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { ethers } from "ethers";
import VotingABI from "@/services/VotingABI.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

interface Result {
  name: string;
  votes: number;
}

export default function ResultPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const loadResults = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, provider);

      const count = await contract.getCandidateCount();
      const data: Result[] = [];

      for (let i = 1; i <= count; i++) {
        const c = await contract.candidates(i);
        data.push({
          name: c.name,
          votes: Number(c.voteCount),
        });
      }

      setResults(data);
    } catch (err) {
      console.error("Failed to load results", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-semibold">Election Results</h1>

        {loading ? (
          <p className="mt-4">Loading results...</p>
        ) : (
          <div className="mt-6 space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border p-4"
              >
                <span>{r.name}</span>
                <span className="font-semibold">{r.votes} votes</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
