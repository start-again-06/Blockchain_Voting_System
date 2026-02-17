import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletButtonProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const WalletButton = ({ onConnect, onDisconnect }: WalletButtonProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to vote");
        return;
      }

      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      onConnect?.(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed", err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onDisconnect?.();
  };

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) setAccount(accounts[0]);
    });

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setAccount(accounts.length > 0 ? accounts[0] : null);
    });

    return () => {
      window.ethereum?.removeAllListeners("accountsChanged");
    };
  }, []);

  if (account) {
    return (
      <div className="flex items-center gap-3">
        <span className="rounded bg-gray-100 px-3 py-1 text-sm">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
        <button
          onClick={disconnectWallet}
          className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className="rounded bg-black px-5 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
