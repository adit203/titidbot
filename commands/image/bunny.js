const request = require('node-superfetch');

exports.run = async(client, message, args) => {
		try {
			const { body } = await request
				.get('https://api.bunnies.io/v2/loop/random/')
				.query({ media: 'gif,png' });
			let fileToSend;
			let fileType = 'gif';
			const gif = await request.get(body.media.gif);
			if (Buffer.byteLength(gif.body) > 8e+6) {
				const poster = await request.get(body.media.poster);
				fileToSend = poster.body;
				fileType = 'png';
			} else {
				fileToSend = gif.body;
			}
			return message.channel.send({ files: [{ attachment: fileToSend, name: `${body.id}.${fileType}` }] });
		} catch (err) {
			return console.log(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
}
exports.help = {
         name: "bunny",
         description: "show bunny image",
         usage: "r!bunny",
         example: "",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};