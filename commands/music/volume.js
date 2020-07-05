exports.run = async(client, message, args) => {}
exports.help = {
         name: "volume",
         description: "set the volume 1-100",
         usage: "r!volume <amount>",
         example: "r!volume 100",
};

exports.conf = {
          aliases: ["vol"],
          cooldown: 5
};