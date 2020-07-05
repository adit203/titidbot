const Discord = require('discord.js');



    exports.run = (client, message, args) => {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('<a:b_no:721969465205588048> | You can\'t use that!')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('<a:b_no:721969465205588048> | I don\'t have the right permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('<a:b_no:721969465205588048> | Please specify a user');

        if(!member) return message.channel.send('<a:b_no:721969465205588048> | Can\'t seem to find this user. Sorry \'bout that :/');
        if(!member.kickable) return message.channel.send('<a:b_no:721969465205588048> | This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine');

        if(member.id === message.author.id) return message.channel.send('<a:b_no:721969465205588048> | Bruh, you can\'t kick yourself!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member.kick(reason)
      .then (() => {
          message.channel.send(`${member} has been kicked by ${message.author.tag}`)
        })
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })
    }
exports.help = {
  name: "kick",
  category: "moderation",
  description: "kick a member from your guild",
  usage: "r!kick",
  example: "r!kick @fairz#9234 spamming"
}
exports.conf = {
  aliases: [],
  cooldown: 5
}