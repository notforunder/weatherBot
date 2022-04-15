"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../struct/Commands");
exports.default = new Commands_1.Command({
    name: "ping",
    run: async ({ message }) => {
        message.channel.send('pong');
    }
});
