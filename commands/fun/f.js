const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    if(args && args.length > 1){
        message.channel.send(`${message.author.username} has paid their respect for **${args.join(' ')}**`)
    }else{
        message.channel.send(`${message.author.username} has paid their respect `)
    }
};

exports.conf = {
    aliases: ["eff","respect"],
    cooldown: 5
  };
  
  exports.help = {
    name: 'f',
    description: 'Press F to pay Respect',
    usage: 'sb!f'
  };