const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
  
     if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "<a:b_no:721969465205588048> | Sorry but you do not have permission to mute anyone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("<a:b_no:721969465205588048> | I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.send("<a:b_no:721969465205588048> | Please mention the member to who you want to mute")
    }
    
    if(user.id === message.author.id) {
      return message.channel.send("<a:b_no:721969465205588048> | I won't mute you -_-");
    }
    
    
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
          
      return message.channel.send("<a:b_no:721969465205588048> | Please Give the reason to mute the member")
    }
    
  //TIME TO LET MUTED ROLE
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
      if(!muterole) {
      return message.channel.send("<a:b_no:721969465205588048> | This server do not have role with name `Muted`")
    }
    
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("<a:b_no:721969465205588048> | Given User is already muted")
    }
    
  
    
    
    user.roles.add(muterole)
    
await message.channel.send(`You muted **${message.mentions.users.first().username}** For \`${reason}\``)
    
    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``)
    
    
//WE ARE DONE HERE 
    
}
exports.help = {
         name: "mute",
         description: "mute anyone who break rules",
         usage: "r!mute <@user> [reason]",
         example: "r!mute Grexxy#7533 spamming",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};