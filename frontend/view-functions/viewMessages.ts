import { aptosClient } from "@/utils/aptosClient";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";

const MODULE_ADDRESS = "0xef42aa6a2dad0b6d2aeb58624efb9defead0bc59c80bba9c4e965a2b6288196e";
const MODULE_NAME = "mindful";

export const viewMessages = async (): Promise<string> => {
  const content = await aptosClient()
    .view<[string]>({
      payload: {
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_messages`,
      },
    })
    .catch((error) => {
      console.error(error);
      return ["Messages do not exist"];
    });

  return content[0];
};

