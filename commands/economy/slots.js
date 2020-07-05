const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍐", "🍓", "🍒"];
const db = require("quick.db");
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!message.content.startsWith('r!'))return;

    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = args[0];
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setDescription(`You are betting more than you have`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setDescription(`input Specify an amount`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setTitle("You Win !")
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("#7289DA")
        message.channel.send(slotsEmbed1)
        db.add(`money_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setTitle("You Lose !")
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("#7289DA")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${user.id}`, money)
    }

}
  
  exports.help = {
    name: "slots",
    description: "Slots to get money",
    usage: "r!slots [amount]",
    example: "r!slots 100"
  }
exports.conf = {
  aliases: ["sl"],
  cooldown: 5
}