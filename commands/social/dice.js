exports.run = async(client, message, args) =>{
  let sides = 6;
        const num = Math.floor(Math.random() * 6) + 1;
        return message.reply(`I rolled you a 🎲 of **${sides}** side(s) and got **${num}** as the outcome.`);
    }
exports.help = {
         name: "dice",
         description: "roll the dice",
         usage: "r!dice",
         example: "",
};

exports.conf = {
          aliases: ["roll","diceroll"],
          cooldown: 5
};