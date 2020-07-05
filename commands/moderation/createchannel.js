exports.run = async (client, message, args, level) => {
  try {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You not have permission")
    if (!args[1]) return message.reply('You need to give me the channel type!')
    if (!args[0]) return message.reply('You need to give me the channel name!')

    message.channel.send('I\'ve created the channel!').then(() => {
      message.guild.channels.create(args[1], {type:args[0]}, []).catch((err) => {
        message.channel.send('There was an error!')
      })
    })
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  cooldown: 5,
  aliases: ['crc', 'chanmake'],
}

exports.help = {
  name: 'createchannel',
  category: 'Moderation',
  description: 'Creates a channel in the server.',
  usage: 'r!createchannel <voice/text> <name>',
  example: "r!createchannel text general"
}