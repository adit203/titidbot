exports.run = (client, message) => {
   let args = message.content.split(" ").slice(1);
    message.delete();
    if (message.content.includes("@everyone")  || message.content.includes("@here")) return message.channel.send("You ain't making me Ping anyone BOI!");
    message.channel.send(args.join(" ")).cleanContent;
};

exports.conf = {
    cooldown: 5,
    aliases: [],
};

exports.help = {
    name: "say",
    description: "r!Makes the bot repeat your message.",
    usage: "r!say [message]"
};