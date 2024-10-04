import { aptosClient } from "@/utils/aptosClient";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";

const MODULE_ADDRESS = "0xc17bf48d3bd22cc4a1dbb432445d2701d4c18dd7adda12852c250e130a81b648";
const MODULE_NAME = "billboard";

export const viewMessages = async () => {
    if (!account) return [];

    try {
        const response = await aptosClient().getAccountResource(
               `${MODULE_ADDRESS}::${MODULE_NAME}::Billboard`
             );

        const { data } = response as any;
        return data.messages.map((msg: any) => ({
           sender: msg.sender,
           message: msg.message,
           added_at: new Date(msg.added_at * 1000),
           }));
        } catch (error) {
            console.error("Failed to fetch messages", error);
            return [];
           }
};

