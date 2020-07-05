const Discord = require('discord.js')
const client = new Discord.Client()

	exports.run = (client,message, args) =>{
        if(message.author.bot) return;
        if(message.content.toLowerCase().startsWith('r!stats')) {
          const args = message.content.split(' ');
          console.log(args);
          if(args.length > 2) {
            message.reply(`Incorrect Usage: sb!stats | sb!stats <user_id> | sb!stats @mention`);
          } else if(args.length === 2) {
            const member = message.mentions.members.size === 1 ?
              message.mentions.members.first() :
              message.guild.members.cache.get(args[1]);
            if(member) {
              const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .addField('Created On', member.user.createdAt.toLocaleString(), true)
                .addField('Joined On', member.joinedAt, true)
                .addField('Kickable', member.kickable, false)
                .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
                .addField('Presence', member.presence.status)
                .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
              .setColor("#7289DA");
              message.channel.send(embed);
            } else {
              message.channel.send(`I couldn't find that member with ID ${args[1]}`);
            }
      
          } else {
            const { guild } = message;
            const embed = new Discord.MessageEmbed()
              .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
              .setThumbnail(guild.iconURL())
              .addField('Created On', guild.createdAt.toLocaleString(), true)
              .addField('Guild Owner', guild.owner.user.tag)
              .addField('Total Members', guild.memberCount, true)
              .addField('Total Real Members', guild.members.cache.filter(member => !member.user.bot).size, true)
              .addField('Total Bots', guild.members.cache.filter(member => member.user.bot).size, true)
              .addField('Total Channels', guild.channels.cache.size, true)
              .addField('Total Text Channels', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
              .addField('Total Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
              .setColor('#7289DA')
              .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);
            message.channel.send(embed);
          }
        }
  }
  exports.help = {
    name: "stats",
    description: "show the stats from member or guild",
    category: "general",
    usage: "r!stats <@user>\nr!stats",
    example: "For Member: r!stats @Feeder#4003\nFor Guild: r!stats"
  }
exports.conf = {
  aliases: [],
  cooldown: 5
}