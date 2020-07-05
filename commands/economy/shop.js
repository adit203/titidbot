const Discord = require('discord.js')
const client = new Discord.Client()


	exports.run = async(client, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Shop")
    .setColor(0x7289DA)
    .addField("<:rods:721718010070434136> Fishing Rod", "id: rod\ncost: 1,000 coins")
    .addField("<:swords:721721896059797525> Sword", "id: sword\ncost: 700 coins")
    .addField("<:pick:721715584752156753> Pickaxe", "id: pick\ncost: 1,200 coins")
    .addField("<:guns:721722603219189801> Gun", "id: gun\ncost: 5,000 coins")
    .addField("<:tea:721723802211450910> Tea", "id: tea\ncost: 5 coins")
    .setTimestamp()
    message.channel.send(embed)
	}
  exports.help = {
    name: "shop",
    description: "View the shop",
    usage: "r!shop"
  }
exports.conf = {
  aliases: [],
  cooldown: 5
}