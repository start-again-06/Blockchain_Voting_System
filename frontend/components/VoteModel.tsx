import { useState } from "react";

interface VoteModalProps {
  isOpen: boolean;
  candidateName: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

const VoteModal = ({
  isOpen,
  candidateName,
  onConfirm,
  onClose,
}: VoteModalProps) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Confirm Your Vote</h2>

        <p className="mt-4 text-sm text-gray-700">
          You are about to vote for:
        </p>

        <p className="mt-2 text-lg font-medium">
          {candidateName}
        </p>

        <p className="mt-4 text-xs text-gray-500">
          This action is final and cannot be changed.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="rounded-lg bg-black px-5 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Confirm Vote"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
