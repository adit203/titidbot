const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
 
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("YOU NOT HAVE **PERMISSION** !")
  let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Welcome Channel is seted as ${channel}`)
  }

exports.help = {
         name: "setwelcome",
         description: "set up welcome channel",
         usage: "r!setwelcome <#channel>",
         example: "r!setwelcome #welcome",
};

exports.conf = {
          aliases: ["welcome"],
          cooldown: 5
};