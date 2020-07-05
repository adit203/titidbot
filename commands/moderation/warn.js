const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("<a:b_no:721969465205588048> | You should have admin perms to use this command!")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("<a:b_no:721969465205588048> | Please Mention the person to who you want to warn.")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("<a:b_no:721969465205588048> | You can not warn bots")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send(":-<a:b_no:721969465205588048> | You can not warn yourself")
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send(":-<a:b_no:721969465205588048> | You jerk, how you can warn server owner -_-")
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send(":-<a:b_no:721969465205588048> | Please provide reason to warn.")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`)
    }
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`<a:b_yes:721969088813072425> | You warned **${message.mentions.users.first().username}** for ${reason}`)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`<a:b_yes:721969088813072425> | You warned **${message.mentions.users.first().username}** for ${reason}`)
    }
}
exports.help = {
         name: "warn",
         description: "warn anyone in your guild",
         usage: "sb!warn <@user> [reason]",
         example: "sb!warn typo#9433 share NSFW",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};