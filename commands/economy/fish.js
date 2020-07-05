const Discord = require("discord.js")
const db = require('quick.db')
const ms = require('parse-ms')

    exports.run = async(client, message, args) => {
        if (db.has(`${message.author.id}`, "fishing rod") === true) {
            let timeoutfished = 6000
            let fished =  db.fetch(`fished_${message.author.id}`)
    
    
            if (fished != null && timeoutfished - (Date.now() - fished) > 0) {
                let time = ms(timeoutfished - (Date.now() - fished));
                message.channel.send(`You have already fished please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
    
    
            } else {
                let amountearned = Math.floor(Math.random() * 500) + 1
    
                let jobs = ["Guppy", "Gold Fish", "JellyFish", "Mahi-Mahi", "Shrimp", "blob fish", "catfish", "shark"]
                let job = jobs[Math.floor(Math.random()* jobs.length)]
    
                let embed = new Discord.MessageEmbed()
                .setColor(0x7289DA)
                .setAuthor(`${message.author.tag}, it paid off`, message.author.displayAvatarURL())
                .setDescription(`${message.author}, you caught a ${job} and earnt ${amountearned} coins`)
    
                message.channel.send(embed)
    
                db.add(`money_${message.author.id}`, amountearned)
                db.set(`fished_${message.author.id}`, Date.now())
            }
    
        } else {
            message.channel.send("You need to buy a fishing rod first (hint: sb!shop leads you to shop where you can buy stuff)")
        }

    }
    exports.help = {
      name: "fish",
      description: "do a fishing",
      usage: "r!fish"
    }
exports.conf = {
  aliases: [],
  cooldown: 0
}