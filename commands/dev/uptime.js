const Discord = require('discord.js');
const ms = require('ms');
const moment = require('moment');
require('moment-duration-format');
const ownerID = '698069399285792848';

exports.run = async (client, message, args, ops) => {
  
  if (message.author.id !== ownerID) return message.channel.send('Sorry, only Owner Bot can use this command.');

  
  const duration = moment
    .duration(client.uptime)
    .format(' D [days], H [hrs], m [mins], s [secs]');
  
  const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .addField(`Bot Uptime: ${duration}`, '\u200B')
    .setTimestamp()
    .setFooter('Have idea for bot? DM Kang Baso#5038');
  
  message.channel.send(embed)
  
  let uptimeLog = '1s'
  setTimeout(function(){
    console.log(`[SYSTEM] Bot uptime: ${duration}`)
  }, ms(uptimeLog))
  
}
exports.help = {
         name: "uptime",
         description: "view the bot uptime",
         usage: "r!uptime"
};

exports.conf = {
          aliases: ["bottime"],
          cooldown: 5
};