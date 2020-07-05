const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
 let user = message.mentions.users.first() || message.author
 let bank = db.fetch(`deposit_${user.id}`)
 
 if(bank === null) bank = 0
  
  let embed = new Discord.MessageEmbed()
  .setColor("#7289DA")
  .setThumbnail(user.avatarURL())
  .setTitle("Rexy Bank")
  .setDescription(`Deposit: ${bank}$ Coins`)
  .setTimestamp()
  .setFooter(`Rexy Bank`, client.user.displayAvatarURL())
  
  message.channel.send(embed)
}
exports.help = {
         name: "bank",
         description: "see your deposit in Rexy bank",
         usage: "r!bank\nr!bank <@user>",
         example: "r!bank\nr!bank Rexy#3063",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};