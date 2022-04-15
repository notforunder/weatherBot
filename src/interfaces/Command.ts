import { Message } from 'discord.js'
import { WeatherClient } from '../struct/Client'

interface RunOptions {
    client: WeatherClient;
    message: Message;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    name: string;
    description?: string;
    run: RunFunction;
}