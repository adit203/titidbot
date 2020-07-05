const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const types = {
	dm: 'DM',
	group: 'Group DM',
	text: 'Text Channel',
	voice: 'Voice Channel',
	category: 'Category',
	unknown: 'Unknown'
};
exports.run = (client, message, args) => {
		const embed = new MessageEmbed()
			.setColor(0x7289DA)
			.addField('❯ Name', message.channel.type === 'dm' ? `@${message.channel.recipient.username}` : message.channel.name, true)
			.addField('❯ ID', message.channel.id, true)
			.addField('❯ NSFW', message.channel.nsfw ? 'Yes' : 'No', true)
			.addField('❯ Category', message.channel.parent ? message.channel.parent.name : 'None', true)
			.addField('❯ Type', types[message.channel.type], true)
			.addField('❯ Creation Date', moment.utc(message.channel.createdAt).format('MM/DD/YYYY h:mm A'), true)
			.addField('❯ Topic', message.channel.topic || 'None');
 message.channel.send(embed);
	}
exports.help = {
         name: "channel",
         description: "view the channel info",
         usage: "r!channel",
         example: "",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};