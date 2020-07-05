const Discord = require("discord.js");
const tutorialBot = require("./handler/ClientBuilder.js"); // We're gonna create this soon.
const client = new tutorialBot({disableEveryone: true, partials: ["MESSAGE", "CHANNEL"]});
const db = require('quick.db');
const { badwords } = require('./data.json');
const { Client, Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const configs = require('./config.json')
const dotenv = require('dotenv').config()
require('./index.js')


const TOKEN = process.env.SECRET;
const PREFIX = configs.prefix

const GOOGLE_API_KEY = process.env.YTAPI_KEY

const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();


client.on("warn", console.warn);
client.on("error", console.error);
client.on("ready", () => console.log(`${client.user.tag} has been successfully turned on!`));
client.on("shardDisconnect", (event, id) => console.log(`Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect!`));
client.on("shardReconnecting", (id) => console.log(`Shard ${id} reconnecting...`));

client.on("message", async msg => {// eslint-disable-line
    if (msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.split(" ");
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    const serverQueue = queue.get(msg.guild.id);
  
  let musics = msg.content.toLowerCase().split(" ")[0];
    musics = musics.slice(PREFIX.length);

  

    if (musics === "sb!musichelp" || musics === "sb!musiccmd") {
        const helpembed = new Discord.MessageEmbed()
            .setColor("#7289DA")
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription(`
__**Commands List**__
> \`play\` > **\`play [title/url]\`**
> \`search\` > **\`search [title]\`**
> \`skip\`, \`stop\`,  \`pause\`, \`resume\`
> \`nowplaying\`, \`queue\`, \`volume\``)
            .setFooter("©️ 2020 Zealcord Development", "https://app.zealcord.xyz/assets/Logo.png");
        msg.channel.send(helpembed);
    }
    if (musics === "play" || musics === "p") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play a music!");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.channel.send("Sorry, but I need **`CONNECT`** permissions to proceed!");
        }
        if (!permissions.has("SPEAK")) {
            return msg.channel.send("Sorry, but I need **`SPEAK`** permissions to proceed!");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`<:yes:591629527571234819>  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var video = await youtube.getVideoByID(videos[0].id);
                    if (!video) return msg.channel.send("🆘  **|**  I could not obtain any search results.");
                } catch (err) {
                    console.error(err);
                    return msg.channel.send("🆘  **|**  I could not obtain any search results.");
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    }
    if (musics === "search" || musics === "sc") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play a music!");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.channel.send("Sorry, but I need **`CONNECT`** permissions to proceed!");
        }
        if (!permissions.has("SPEAK")) {
            return msg.channel.send("Sorry, but I need **`SPEAK`** permissions to proceed!");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`<a:b_yes:721969088813072425>  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    msg.channel.send(`
__**Song selection**__
${videos.map(video2 => `**\`${++index}\`  |**  ${video2.title}`).join("\n")}
Please provide a value to select one of the search results ranging from 1-10.
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            max: 1,
                            time: 10000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send("No or invalid value entered, cancelling video selection...");
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send("🆘  **|**  I could not obtain any search results.");
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }

    } else if (musics === "skip") {
        if (!msg.member.voice.channel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play a music!");
        if (!serverQueue) return msg.channel.send("There is nothing playing that I could **\`skip\`** for you.");
        serverQueue.connection.dispatcher.end("<a:b_yes:721969088813072425>  **|** Skip command has been used!");
        return msg.channel.send("⏭️  **|**  Skip command has been used!");

    } else if (musics === "stop") {
        if (!msg.member.voice.channel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play music!");
        if (!serverQueue) return msg.channel.send("There is nothing playing that I could **\`stop\`** for you.");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("<a:b_yes:721969088813072425>  **|** Stop command has been used!");
        return msg.channel.send("⏹️  **|**  Stop command has been used!");

    } else if (musics === "volume" || musics === "vol") {
        if (!msg.member.voice.channel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play music!");
        if (!serverQueue) return msg.channel.send("There is nothing playing.");
        if (!args[1]) return msg.channel.send(`The current volume is: **\`${serverQueue.volume}%\`**`);
        if (isNaN(args[1]) || args[1] > 100) return msg.channel.send("Volume only can be set in range **1** - **100**.");
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolume(args[1] / 100);
        return msg.channel.send(`<a:b_yes:721969088813072425>  **|** succes set the volume to: **\`${args[1]}%\`**`);

    } else if (musics === "nowplaying" || musics === "np") {
        if (!serverQueue) return msg.channel.send("There is nothing playing.");
        return msg.channel.send(`🎶  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`);

    } else if (musics === "queue" || musics === "q") {
        if (!serverQueue) return msg.channel.send("There is nothing playing.");
        return msg.channel.send(`
__**Song Queue**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
**Now Playing: \`${serverQueue.songs[0].title}\`**
        `);

    } else if (musics === "pause") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send("⏸  **|**  Paused the music for you!");
        }
        return msg.channel.send("There is nothing playing.");

    } else if (musics === "resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send("▶  **|**  Resumed the music for you!");
        }
        return msg.channel.send("There is nothing playing.");
    } else if (msg.content === "sb!loop") {
        if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return msg.channel.send(`:repeat: **|** Loop ${serverQueue.loop === true ? "enabled" : "disabled"}!`);
        };
        return msg.channel.send("There is nothing playing.");
    }
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: **\`${error}\`**`);
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return;
        else return msg.channel.send(`<a:b_yes:721969088813072425>  **|** **\`${song.title}\`** has been added to the queue!`);
    }
    return;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        return queue.delete(guild.id);
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolume(serverQueue.volume / 100);

    serverQueue.textChannel.send({
        embed: {
            color: "#7289DA",
            description: `🎶  **|**  Start Playing: **\`${song.title}\`**`
        }
    })
}


let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment'),
    fetch = require('node-fetch')

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#7289DA",
        reaction: "🎉"
    }
});
client.on("guildCreate", guild => {
  client.channels.cache.get('719932136752283678').send(`New Guild Joined: (${guild.name}) This Guild has ${guild.memberCount} Members!`)
});
client.on("guildDelete", guild => {
    client.channels.cache.get('719932136752283678').send(`I Have been removed from: (${guild.name}) This Guild has ${guild.memberCount} Members :/`)
})

client.on('ready', () => {
  const presenceOptions = {
      status: "dnd",
    activity: {
        type: "WATCHING",
        name: `${client.users.cache.size} Users | r!help`
    }
  }
  

    client.user.setPresence(presenceOptions)
  console.log(`${client.user.username} Is Online !`)

})

client.on('message', async message => {
  let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = configs.prefix;

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${prefix}\``);
  }
})

client.on('message', async message => {
 if (message.author.bot) return;
  if(!message.member.hasPermission("ADMINISTRATOR")){
  let confirm = false;
    //NOW WE WILL USE FOR LOOP
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.includes(badwords[i].toLowerCase()))
        confirm = true;
      
    }
    
    if(confirm) {
      message.delete()
      return message.channel.send("You are not allowed to send badwords here")
    }    
    
    
  }})

client.on('message', async message => {
  if (message.author.bot) return;
  let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = configs.prefix;
 // customized. you can change it whatever you want.
  if (!message.content.startsWith(prefix)) return; // use this. so your bot will be only executed with prefix.
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  
  if (msg.startsWith(prefix + 'info')) {
    cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
      
      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const guild = client.guilds.cache.size.toLocaleString() // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
      const user = client.users.cache.size.toLocaleString() // Counting how many members in the server that invite your bot.
      const channel = client.channels.cache.size.toLocaleString() // Counting how many channels in the server that invite your bot.
      const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
      const Node = process.version // Your node version.
      const CPU = percent.toFixed(2) // Your CPU usage.
      
      const embed = new Discord.MessageEmbed() // Stable or < below than 11.x.x use RichEmbed. More than 12.x.x or Master or https://github.com/discordjs/discord.js/ (github:discordjs/discord.js) use MessageEmbed.
      // Actually they are exactly the same.
      embed.setTitle(`${client.user.username} Info`)
      embed.setTimestamp()
      embed.setFooter(`Request By: ${message.author.username}`, client.user.displayAvatarURL())
      embed.setColor(0x7289DA)
      embed.addField('Bot Owner', `\`\`\`Kang Baso #5038\`\`\``)
      embed.addField('Created At', `\`\`\`${client.user.createdAt}\`\`\``)
      embed.addField('Bot Prefix', `\`\`\`r!\`\`\``)
      embed.addField('Bot Version', `\`\`\`v2.0\`\`\``)
      embed.addField('Bot Liblary', `\`\`\`discord.js v12.2.0\`\`\``)
      embed.addField('Bot Statistics:', `\`\`\`Server: ${guild} \nUser: ${user} \nChannel: ${channel} \nUsage: ${usage} \nNode: ${Node} \nCPU Usage: ${CPU}%\`\`\``) // Use Grave accent or `` 
      // (its on your keyboard, besides on number 1.)
      // Use \n to make a new line.
      embed.addField('Physical Statistics:', `\`\`\`CPU: ${cores} - ${cpuModel} \nUptime: ${parseDur(client.uptime)}\`\`\``)
      embed.addField('Official Website','[Click Here !](https://started-bots.glitch.me)')
      embed.addField('Support Server','[Click Here !](https://discord.gg/hPRBBuG)')
      embed.addField('Vote','```Soon```')
      // Let's test it!
      // Use ** turn the text into bold.
      // Let's test again.
      message.channel.send(embed)
  
    })
  }if (msg.startsWith(prefix + "spotify")) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }
    
    let convert = require('parse-ms')
    
    let status = user.presence.activities[0];
    
    if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("This user isn't listening the Spotify.");
    
    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
      let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
          url = `https://open.spotify.com/track/${status.syncID}`,
          name = status.details,
          artist = status.state,
          album = status.assets.largeText,
          timeStart = status.timestamps.start,
          timeEnd = status.timestamps.end,
          timeConvert = convert(timeEnd - timeStart);
      
      let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
      let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
      
      let time = `${minutes}:${seconds}`;
      
      const embed = new Discord.MessageEmbed()
      .setAuthor("Spotify Track Information", "https://image.flaticon.com/icons/svg/2111/2111624.svg")
      .setColor(0x7289DA)
      .setThumbnail(image)
      .addField("Name:", name, true)
      .addField("Album:", album, true)
      .addField("Artist:", artist, true)
      .addField("Duration:", time, false)
      .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
      message.channel.send(embed)
    }
  }      
})
client.on('message', async message => {
  let afk = new db.table("AFKs"),
      authorStatus = await afk.fetch(message.author.id),
      mentioned = message.mentions.members.first();
  
  if (mentioned) {
    let status = await afk.fetch(mentioned.id);
    
    if (status) {
      const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA)
      .setDescription(`<a:Angerrr:721970136705138718> **This user (${mentioned.user.tag}) is AFK:** **${status}**`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    }
  }
  
  if (authorStatus) {
    const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setDescription(`**${message.author.tag}** is no longer AFK.`)
    message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    afk.delete(message.author.id)
  }
})

client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let wembed = new Discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor(0x7289DA)
  .setThumbnail(member.user.avatarURL())
  .setDescription(`<a:happy:721971207678722048> We are very happy to have you in our server i hope you enjoy :)`)
  .setImage("https://i.pinimg.com/originals/88/81/44/8881444f23794650da1fe33c1bed39e0.gif");
  
  client.channels.cache.get(chx).send(wembed)
})
client.on("guildMemberRemove", (member) => {
  let chx = db.get(`byechannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let lembed = new Discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor(0x7289DA)
  .setThumbnail(member.user.avatarURL())
  .setDescription(`<:bearcry:721971150929920070> We are very sad if you out we hope you comeback`)
  .setImage("https://media.tenor.com/images/bb2599195ea28683463badc924f01c81/tenor.gif")
  
  client.channels.cache.get(chx).send(lembed)
    
})

client.package = require("./package.json");
client.on("warn", console.warn); // This will warn you via logs if there was something wrong with your bot.
client.on("error", console.error); // This will send you an error message via logs if there was something missing with your coding.
client.login(process.env.SECRET).catch(console.error); // This token will leads to the .env file. It's safe in there.
function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} // Create MB, KB, TB or something in the back of your memory counters.

function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }
  
  return `${seconds} second(s)`
}
