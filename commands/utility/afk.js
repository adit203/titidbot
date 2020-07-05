const Discord = require('discord.js'), db = require('quick.db');
const status = new db.table("AFKs");

exports.run = async(client, message, args) => {
let afk = await status.fetch(message.author.id);
const embed = new Discord.MessageEmbed().setColor(0x7289DA)
    
  if (!afk) {
    embed.setTitle(`<a:b_yes:721969088813072425> | **${message.author.tag}** now AFK.`)
    embed.setDescription(`Reason: \`\`\`${args.join(" ") ? args.join(" ") : "AFK"}\`\`\``)
    embed.setFooter(`Started Bot v2.0`, client.user.displayAvatarURL())
    embed.setTimestamp()
    status.set(message.author.id, args.join(" ") || `AFK`);
  } else {
    embed.setDescription("You are no longer AFK.");
    status.delete(message.author.id);
  }
    
  message.channel.send(embed)
}
exports.help = {
         name: "afk",
         description: "set afk status",
         usage: "r!afk <status>",
         example: "r!afk gone eating",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};