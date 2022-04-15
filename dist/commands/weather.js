"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const Commands_1 = require("../struct/Commands");
const weather = require("weather-js");
exports.default = new Commands_1.Command({
    name: "weather",
    run: async ({ message }) => {
        let cont = message.content.slice(__1.client.BOT_PREFIX?.length).split(" ");
        let args = cont.slice(1);
        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
            if (err)
                console.log(err);
            if (!result)
                return message.reply("Couldn't find weather for that location.");
            let current = result[0].current;
            let answer = `${current.skytext}\n${current.temperature}C temperature\n${current.feelslike}C feels like\n${current.humidity}% humidity\n${current.windspeed} mph wind speed.`;
            message.channel.send(answer);
        });
    }
});
