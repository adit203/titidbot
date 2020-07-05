exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = args[0];
  if (args[0] === message.author.id) return message.reply('I can\' let you do that, self-harm is bad:facepalm:');
  if (user === client.user.id) return message.reply("You pleblord, how can you use a bot to ban itself?:joy:");
  if (args[0] === "242263403001937920") return message.reply("You can't ban my Developer:wink:");
  if (!user) return message.reply('You need to input a User ID');
  
  if (reason.length < 1) {reason = 'No reason supplied.'};
  //let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
  message.guild.members.ban(user, {days:7, reason: reason}).catch(e =>{
    if (e) return message.channel.send("That user has already been banned or I don't have permission or my role isn't high enough!");
  })
}
exports.help = {
         name: "hackban",
         description: "ban someone if break rules for 7 days",
         usage: "r!hackban <@user>",
         example: "r!hackban Orwa#9221",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};
