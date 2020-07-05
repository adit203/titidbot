const { MessageEmbed } = require('discord.js');
 const fetch = require('node-fetch')

exports.run = async(client, message, args) =>{
 let msg = await message.channel.send("Slapping...")
  let user = message.mentions.members.first() || message.guild.cache.get(args[0])
  if(!args[0]) 
    return message.reply('Please provide someone')
  if (!user)
    return message.reply('Please mentions someone')
      fetch(`https://nekos.life/api/v2/img/slap`)
    .then(res => res.json()).then(url => {
        const embed = new MessageEmbed()
            .setFooter("© Started bot")
            .setTimestamp()
            .setImage(url.url)
            .setColor("RANDOM");
        message.channel.send(`🖐 | ***${user}, Slapped by:${message.author.tag}!***`, { embed });
      })
      }
exports.help = {
         name: "slap",
         description: "slap someone in your guild",
         usage: "r!slap <@user>",
         example: "",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};