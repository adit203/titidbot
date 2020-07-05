const { MessageEmbed } = require("discord.js")

    exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to remove a role too.")
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to remove from said user.") 
    
    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(!rMember.roles.cache.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
    } else {
        await rMember.roles.remove(role.id).catch(e => message.reply(e.message))
    }

  
    await rMember.roles.remove(role.id)
        message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayName}.`)
      
        
    } 
exports.help = {
         name: "demote",
         usage: "r!demote <@user>",
         example: "r!demote @Frazz#2844",
         description: "demote a member",
  category: "moderation"
};

exports.conf = {
          aliases: ["takerole"],
          cooldown: 5
};