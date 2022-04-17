import { MessageEmbed } from "discord.js";
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

            const embed = new MessageEmbed()
                .setTitle('Weather for ' + current.observationpoint)
                .addField('Time of observation', current.observationtime, true)
                .addField('Temperature', current.temperature + 'C', true)
                .addField('Feels Like', current.feelslike + 'C', true)
                .addField('Wind Speed', current.windspeed + 'mph', true)
                .addField('Humidity', current.humidity + '%', true)
                .addField('Sky', current.skytext, true)
                .setThumbnail(current.imageUrl)
                .setAuthor({name: 'Weather Module', iconURL: client.user.avatarURL()})
                .setColor(0x00AE86)

            message.channel.send({embeds: [embed]});
        });
    }
})