const Discord = require("discord.js")
const ms = require("parse-ms")
const talkedRecently = new Set();
const db = require('quick.db')


	exports.run = async(client,message, args) => {
        let timeoutstonks = 600000
        let stonks =  db.fetch(`stonks${message.author.id}`)


        if (stonks != null && timeoutstonks - (Date.now() - stonks) > 0) {
            let time = ms(timeoutstonks - (Date.now() - stonks));
            message.channel.send(`You have already invested in stonks please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)


        } else {
            let amountearned = Math.floor(Math.random() * 5000) + 1

            let jobs = ["Tesla", "Apple", "Google", "Frosty Inc", "JP Morgan", "Wells Fargo", "Discord", "Facebook"]
            let job = jobs[Math.floor(Math.random()* jobs.length)]

            let embed = new Discord.MessageEmbed()
            .setColor(0x7289DA)
            .setAuthor(`${message.author.tag}, it paid off`, message.author.displayAvatarURL())
            .setDescription(`${message.author}, you invested in ${job} and earnt ${amountearned} coins`)

            message.channel.send(embed)

            db.add(`money_${message.author.id}`, amountearned)
            db.set(`stonks${message.author.id}`, Date.now())
        }

	}
  exports.help = {
    name: "stonks",
    description: "invest some stonks",
    category: "economy",
    usage: "r!stonks"
  }
exports.conf = {
  aliases: ["stonk"],
  cooldown: 0
}