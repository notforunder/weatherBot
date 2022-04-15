"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Event_1 = require("../struct/Event");
exports.default = new Event_1.Event("messageCreate", async (message) => {
    if (message.author.bot)
        return;
    const prefix = __1.client.BOT_PREFIX;
    const command = message.content.slice(prefix?.length).split(" ")[0];
    const commandHandler = __1.client.commands.get(command);
    if (!commandHandler) {
        return;
    }
    commandHandler.run({
        client: __1.client,
        message: message,
    });
});
