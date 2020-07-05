const db = require('quick.db')

exports.run = (client, message, args) => {
const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.channel.send(`oh ${user} have **${warnings}** warning(s)`)
  
  
  }
exports.help = {
         name: "warns",
         description: "check anyone warns by mention",
         usage: "r!warns <@user>",
         example: "r!warns @Ryandx#3995",
};

exports.conf = {
          aliases: ["checkwarn"],
          cooldown: 5
};