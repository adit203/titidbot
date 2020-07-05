const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No You No Have **Permission** !");
  if(args[0] == "help"){
    message.reply("Usage: r!tempmute <user> <1s/m/h/d>");
    return;
  } 
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply(" I Dont Have **Permission** Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please Give a reason.");

  let muterole = message.guild.roles.cache.find(x => x.name === "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.message);
    }
  }
  
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Hi! You've been muted for ${mutetime}. Sorry!`)
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }
  

let muteembed = new Discord.MessageEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor("RANDOM")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime)
  .addField("Reason", reason);

  message.channel.send(`<@${tomute.id}> has been muted for ${mutetime} with reason: ${reason}`);

  await(tomute.roles.add(muterole.id));

  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


}
exports.help = {
         name: "tempmute",
         description: "tempmute anyone who break rules.",
         usage: "r!tempmute <time> [reason]",
         example: "r!tempmute 15m spamming",
};

exports.conf = {
          aliases: [""],
          cooldown: 5
};