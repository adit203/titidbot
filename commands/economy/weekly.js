const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

exports.run = async(client, message, args) => {
let timeout = 604800000
  let amount = 1000
  let user = message.author
  
  let weekly = db.fetch(`weekly_${user.id}`)
  if (weekly != null && timeout - (Date.now() - weekly) > 0 ) {
let time = ms(timeout - (Date.now() - weekly));
    message.channel.send(`You already claim your weekly bonus, you can back in ${time.days}d ${time.minutes}m ${time.seconds}s`)
 } else {
 let embed = new Discord.MessageEmbed()
 .setColor(0x7289DA)
 .setTitle('Weekly Bonus')
 .setDescription(`You Get Weeky Bonus And Get ${amount} Coins !`)
 .setThumbnail(user.avatarURL())
 message.channel.send(embed)
   db.add(`money_${user.id}`, amount)
   db.add(`weekly_${user.id}`, Date.now())
 }
  }
exports.help = {
         name: "weekly",
         description: "get your weekly bonus",
         usage: "r!weekly",
         example: "r!weekly",
};

exports.conf = {
          aliases: [""],
          cooldown: 0
};