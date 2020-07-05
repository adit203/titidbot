const { MessageEmbed } = require("discord.js")



    exports.run = async (client, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("<a:b_no:721969465205588048> | You dont have **permission** to perform this command!")


    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send("<a:b_no:721969465205588048> | Please provide a **user** to add a role too.")
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to add to said user.") 

    if(!message.guild.me.hasPermission(["MANAGE_ROLES","ADMINISTRATOR"])) return message.channel.send("<a:b_no:721969465205588048> | I don't have **permission** to perform this command.")
                                                                           
    if(rMember.roles.cache.has(role.id)) {
        return message.channel.send(`<a:b_no:721969465205588048> | ${rMember.displayName}, already has the **role**!`)
    } else {
        await rMember.roles.add(role.id).catch(e => message.reply(e.message))
    } 
      
      await rMember.roles.add(role.id)
              message.channel.send(`The **${role.name}** role has been added to **${rMember.displayName}**.`)   
    }
    exports.help = {
         name: "promote",
         description: "give role to a member in your guild",
         usage: "r!promote <@user> <role>",
         example: "r!promote Started#0288 @Member",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};