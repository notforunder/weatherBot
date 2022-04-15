import { Event } from "../struct/Event";
import { client } from "..";

export default new Event("ready", async () => {
    console.log(`[READY] ${client.user?.tag}`);
});