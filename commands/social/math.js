const math = require('mathjs');

const Discord = require('discord.js');


    exports.run = async(client, message, args) => {

        if(!args[0]) return message.channel.send('Please provide a question\n• (+) for plus\n• (-) for substraction\n• (/) for devided\n• (*) for multiply');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a **valid** question')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setTitle(`${client.user.username} Calculator`)
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
        .setTimestamp()
        .setFooter(`Question By: ${message.author.username}`, client.user.displayAvatarURL)

        message.channel.send(embed);

    }
exports.help = {
  name: "math",
  description: "do a math from your question",
  category: "general",
  usage: "r!math [question]",
  example: "r!math 402/4"
}
exports.conf = {
  aliases: ["calc","calculate"],
  cooldown: 5
}