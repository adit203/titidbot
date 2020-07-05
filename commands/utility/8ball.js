const answers = [
  'Signs point to yes.',
  'Yes.',
  'Reply hazy, try again.',
  'Without a doubt.',
  'My sources say no.',
  'As I see it, yes.',
  'You may rely on it.',
  'Concentrate and ask again.',
  'Outlook not so good.',
  'It is decidedly so.',
  'Better not tell you now.',
  'Very doubtful.',
  'Yes - definitely.',
  'It is certain.',
  'Cannot predict now.',
  'Most likely.',
  'Ask again later.',
  'My reply is no.',
  'Outlook good.',
  'Don\'t count on it.',
  'Who cares?',
  'Never, ever, ever.',
  'Possibly.',
  'There is a small chance.'
]
exports.run = async(client, message, args) => {
  message.channel.send(`The magic 8 ball says: \`${answers[Math.floor(Math.random() * answers.length)]}\``)

}
exports.help = {
         name: "8ball",
         description: "give magic eight ball answer",
         usage: "r!8ball",
         example: "r!8ball",
};

exports.conf = {
          aliases: ["magic-eight-ball","eight-ball"],
          cooldown: 5
};