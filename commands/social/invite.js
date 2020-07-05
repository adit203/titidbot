const Discord = require('discord.js')

exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setColor(0x7289DA)
  .setTitle(`${client.user.username} Invite Link`)
  .addField('<a:coolpika:720542894724743189> Invite Link: ', '[Click Here !](https://discord.com/api/oauth2/authorize?client_id=720932874248912906&permissions=2147483639&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize%3Fclient_id%3D720932874248912906%26permissions%3D2147483639%26scope%3Dbot&scope=bot)')
  .addField('<a:b_yes:721969088813072425> Support Server: ', '[Click Here !](https://discord.gg/hPRBBuG)')
  .setTimestamp()
  .setFooter('Thanks For Support', client.user.displayAvatarURL())

message.channel.send(embed)
}
exports.help = {
  name: "invite",
  category: "general",
  description: "Generate Started Bot invite link",
  usage:  "r!invite"
}
exports.conf = {
  aliases: ["getbot"],
  cooldown: 5
}