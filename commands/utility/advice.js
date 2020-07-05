const request = require('node-superfetch');


exports.run = async(client, message, args) => {
		try {
			const { text } = await request.get('http://api.adviceslip.com/advice');
			const body = JSON.parse(text);
			return message.channel.send(`${body.slip.advice} (#${body.slip.id})`);
		} catch (err) {
			return console.log(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
exports.help = {
         name: "advice",
         description: "Responds with a random bit of advice.",
         usage: "r!advice",
         example: "",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};