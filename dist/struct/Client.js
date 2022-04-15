"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherClient = void 0;
const discord_js_1 = require("discord.js");
const glob_1 = require("glob");
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.glob);
class WeatherClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    BOT_PREFIX = process.env.BOT_PREFIX;
    BOT_TOKEN = process.env.BOT_TOKEN;
    constructor() {
        super({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });
    }
    start() {
        this.login(this.BOT_TOKEN);
        this.registerModules();
    }
    async importFile(filePath) {
        return (await Promise.resolve().then(() => __importStar(require(filePath))))?.default;
    }
    async registerModules() {
        console.log('[INFO] Registering modules...'); // debug
        const messageFiles = await globPromise(`${__dirname}/../commands/*{.ts,.js}`);
        messageFiles.forEach(async (filePath) => {
            const command = await this.importFile(filePath);
            if (!command.name)
                return;
            console.log(`[INFO] Registering command ${command.name}`); // debug
            this.commands.set(command.name, command);
        });
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async (filePath) => {
            const event = await this.importFile(filePath);
            console.log(`[INFO] Registering event ${event.event}`); // debug
            this.on(event.event, event.run);
        });
    }
}
exports.WeatherClient = WeatherClient;
