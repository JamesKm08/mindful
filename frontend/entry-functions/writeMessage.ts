import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const MODULE_ADDRESS = "0x4493314e5bde4dad14a902a126973cac90fa26e1b4921aeb6645cb647eee8176"
const MODULE_NAME = "mindful"

export type WriteMessageArguments = {
  content: string;
};

export const writeMessage = (args: WriteMessageArguments): InputTransactionData => {
  const { content } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::add_message`,
      functionArguments: [content],
    },
  };
};
