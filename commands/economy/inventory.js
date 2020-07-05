const db = require("quick.db")
const Discord = require("discord.js")


    exports.run = async(client, message, args) => {
      let items = db.get(message.author.id)
      let user = message.mentions.users.first || message.author
      if (items === null) items = "nothing yet"
    let embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setTitle(`${message.author.username}'s Inventory`)
    .addField("Inventory", items)
    message.channel.send(embed)
    }
    exports.help = {
      name: "inventory",
      description: "Show your inventory",
      category: "economy",
      usage: "r!inventory <@user>\nr!inventory",
      example: "r!inventory @Trex#0224"
    }
exports.conf = {
  aliases: ["inv"],
  cooldown: 5
}