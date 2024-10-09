import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { writeMessage } from "@/entry-functions/writeMessage";
import { useQueryClient } from "@tanstack/react-query";

export function PostMessage() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [newMessageContent, setNewMessageContent] = useState<string>("");
  const queryClient = useQueryClient();

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

      setNewMessageContent("");

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post message.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Hello you mindful human being</h4>
      <div className="flex flex-col gap-2">
        <label htmlFor="newMessage" className="text-sm font-medium">
          New message
        </label>
        <Input
          id="newMessage"
          disabled={!account}
          placeholder="What's on your mind?"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />
      </div>
      <Button
        disabled={!account || !newMessageContent || newMessageContent.length === 0 || newMessageContent.length > 100}
        onClick={onClickButton}
      >
        Share
      </Button>
    </div>
  );
}