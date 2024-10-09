import { MODULE_ADDRESS } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";

const MODULE_ADDRESS = "0xef42aa6a2dad0b6d2aeb58624efb9defead0bc59c80bba9c4e965a2b6288196e"
const MODULE_NAME = "mindful"

interface MeetingLinks {
  alcoholAnon: string;
  gamblerAnon: string;
}

export const getMeetingLinks = async (): Promise<MeetingLinks> => {
  try {
    const response = await aptosClient().view({
      function: `${MODULE_ADDRESS}::mindful::get_meeting_links`,
      type_arguments: [],
      arguments: [],
    });

    return {
      alcoholAnon: response[0] as string,
      gamblerAnon: response[1]as string,
    };
  } catch (error) {
    console.error("Error fetching meeting links:", error);
    return {
      alcoholAnon: "",
      gamblerAnon: "",
    };
  }
};