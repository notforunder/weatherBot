
// CreatedBy : admin@notforstyle.ru
// Discord : notforstyle#4555

const Discord = require('discord.js')
const weather = require('weather-js')
require('dotenv').config()

const wbot = new Discord.Client()
const prefix = process.env.PREFIX

wbot.on('ready', ready => {
  console.log('Ready')
})

wbot.on('message', async message => {
  let cont = message.content.slice(prefix.lenght).split(" ");
  let args = cont.slice(1);

  if(message.content.startsWith(prefix + 'weather')){
    console.log(`${message.author.tag} | ${message.author.id} - check the weather`)

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
      if(err) console.log(err);
      if(!result) return message.reply("Type other city.")

      var current = result[0].current
      if(!current) return message.reply("Type other city.")
      var location = result[0].location
      var weatherEmbed = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setTitle(`Weather for ${current.observationpoint}`)
        .setColor('#78acff')
        .addField('Date: ', `${current.date}`, true)
        .addField('Humidity: ', `${current.humidity}`, true)
        .addField('Temperature: ', `${current.temperature}`, true)
        .addField('Feels Like: ', `${current.feelslike}`, true)
        .addField('Wind Speed: ', `${current.windspeed}`, true)
      message.channel.send(weatherEmbed)
    });
  }
})

wbot.login(process.env.DISCORD_ACCESS_TOKEN)
