import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0x222268ac20a4e051781c0b6bfedd13432880dd69ddb750b169be4b2650c8d395";

// Fetching the function from the smart contract
export const viewMessages = async (): Promise<Array<{ sender: string; message: string; added_at: u64 }>> => {
  const response = await aptosClient()
    .view<[Array<{ sender: string; message: string; added_at: u64 }>]>({
      payload: {
        function: `${MODULE_ADDRESS}::mindful::get_messages`,
      },
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return response[0];
};