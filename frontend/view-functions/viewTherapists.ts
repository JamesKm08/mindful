import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0x222268ac20a4e051781c0b6bfedd13432880dd69ddb750b169be4b2650c8d395";


// Fetching the function from the smart contract
export const viewTherapists = async (): Promise<Array<{ name: string; area_of_work: string; photo: string; number: u64 }>> => {
  const response = await aptosClient()
    .view<[Array<{ name: string; area_of_work: string; photo: string; number: u64 }>]>({
      payload: {
        function: `${MODULE_ADDRESS}::mindful::get_therapists`,
      },
    })
    .catch((error) => {
      console.error(error);
      return [];
    });

  return response[0];
};