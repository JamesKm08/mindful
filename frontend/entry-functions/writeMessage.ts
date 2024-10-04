import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const MODULE_ADDRESS = "0xc17bf48d3bd22cc4a1dbb432445d2701d4c18dd7adda12852c250e130a81b648"
const MODULE_NAME = "billboard"

export type WriteMessageArguments = {
  content: string; // the content of the message
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
