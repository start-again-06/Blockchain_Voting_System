import { useState } from "react";
import Navbar from "@/components/Navbar";
import CandidateCard from "@/components/CandidateCard";
import VoteModal from "@/components/VoteModal";
import { useElection, Candidate } from "@/hooks/useElection";

export default function VotePage() {
  const { candidates, hasVoted, vote, loading } = useElection();
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <p className="p-6">Loading election...</p>;
  }

  const handleVoteClick = (candidate: Candidate) => {
    setSelected(candidate);
    setShowModal(true);
  };

  const submitVote = async () => {
    if (!selected) return;
    await vote(selected.id);
    setShowModal(false);
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-semibold">Cast Your Vote</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              {...c}
              disabled={hasVoted}
              onVote={() => handleVoteClick(c)}
            />
          ))}
        </div>

        <VoteModal
          isOpen={showModal}
          candidateName={selected?.name || ""}
          onConfirm={submitVote}
          onClose={() => setShowModal(false)}
        />
      </main>
    </>
  );
}
