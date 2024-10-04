import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { viewMessages} from "@/view-functions/viewMessages";

const MODULE_ADDRESS = "0xc17bf48d3bd22cc4a1dbb432445d2701d4c18dd7adda12852c250e130a81b648"
const MODULE_NAME = "billboard"

const ViewMessages = () => {
  const { account } = useWallet();
  const [messages, setMessages] = useState<Array<{ sender: string; message: string; added_at: Date }>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      async function getMessages() {
        setLoading(true);
        const messages = await fetchMessages();
        setMessages(messages);
        setLoading(false);
      }

    getMessages();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }

    return (
       <div className="flex flex-col gap-6">
            <h4 className="text-lg font-medium">Messages</h4>
            {messages.length === 0 ? (
              <p>No messages available</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="p-4 border rounded">
                  <div className="font-bold">{msg.sender}</div>
                  <div>{msg.message}</div>
                  <div className="text-sm text-gray-500">{msg.added_at.toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
    );
};
export default ViewMessages;
