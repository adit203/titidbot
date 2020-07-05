const Discord = require("discord.js"),
      { post } = require("node-superfetch");

exports.run = async (client, message, args) => {
  
  if (!client.config.owners.includes(message.author.id)) return message.reply("You Not Owner");
  
  const embed = new Discord.MessageEmbed()
  .addField("Input", "```js\n" + args.join(" ") + "```");
  
  try {
    const code = args.join(" ");
    if (!code) return message.channel.send("Please include the code.");
    let evaled;
    
    // This method is to prevent someone that you trust, open the secret shit here.
    if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env") || code.includes("client.token")) {
      evaled = "No, shut up, what will you do it with the token?";
    } else {
      evaled = eval(code);
    }
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      // If the output was more than 1024 characters, we're gonna export them into the hastebin.
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
      // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
    } else {
      embed.addField("Output", "```js\n" + output + "```").setColor(0x7289DA)
    }
    
    message.channel.send(embed);
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      // Do the same like above if the error output was more than 1024 characters.
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
    } else {
      embed.addField("Output", "```js\n" + err + "```").setColor(0x7289DA);
    }
    
    message.channel.send(embed);
  }
}

exports.help = {
  name: "eval",
  description: "Evaluate some code.",
  usage: "r!eval <code>",
  example: "r!eval client.commands"
}

exports.conf = {
  aliases: ["ev"]
}

function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}
