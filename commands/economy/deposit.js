const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
 let user = message.author
 let deposit = db.fetch(`deposit_${user.id}`)
 let money = db.fetch(`money_${user.id}`)
 let amount = args[0]
 
 if (args[0] == "all") {
   let money2 = db.fetch(`money_${user.id}`)
   let bank2 = db.fetch(`deposit_${user.id}`)
   
   
   let embedbank = new Discord.MessageEmbed()
    .setColor('#7289DA')
    .setDescription("You don't have any money to deposit")

    if(money2 === 0) return message.channel.send(embedbank)

 db.add(`deposit_${user.id}`, money2)
   db.subtract(`money_${user.id}`, money2)
   message.channel.send(`Succesfully Deposit all your money`)
 } else {
 if (!amount) {
   return message.channel.send('Input specify Amount')
   }
  if (message.content.includes('-')) {
    return message.channel.send(`You cant deposit -${amount}`)
    }
  if (money < amount) {
    return message.channel.send(`That more money you've !`)
    }
  message.channel.send(`${user.tag} You Succesfully Deposit ${amount}`)
  db.add(`deposit_${user.id}`, amount)
  db.subtract(`money_${user.id}`, amount)
}
}

exports.help = {
         name: "deposit",
         description: "deposit your money to Rexy Bank",
         usage: "r!deposit <amount>",
         example: "r!deposit 500",
};

exports.conf = {
          aliases: ["dep"],
          cooldown: 5
};