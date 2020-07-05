const Discord = require('discord.js')
const ms = require('ms')

exports.run = async (client, message, args) => {
  
  if (!args[0]) return message.reply('Tell me who to hack!')
  const toHack = args.slice(0).join(' ') && args.shift().toLowerCase()
  message.delete();
  
  let msg = await message.channel.send(`Hacking ${toHack}...`)
  
  let time = '3s'
  setTimeout(function(){
    msg.edit('Finding Email...')
  }, ms(time))
  
  let time1 = '6s'
  setTimeout(function(){
    msg.edit(`Email: ${toHack}@yopmail.com`)
  }, ms(time1))

  let time2 = '9s'
  setTimeout(function(){
    msg.edit('``Password: *********``')
  }, ms(time2))
    
  let time3 = '12s'
  setTimeout(function(){
    msg.edit(`Hacking ${toHack}'s account...`)
  }, ms(time3))
    
  let time4 = '15s'
  setTimeout(function(){
    msg.edit(`Collect all ${toHack}'s Data...`)
  }, ms(time4))
  
  let time5 = '18s'
  setTimeout(function(){
    msg.edit(`${toHack} Succesfully hacked.`)
  }, ms(time5))

}
exports.help = {
         name: "hack",
         description: "",
         usage: "",
         example: "",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};