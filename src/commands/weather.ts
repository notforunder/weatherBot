import { client } from "..";
import { Command } from "../struct/Commands";
const weather = require("weather-js");

export default new Command({
    name: "weather",
    run: async({ message }) => {
        let cont = message.content.slice(client.BOT_PREFIX?.length).split(" ");
        let args = cont.slice(1);

        weather.find({search: args.join(" "), degreeType: 'C'}, function(err:any, result:any){
            if(err) console.log(err);
            if(!result) return message.reply("Couldn't find weather for that location.");
        
            let current = result[0].current;
            let answer = `${current.skytext}\n${current.temperature}C temperature\n${current.feelslike}C feels like\n${current.humidity}% humidity\n${current.windspeed} mph wind speed.`;
            message.channel.send(answer);
            
        });
    }
})