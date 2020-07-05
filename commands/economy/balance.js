const Discord = require("discord.js")
const db = require('quick.db')


	exports.run = (client,message, args) => {
                let user = message.mentions.users.first() || message.author
                let money = db.fetch(`money_${user.id}`)

                if (money === null) money = 0

                let embed = new Discord.MessageEmbed()
                .setColor(0x7289DA)
                .addField("Balance", `${money} coins`)
                .setThumbnail(user.avatarURL())
                .setTimestamp()
                .setFooter(`Balance of: ${user.tag}`, client.user.displayAvatarURL())
            message.channel.send(embed)
                //message.channel.send(`${user} you have ${money} coins`)
	}
exports.help = {
  name: "balance",
  description: "Show The Balance from anyone",
  category: "economy",
  usage: "r!balance <@user>",
  example: "r!balance @Kenrags#0382"
}
exports.conf = {
  aliases: ["bal"],
  cooldown: 5
}