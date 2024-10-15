import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0x222268ac20a4e051781c0b6bfedd13432880dd69ddb750b169be4b2650c8d395"

// Fetching the function from the smart contract
export const getMeetingLinks = async (): Promise<{ alcoholAnon: string; gamblerAnon: string }> => {
      const response = await aptosClient()
      .view<[String, String]>({
          payload: {
              function: `${MODULE_ADDRESS}::mindful::get_meeting_links`,
          },
      })
  .catch((error) => {
      console.error(error);
      return { alcoholAnon: "", gamblerAnon: "" };
      });

  return {
      alcoholAnon: response[0] as string,
      gamblerAnon: response[1] as string,
      };
};