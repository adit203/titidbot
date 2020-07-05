const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("<a:b_no:721969465205588048> | You should have admin perms to use this command")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("<a:b_no:721969465205588048> | Please mention the person whose warning you want to reset")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send(":-<a:b_no:721969465205588048> | Bot are not allowed to have warnings")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("<a:b_no:721969465205588048> | You are not allowed to reset your warnings")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`<:check:721761285871501362> | ${message.mentions.users.first().username} do not have any warnings`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`<a:b_yes:721969088813072425> | Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`)
    await message.channel.send(`<a:b_yes:721969088813072425> | Reseted all warnings of ${message.mentions.users.first().username}`)
    
  
    
}
exports.help = {
         name: "resetwarn",
         description: "reset the warn",
         usage: "r!resetwarn <@user>",
         example: "r!resetwarn @Pyrofoam#9537",
};

exports.conf = {
          aliases: ["rwarn"],
          cooldown: 5
};