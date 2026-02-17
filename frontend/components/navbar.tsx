import Link from "next/link";
import WalletButton from "./WalletButton";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Decentralized Voting
        </Link>

        {/* Navigation */}
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
        <WalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
