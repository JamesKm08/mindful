import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0x4493314e5bde4dad14a902a126973cac90fa26e1b4921aeb6645cb647eee8176";
const MODULE_NAME = "mindful";

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