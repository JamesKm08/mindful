import { aptosClient } from "@/utils/aptosClient";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";

const MODULE_ADDRESS = "0xef42aa6a2dad0b6d2aeb58624efb9defead0bc59c80bba9c4e965a2b6288196e";
const MODULE_NAME = "mindful";

export const viewMeetings = async () => {
    if (!account) return [];

    try {
        const response = await aptosClient().getAccountResource(
               `${MODULE_ADDRESS}::${MODULE_NAME}::Mindful`
             );

        const { data } = response as any;
        return data.meetings.map((msg: any) => ({
           alcohol_anon: msg.alcohol_anon,
           gambler_anon: msg.gambler_anon,
           }));
        } catch (error) {
            console.error("Failed to fetch meetings", error);
            return [];
           }
};

