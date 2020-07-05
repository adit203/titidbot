exports.run = (client, message, args) => {
    if (!args[0]) return message.reply("Please specify the bug. Example:\n`/punch isn't working. It isn't mentioning the user I'm trying to punch`");
    if (args[0] === "bug") return message.reply("Please specify the bug. Example:\n`/punch isn't working. It isn't mentioning the user I'm trying to punch`");
    args = args.join(" ");
    message.reply("Thanks for submitting a bug!");
    const content = `\`\`\`**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**\`\`\``;
    client.channels.cache.get('724446061305004094').send(content)
}
exports.help = {
  name: "bug",
  description: "report a bug ",
  usage: "r!bug <bug>",
  example: "r!bug createrole command not work"
}
exports.conf = {
  aliases: [""],
  cooldown: 5
}