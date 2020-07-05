const { MessageEmbed } = require("discord.js")

    exports.run = async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

  

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")
     let reason = args.slice(1).join(" ");
   if(!reason)  {
     return message.channel.send("Pls Give Reason")
                }

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
  
   message.guild.members.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.members.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been **banned** for 1 days`).then(i => i.delete({timeout: 1000}))

    
   



    }
    exports.help = {
         name: "softban",
         description: "ban member for 1 days",
         usage: "r!softban <@user> <reason>",
         example: "r!softban Wumpus#0284 spamming",
};

exports.conf = {
          aliases: ["sb"],
          cooldown: 5
};