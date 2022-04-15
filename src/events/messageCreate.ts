import { Message } from "discord.js";
import { client } from "..";
import { Event } from "../struct/Event";

export default new Event("messageCreate", async (message) => {
    if(message.author.bot) return;

    const prefix = client.BOT_PREFIX;

    const command = message.content.slice(prefix?.length).split(" ")[0];
    const commandHandler = client.commands.get(command);

    if(!commandHandler) {
        return;
    }

    commandHandler.run({
        client,
        message: message as Message,
    });
})