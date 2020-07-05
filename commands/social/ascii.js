const figlet = require('figlet');


     exports.run = async(client, message, args) =>{
        if(!args[0]) return message.channel.send('Please provide some text');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
    }
exports.help = {
name: "ascii",
  category: "general",
  description: "convert ur text to ascii",
  usage: "r!ascii [text]",
  example: "r!ascii lol"
}
  exports.conf = {
    aliases: [],
    cooldown: 5
  }