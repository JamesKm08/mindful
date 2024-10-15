import React from 'react';
import { WalletSelector } from "./WalletSelector";
import { ViewMeetings } from "@/components/ViewMeetings";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function Header() {
  const { connected } = useWallet();

  return (
    <header className="bg-white shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap">
        <h1 className="text-2xl font-bold text-gray-800">Mindful</h1>
        <div className="flex gap-2 items-center flex-wrap">
          <WalletSelector />
          {connected && <ViewMeetings />}
        </div>
      </div>
    </header>
  );
}