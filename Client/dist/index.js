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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fs = require('node:fs');
const ngrok = require('ngrok');
const colorette_1 = require("colorette");
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
//music player setup
const { Player } = require('discord-player');
// Add the player on the client
client.player = new Player(client, {
    deafenOnJoin: true,
    lagMonitor: 1000,
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});
client.player.events.on('playerStart', (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));
client.player.events.on('error', (queue, error) => console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`));
client.player.events.on('debug', (_queue, message) => console.log(`${(0, colorette_1.blue)('DEBUG:')}' ${(0, colorette_1.gray)(message)}\n`));
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
// Ngrok local host tunnel start
let baseUrl = '';
const rokStart = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield ngrok.connect({
        addr: 3000,
        authtoken: process.env.authTokenNgrok,
        region: 'us'
    });
    const res = yield ngrok.getApi().listTunnels();
    baseUrl = res.tunnels[0].public_url;
    console.log(`Ngrok URL: ${(0, colorette_1.cyan)(baseUrl)}`);
});
// async funtion calling rokStart to start and awaits its completeion
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield rokStart();
    const functionFolders = fs.readdirSync(`./functions`);
    for (const folder of functionFolders) {
        const functionFiles = fs
            .readdirSync(`./functions/${folder}`)
            .filter(file => file.endsWith('.js'));
        for (const file of functionFiles)
            require(`./functions/${folder}/${file}`)(client, client.player, baseUrl, process.env.token);
    }
    client.handleEvents();
    client.handleCommands();
    // client.handleComponents();
    client.login(process.env.token);
}))();
setTimeout(() => {
    process.exit(0);
}, 1000 * 60 * 60 * 24);
//# sourceMappingURL=index.js.map