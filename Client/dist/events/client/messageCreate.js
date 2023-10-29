"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const settings = {
    prefix: '!'
};
module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            // const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
            // const command = args.shift();
            // if (!message.member.voice.channel) return;
            // if (message.content.slice(0, 1) != settings.prefix) return;
            // let guildQueue = client.player.getQueue(message.guild.id);
            // // client.channels.fetch('1004091189689061576').then(channel => channel.send('earg'))
            // // admin = false
            // // message.guild.members.fetch(message.author.id).then(
            // //     res => { admin = res.permissions.has('0x0000000000000008') }
            // // )
            // // await wait(500)
            // // if (admin) {
            //     if (command === 'play') {
            //         let queue = client.player.createQueue(message.guild.id);
            //         await queue.join(message.member.voice.channel);
            //         let song = await queue.play(args.join(' ')).catch(err => {
            //             console.log(err);
            //             if (!guildQueue)
            //                 queue.stop();
            //         });
            //         // console.log(song)
            //         const embed = new EmbedBuilder()
            //             .setTitle(song.name)
            //             // .setThumbnail()
            //             .setDescription(song.author)
            //             .setImage(song.thumbnail)
            //             .setURL(song.url)
            //             .setFooter({ text: song.duration });
            //         client.channels.fetch(message.channelId).then(channel => channel.send({ embeds: [embed] }))
            //     }
            //     if (command === 'playlist') {
            //         let queue = client.player.createQueue(message.guild.id);
            //         await queue.join(message.member.voice.channel);
            //         let song = await queue.playlist(args.join(' ')).catch(err => {
            //             console.log(err);
            //             if (!guildQueue)
            //                 queue.stop();
            //         });
            //     }
            //     if (command === 'skip') {
            //         guildQueue.skip();
            //     }
            //     if (command === 'stop') {
            //         guildQueue.stop();
            //     }
            //     if (command === 'removeLoop') {
            //         guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
            //     }
            //     if (command === 'toggleLoop') {
            //         guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
            //     }
            //     if (command === 'toggleQueueLoop') {
            //         guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
            //     }
            //     if (command === 'setVolume') {
            //         guildQueue.setVolume(parseInt(args[0]));
            //     }
            //     if (command === 'seek') {
            //         guildQueue.seek(parseInt(args[0]) * 1000);
            //     }
            //     if (command === 'clearQueue') {
            //         guildQueue.clearQueue();
            //     }
            //     if (command === 'shuffle') {
            //         guildQueue.shuffle();
            //     }
            //     if (command === 'getQueue') {
            //         // console.log(guildQueue.songs[0].name);
            //         let songs = '***Queue:*** \n'
            //         for (let i = 0; i < guildQueue.songs.length; i++) {
            //             songs += `${i + 1}: ${guildQueue.songs[i].name} \n`
            //         }
            //         client.channels.fetch(message.channelId).then(channel => channel.send(songs))
            //     }
            //     if (command === 'getVolume') {
            //         console.log(guildQueue.volume)
            //     }
            //     if (command === 'nowPlaying') {
            //         console.log(`Now playing: ${guildQueue.nowPlaying}`);
            //         client.channels.fetch(message.channelId).then(channel => channel.send(`***Curently playing:*** \n${guildQueue.songs[0].name}`))
            //     }
            //     if (command === 'pause') {
            //         guildQueue.setPaused(true);
            //     }
            //     if (command === 'resume') {
            //         guildQueue.setPaused(false);
            //     }
            //     if (command === 'remove') {
            //         guildQueue.remove(parseInt(args[0]));
            //     }
            //     if (command === 'createProgressBar') {
            //         const ProgressBar = guildQueue.createProgressBar();
            //         // [======>              ][00:35/2:20]
            //         console.log(ProgressBar.prettier);
            //     }
        });
    }
};
//# sourceMappingURL=messageCreate.js.map