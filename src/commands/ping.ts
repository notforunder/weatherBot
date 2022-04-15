import { Command } from "../struct/Commands";

export default new Command({
    name: "ping",
    run: async({ message }) => {
        message.channel.send('pong');
    }
})