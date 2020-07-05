const ms = require('ms');

exports.run =  async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to rerol giveaways');

        if(!args[0]) return message.channel.send('No giveaway ID provided');

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send('Couldn\'t find a giveaway with that ID/name');

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('<a:b_yes:721969088813072425> | Giveaway rerolled')
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)){
                message.channel.send('This giveaway hasn\'t ended yet')
            } else {
                console.error(e);
                message.channel.send('An error occured')
            }
        })
    }
exports.help = {
         name: "reroll",
         description: "reroll a giveaway by provide the id",
         usage: "r!reroll <message_id>",
         example: "r!reroll 043389544",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};