import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0x4493314e5bde4dad14a902a126973cac90fa26e1b4921aeb6645cb647eee8176"
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