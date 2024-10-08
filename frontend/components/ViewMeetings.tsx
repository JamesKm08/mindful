import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { aptosClient } from "@/utils/aptosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { viewMeetings} from "@/view-functions/viewMeetings";

const MODULE_ADDRESS = "0xef42aa6a2dad0b6d2aeb58624efb9defead0bc59c80bba9c4e965a2b6288196e";
const MODULE_NAME = "mindful";

const ViewMeetings = () => {
  const { account } = useWallet();
  const [meetings, setMeetings] = useState<Array<{ alcohol_anon: string; gambler_anon: string}>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      async function getMeetings() {
        setLoading(true);
        const messages = await fetchMeetings();
        setMeetings(meetings);
        setLoading(false);
      }

    getMeetings();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }

    return (
       <div className="flex flex-col gap-6">
            <h4 className="text-lg font-medium">Meetings</h4>
            {messages.length === 0 ? (
              <p>No meetings available</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="p-4 border rounded">
                  <div className="font-bold">{msg.alcohol_anon}</div>
                  <div className="font-bold">{msg.gambler_anon}</div>

                </div>
              ))
            )}
          </div>
    );
};
export default ViewMeetings;
