const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

    exports.run = async(client, message, args) => { 
        const subReddits = ["dankmemes", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
  
        const img = await randomPuppy(random);
  
        const memeEmbed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setImage(img)
        .setTitle(`This Your Meme <:GWfroggerHyperXD:721227679256281108>`)
        .setURL(`https://reddit.com/r/${random}`)
  
        message.channel.send(memeEmbed);
    }
exports.help = {
  name: "meme",
  category: "fun",
  description: "Give your meme from subreddit",
  usage: "sb!meme"
}
exports.conf = {
  aliases: [],
  cooldown: 5
}