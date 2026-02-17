interface CandidateCardProps {
  id: number;
  name: string;
  party: string;
  description: string;
  disabled: boolean;
  onVote: (candidateId: number) => void;
}

const CandidateCard = ({
  id,
  name,
  party,
  description,
  disabled = false,
  onVote,
}: CandidateCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-semibold">{name}</h3>

      {party && (
        <p className="mt-1 text-sm text-gray-600">
          {party}
        </p>
      )}

      {description && (
        <p className="mt-3 text-sm text-gray-700">
          {description}
        </p>
      )}

      <button
        onClick={() => onVote(id)}
        disabled={disabled}
        className={`mt-5 w-full rounded-lg px-4 py-2 text-sm font-medium text-white
          ${
            disabled
              ? "cursor-not-allowed bg-gray-400"
              : "bg-black hover:bg-gray-800"
          }
        `}
      >
        {disabled ? "Vote Submitted" : "Vote"}
      </button>
    </div>
  );
};

export default CandidateCard;
