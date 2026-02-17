import { useState } from "react";
import CandidateCard from "@/components/CandidateCard";
import VoteModal from "@/components/VoteModal";
import Navbar from "@/components/Navbar";

interface Candidate {
  id: number;
  name: string;
  party?: string;
}

const mockCandidates: Candidate[] = [
  { id: 1, name: "Candidate A", party: "Independent" },
  { id: 2, name: "Candidate B", party: "Progressive" },
];

export default function VotePage() {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleVoteClick = (candidate: Candidate) => {
    if (hasVoted) return;
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const submitVote = async () => {
    console.log("Vote submitted for:", selectedCandidate?.name);

    setHasVoted(true);
    setShowModal(false);
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-semibold">Cast Your Vote</h1>
        <p className="mt-2 text-sm text-gray-600">
          You may vote only once. This action is irreversible.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {mockCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              {...candidate}
              disabled={hasVoted}
              onVote={() => handleVoteClick(candidate)}
            />
          ))}
        </div>

        <VoteModal
          isOpen={showModal}
          candidateName={selectedCandidate?.name || ""}
          onConfirm={submitVote}
          onClose={() => setShowModal(false)}
        />
      </main>
    </>
  );
}
