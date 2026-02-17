import Link from "next/link";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Navbar = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to continue");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) setAccount(accounts[0]);
    });

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setAccount(accounts.length > 0 ? accounts[0] : null);
    });
  }, []);

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Decentralized Voting
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/election" className="text-gray-700 hover:text-black">
            Election
          </Link>
          <Link href="/vote" className="text-gray-700 hover:text-black">
            Vote
          </Link>
          <Link href="/result" className="text-gray-700 hover:text-black">
            Results
          </Link>
        </div>

        {/* Wallet */}
        <div>
          {account ? (
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
          ) : (
            <button
              onClick={connectWallet}
              className="rounded bg-black px-5 py-2 text-sm text-white hover:bg-gray-800"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
