const Discord = require('discord.js')
const md5 = require('md5')

exports.run = async(client, message, args) => {

        let member1 = message.mentions.members.first();
        let member2 = message.mentions.members.filter((m) => m.id !== member1.id).first() || message.member;
        if(!member1 || !member2){
            return message.channel.send(message.language.get("LOVECALC_ERR_MENTIONS"));
        }

        let members = [ member1, member2 ].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        let str = `${members[0].id}${members[1].user.username}${members[0].user.username}${members[1].id}`;
        let hash = md5(str);

        let string = "";
        hash.split("").forEach((e) => {
            if(!isNaN(e)){
                string+=e;
            }
        });
        let percent = parseInt(string.substr(0, 2), 10);
        
        let embed = new Discord.MessageEmbed()
            .setAuthor("❤️ Love Calculator")
            .setDescription(`${percent}% ${member1.user.username} Love ${member2.user.username}`)
            .setColor(0x7289DA)
            .setFooter("Started bot | v1.5", client.user.displayAvatarURL())
        
        message.channel.send(embed);
}
exports.help = {
         name: "lovecalc",
         description: "",
         usage: "",
         example: "",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};
    