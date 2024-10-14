import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { viewMessages } from "@/view-functions/viewMessages";
import { Trash } from "react-bootstrap-icons"

export function ViewMessages() {
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages'],
    queryFn: viewMessages,
    onError: (error: any) => {
      console.error("Query error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load messages: " + (error.message || "Unknown error"),
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (!messages) return <div>No messages available</div>;

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Messages</h4>
      {messages.length === 0 ? (
        <p>No messages available</p>
      ) : (
        messages.map((msg, index) => (
           <div key={index} className="p-4 border rounded flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-bold">{msg.sender}</div>
                  <div>{msg.message}</div>
                  <div className="text-sm text-gray-500">{new Date(msg.added_at * 1000).toLocaleString()}</div>
                </div>
                <button onClick={() => handleDeleteMessage(msg.sender, msg.message)}>
                 <Trash className="h-5 w-5 text-red-500" />
                </button>
              </div>
        ))
      )}
    </div>
  );
}