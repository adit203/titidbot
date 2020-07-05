const Discord = require("discord.js")
const db = require('quick.db')
const ms = require('parse-ms')


    exports.run = async(client, message, args) => {
        if (db.has(`${message.author.id}`, "pickaxe") === true) {
            let timeoutmine = 600000
            let mined =  db.fetch(`mined_${message.author.id}`)
    
            console.log(db.has(`${message.author.id}`, "pickaxe"))
            if (mined != null && timeoutmine - (Date.now() - mined) > 0) {
                let time = ms(timeoutmine - (Date.now() - mined));
                message.channel.send(`You have already mined please come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
    
    
            } else {
                let amountearned = Math.floor(Math.random() * 1500) + 1
    
                let jobs = ["Diamond", "Gold", "Silver", "Iron", "Emerald", "Copper"]
                let job = jobs[Math.floor(Math.random()* jobs.length)]
    
                let embed = new Discord.MessageEmbed()
                .setColor(0x7289DA)
                .setAuthor(`${message.author.tag}, it paid off`, message.author.displayAvatarURL())
                .setDescription(`${message.author}, you mined ${job} ore and earnt ${amountearned} coins`)
    
                message.channel.send(embed)
    
                db.add(`money_${message.author.id}`, amountearned)
                db.set(`mined_${message.author.id}`, Date.now())
            }
    
        } else if(db.has(`${message.author.id}`, "pickaxe") === false) {
            message.channel.send("You need to buy a pickaxe first (hint: _shop leads you to shop where you can buy stuff)")
        }

    }
    exports.help = {
      name: "mine",
      description: "mine for diamond and earn money",
      usage: "r!mine"
    }
exports.conf = {
  aliases: [],
  cooldown: 0
}