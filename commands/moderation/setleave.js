const Discord = require("discord.js")
const db = require("quick.db")


  exports.run = (client, message, args) => {
 
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("YOU NOT HAVE **PERMISSION** !")
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`byechannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Leave Channel is seted as ${channel}`)
  }
exports.help = {
         name: "setleave",
         description: "set up leave channel",
         usage: "r!setleave <#channel>",
         example: "r!setleave #leave",
};

exports.conf = {
          aliases: ["leave","setgoodbye","goodbye"],
          cooldown: 5
};