const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let msg = await message.channel.send("Generating...")

  var user;
  user = message.mentions.users.first();
  if (!user) {
    
    if (!args[0]) {
      
      user = message.author;
      getuseravatar(user);
    } else {
      
      var id = args[0];
      client
        .fetchUser(id)
        .then(user => {
          getuseravatar(user);
        })
        .catch(error => console.log(error));
    }
  } else {
    
    getuseravatar(user);
  }
  function getuseravatar(user) {
    var embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .addField('Link as', `[png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})}) | [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024})}) | [webp](${user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024})})`)
      .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setTitle(user.tag + ` Profile Picture`)
      .setTimestamp()
      .setFooter(`Request By: ${message.author.username}`);
    message.channel.send(embed)
  }
}
exports.help = {
  name: "avatar",
  description: "show anyone avatar",
  category: "general",
  usage: "r!avatar <@user>",
  example: "r!avatar @Reuss#8330"
}
exports.conf = {
  aliases: ["av"],
  cooldown: 5
}