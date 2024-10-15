import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

const MODULE_ADDRESS = "0x222268ac20a4e051781c0b6bfedd13432880dd69ddb750b169be4b2650c8d395"

export type WriteMessageArguments = {
  content: string;
};

export const writeMessage = (args: WriteMessageArguments): InputTransactionData => {
  const { content } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::mindful::add_message`,
      functionArguments: [content],
    },
  };
};
