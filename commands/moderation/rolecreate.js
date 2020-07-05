exports.run = async (client, message, args, color) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`**${message.author.username}, Sorry but you need \`MANAGE_ROLES\` Permission to use this command.**`).then(m => m.delete(7000)); 
   if(!args[0]) return message.channel.send(`<a:b_no:721969465205588048> | Invalid Argument! e.g : sb!addrole <name> <hexcode>`); 
   var hex = args[1];
    if(!hex) '#000000';
   message.guild.createRole({
    "name": args[0],
    "color": hex
   }).then((role) => {
     message.channel.send(`<@&${role.id}>, has been created`);
});
}

exports.help = {
  name: "rolecreate",
  description: "create a role",
  usage: "r!rolecreate [name] <hexcode>",
  example: ""
}
exports.conf = {
  aliases: ["crole"],
  cooldown: 5
}