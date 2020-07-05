const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need permission to do this')
  
  let reason = args.join(" ")
  if (!reason) return message.reply('Input a reason !')
  
  let embed = new MessageEmbed()
  .setColor(0x7289DA)
  .setAuthor(message.guild.name, message.guild.iconURL())
  .addField('Server Status:', `**down**`)
  .addField('Note:', `**${reason}**`)
  message.channel.send(embed)
}
exports.help = {
         name: "down",
         description: "show down status from your server",
         usage: "r!down [reason]",
         example: "r!down Done Updating",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};