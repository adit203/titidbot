const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {  
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need permission to do this')
  
  let reason = args.join(" ")
  if (!reason) return message.reply('Input a reason !')
  
  let embed = new MessageEmbed()
  .setColor(0x7289DA)
  .setAuthor(message.guild.name, message.guild.iconURL())
  .addField('Server Status:', `**UP**`)
  .addField('Note:', `**${reason}**`)
  .setTimestamp()
  .setFooter(`Updated By: ${message.author.username}`, message.author.displayAvatarURL())
    let msg = await message.channel.send("@everyone")
.then(message => message.delete({timeout: 0}))
.then(message => message.channel.send(embed))
}
exports.help = {
         name: "up",
         description: "show up status from your server",
         usage: "r!up [reason]",
         example: "r!up Done Updating",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};