import { Client, ClientEvents, Collection } from 'discord.js';
import { CommandType } from '../interfaces/Command';
import { Event } from './Event';
import { glob } from 'glob';
import { promisify } from 'util';

const globPromise = promisify(glob);

export class WeatherClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    public BOT_PREFIX = process.env.BOT_PREFIX;
    public BOT_TOKEN = process.env.BOT_TOKEN;

    constructor() {
        super({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });
    }

    start() {
        this.login(this.BOT_TOKEN);
        this.registerModules();
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerModules() {
        console.log('[INFO] Registering modules...'); // debug
        const messageFiles = await globPromise(`${__dirname}/../commands/*{.ts,.js}`);
        messageFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath)
            if(!command.name) return;
            console.log(`[INFO] Registering command ${command.name}`); // debug
            this.commands.set(command.name, command);
        })

        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath)
            console.log(`[INFO] Registering event ${event.event}`); // debug
            this.on(event.event, event.run);
        });
    }
}