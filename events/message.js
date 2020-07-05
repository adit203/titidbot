const Discord = require("discord.js"), cooldowns = new Discord.Collection();
const db = require('quick.db')
// cooldowns will store the user when they are still in the cooldown mode.

module.exports = async (client, message) => {
  const { guild, channel } = message
  // Prevent any chit-chats with other bots, or by himself.
  if (message.author.bot || message.author === client.user) return;
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix;
  
  // If the user doesn't doing any to the bot, return it.
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;
  
  // Many people don't know what is message.flags.
  // We've already seen a bot who has a message.flags or they would called, parameter things.
  message.flags = []
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1)); // Example: /play -soundcloud UP pice
  }
  
  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return; // If the commands doesn't exist, ignore it. Don't send any warning on this.
  
  // This will set a cooldown to a user after typing a command.
  if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());
  
  const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(commandFile.help.name),
        cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;
  
  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {
  
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`Calm down dude, please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`);
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }
  
  try {
    if (!commandFile) return;
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(error.message);
  } finally {
    const embed = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setTitle("Commands Using !")
    .addField(`Where Command Using`, `In: ${message.guild.name}\nat: <#${message.channel.name}> Yas !`)
    .addField(`Command User:`,`\`\`\` ${sender.tag}\`\`\``)
    .addField(`Id:`,`\`\`\` (${sender.id})\`\`\``)
    .addField(`Ran a command:`,`\`\`\`${cmd}\`\`\``)
    .setTimestamp()
    client.channels.cache.get('719932136752283678').send(embed);
  }
}
