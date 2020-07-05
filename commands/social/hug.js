 const { MessageEmbed } = require('discord.js')
 const fetch = require('node-fetch')
 
  exports.run = async(client, message, args) => {
  let msg = await message.channel.send("Hugging...")
      
    fetch(`https://nekos.life/api/v2/img/hug`)
      .then(res => res.json()).then(body => {
      if(!body)
        return message.channel.send('Oops I Broke...')
   let hugged = message.mentions.users.first()   
    const embed = new MessageEmbed()
     .setColor(0x7289DA)
     .setImage(body.url)
     .setDescription(`${message.author.username} hugged ${hugged}`)
    message.channel.send(embed)
   })
    }
exports.help = {
         name: "hug",
         description: "hug someone",
         usage: "r!hug <@user>",
         example: "r!hug frazzy#3054",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};