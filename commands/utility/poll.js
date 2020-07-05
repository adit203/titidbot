const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
  
  
  
  if (!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`This command requires the permission: \`\`\`js\nADMINISTRATOR\`\`\``);

  if (!args[0]) return message.channel.send('Please input a question.');

  const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setFooter('Reach to vote.')
    .setDescription(args.join(' '))
    .setTitle(`Poll Created By ${message.author.username}`);

  let msg = await message.channel.send('Creating Poll...')
.then(message => message.delete({timeout: 2000}))
    .then(message => message.channel.send(embed))

  await msg.react('721969088813072425');
  await msg.react('721969465205588048');

}
  
  exports.help = {
         name: "poll",
         description: "create a poll",
         usage: "r!poll [message]",
         example: "r!poll i am handsome?",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
}