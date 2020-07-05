exports.run = async(client, message, args) => {}
exports.help = {
         name: "play",
         description: "play a music",
         usage: "r!play <song>",
         example: "r!play lily",
};

exports.conf = {
          aliases: ["p"],
          cooldown: 5
};