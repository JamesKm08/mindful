import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { writeMessage } from "@/entry-functions/writeMessage";

export function PostMessage() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [messageContent, setMessageContent] = useState<string>();
  const [newMessageContent, setNewMessageContent] = useState<string>();

  const onClickButton = async () => {
    if (!account || !newMessageContent) {
      return;
    }

    try {
      const committedTransaction = await signAndSubmitTransaction(
        writeMessage({
          content: newMessageContent,
        }),
      );
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
      });

    setNewMessageContent("")

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Hello you mindful human being</h4>
      New message{" "}
      <Input disabled={!account} placeholder="What's on your mind?" value ={newMessageContent} onChange={(e) => setNewMessageContent(e.target.value)} />
      <Button
        disabled={!account || !newMessageContent || newMessageContent.length === 0 || newMessageContent.length > 100}
        onClick={onClickButton}
      >
        Share
      </Button>
    </div>
  );
}
