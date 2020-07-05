const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
             try {
                if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send("You don't have the permission to generate an invite link")
                if (!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send("I don't have the permission to generate an invite");
                message.channel.createInvite({ maxAge: 0 }).then(invite => {
                  let embed = new MessageEmbed()
                  .setColor('RANDOM')
                  .setDescription(`**Permanent Invite Link**: __${invite}__`);
                  message.channel.send(embed);
                });
            } catch (err) {
                return console.log(`${err}`);
            }
};
exports.help = {
         name: "guild-invite",
         description: "give you permanent guild invite.",
         usage: "r!guild-invite",
         example: "",
};

exports.conf = {
          aliases: ["ginvite"],
          cooldown: 5
};