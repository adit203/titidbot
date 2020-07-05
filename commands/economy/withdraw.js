const Discord = require('discord.js')
const db = require('quick.db')


exports.run = async(client, message, args) => {
let user = message.author
  let money = db.fetch(`money_${user.id}`)
  let bank = db.fetch(`deposit_${user.id}`)
  let amount = args[0]
  
 if (args[0] == 'all') {
   let moneys = db.fetch(`money_${user.id}`)
   let banks = db.fetch(`deposit_${user.id}`)
   let embeds = new Discord.MessageEmbed()
   .setColor(0x7289DA)
   .setDescription(`You dont have deposit to withdraw :(`)
   
   if (moneys === 0) return message.channel.send(embeds)
   
   db.add(`money_${user.id}`, banks)
   db.subtract(`deposit_${user.id}`, banks)
   message.channel.send(`Succesfully Withdraw all your deposit`)
   
 } else { 
  if(!amount) {
    return message.reply('Input a amount to withdraw')
    }
  
  if(bank < amount) {
    return message.channel.send(`You not have ${amount}$ In your deposit at Rexy Bank`)
    }
  
  if(message.content.includes('-')) {
    return message.channel.send(`You cant withdraw minus money`)
    }
  
  let embed = new Discord.MessageEmbed()
  .setColor('#7289DA')
  .setTitle('Rexy Bank')
  .setDescription(`${user.tag} Transaction Succes !!\nWithdraw: ${amount}`)
 message.channel.send(embed)
  db.subtract(`deposit_${user.id}`, amount)
  db.add(`money_${user.id}`, amount)
}
}
exports.help = {
         name: "withdraw",
         description: "withdraw your money in Rexy Bank",
         usage: "r!withdraw all\nr!withdraw [amount]",
         example: "r!withdraw all\nr!withdraw 100",
};

exports.conf = {
          aliases: ["wd"],
          cooldown: 5
};