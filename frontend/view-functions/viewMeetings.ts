import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0xef42aa6a2dad0b6d2aeb58624efb9defead0bc59c80bba9c4e965a2b6288196e"
const MODULE_NAME = "mindful"

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