const Discord = require('discord.js')

exports.run = async(client, message, args) => {
if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.reply('You Not Have **PERMISSION !**')
    }
    let channel = client.channels.cache.get(message.channel.id)
var posisi = channel.position;
  
  
  channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
    channel.delete()
    channel2.send("Channel Has been nuked !",{
    files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
    })
  })
    }
exports.conf = {
  aliases: [],
  cooldown: 5
}
exports.help = {
  name: "nuke",
  usage: "r!nuke",
  description: "Nuke a channel."
  }