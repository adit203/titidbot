const Discord = require('discord.js')

exports.run = async(client, message, args) => {
  const author = message.mentions.members.first() || message.author
  if (!author) return message.channel.send("Please Mention a member")
  const size = Math.floor(Math.random() * 3) + 6
  const embed = new Discord.MessageEmbed()
  .setColor("#7289DA")
  .setTitle(`Pepee Machine`)
  .setDescription(`${author} Dick Size\n${size} cm\n8${'='.repeat(size)}D`)
  .setTimestamp()
  message.channel.send(embed)
}
exports.help = {
         name: "pepesize",
         description: "view your dick size",
         usage: "sb!dicksize <@user>",
         example: "sb!dicksize Rose#9322",
};

exports.conf = {
          aliases: ["dsize","dick","pepesize","pepemachine"],
          cooldown: 5
};