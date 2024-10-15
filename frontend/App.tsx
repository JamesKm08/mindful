import React from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { PostMessage } from "@/components/PostMessage";
import { ViewMessages } from "@/components/ViewMessages";
import { ViewTherapists } from "@/components/ViewTherapists";

function App() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Header />
      <div className="flex max-w-screen-xl mx-auto px-4 py-6 gap-6">
        <div className="flex-grow">
          {connected ? (
            <Card>
              <CardContent className="flex flex-col gap-10 pt-6">
                <PostMessage />
                <ViewMessages />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>To get started Connect a wallet</CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>
        {connected && (
          <div className="w-1/3 max-w-md">
            <ViewTherapists />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;