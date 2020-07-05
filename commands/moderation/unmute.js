  exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to unmute anyone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to unmute"
      );
    }
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
 if(user.roles.cache.has(muterole)) {
      return message.channel.send("Given User do not have mute role so what i am suppose to take")
    }
    
    
    user.roles.remove(muterole)
    
    await message.channel.send(`<a:b_yes:721969088813072425> | **${message.mentions.users.first().username}** is unmuted`)
    
    user.send(`<a:b_yes:721969088813072425> | You are now unmuted from **${message.guild.name}**`)

  }
  exports.help = {
         name: "unmute",
         description: "unmute anyone you want",
         usage: "r!unmute <@user>",
         example: "r!unmute @Terry#3795",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};