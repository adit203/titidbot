const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {
    const invites = await message.guild.fetchInvites();
    const topTen = invites.filter((inv) => inv.uses > 0).sort((a, b) => b.uses - a.uses).first(10);

    if(topTen.length === 0) return message.reply("There are no invites, or none of them have been used!");

    return message.channel.send(new MessageEmbed()
      .setTitle(`Top Invites in ${message.guild.name}`)
      .setColor(0x9590EE)
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription(topTen.map((inv) => `• **${inv.inviter.username}**'s invite **${inv.code}** has **${inv.uses.toLocaleString()}** uses.`).join("\n")));
  }
exports.help = {
         name: "topinvite",
         description: "Shows the top invites in a server",
         usage: "r!topinvite",
         example: "",
};

exports.conf = {
          aliases: ["invites"],
          cooldown: 5
};