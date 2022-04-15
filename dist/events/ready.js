"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../struct/Event");
const __1 = require("..");
exports.default = new Event_1.Event("ready", async () => {
    console.log(`[READY] ${__1.client.user?.tag}`);
});
