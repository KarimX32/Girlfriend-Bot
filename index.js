require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { joinVoiceChannel, createAudioResource, createAudioPlayer, getVoiceConnection } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");
const reply = require('./ai')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES
  ],
});

client.login(process.env.TOKEN);
addSpeechEvent(client, { lang: 'en-US' });

client.on("ready", () => {
    console.log(`Your gf is ready to serve you!`);
});


client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    if(message.content == "!callMyGF"){
        const voiceChannel = message.member?.voice.channel;
        if(!voiceChannel)return message.reply("You need to be in a voice channel to use this command");
        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
    }
});

client.on("speech", async (message) => {
    if(!message.content) return;
    message.content = message.content.replace('f***', 'fuck')
    console.log(message.content)
    let a;
    let resource;
    const player = createAudioPlayer()
    let voiceConnection = await getVoiceConnection(message.guild.id);

    a = await reply(message.author.id, message.content)
  
    // to see all supported languages head to "https://api.ultrax-yt.com/v1/details/supported-tts-languages" 
    // and add at the end of the URL << &language=en >> ofc change en with your prefered language.
    resource = createAudioResource(`https://api.ultrax-yt.com/v1/tts?key=${process.env.X}&query=${a}`)

    voiceConnection.subscribe(player)
    if(a == "Nooo, i still want you to stay, but if you need to go then bye, i'll miss you!") {
        await player.play(resource)
        setTimeout(() => {
            voiceConnection.disconnect()
        }, 7000)
    }
    else player.play(resource)
});
