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
const { REST, Routes } = require('discord.js');
const chalk = require('chalk');
const fs = require('node:fs');
module.exports = (client) => {
    client.handleCommands = () => __awaiter(void 0, void 0, void 0, function* () {
        const { commands, commandArray } = client;
        const commandFolders = fs.readdirSync(`./commands`);
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`)
                .filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                // console.log(`Command: ${command.data.name} has passed through the handler`)
            }
            ;
        }
        ;
        const rest = new REST({ version: '10' }).setToken(process.env.token);
        try {
            console.log(chalk.yellow("Started refreshing application (/) commands"));
            yield rest.put(Routes.applicationCommands(process.env.clientId), {
                body: commandArray,
            });
            console.log(chalk.yellow("Sucessfully reloaded application (/) commands"));
        }
        catch (error) {
            console.log(error);
        }
    });
};
//# sourceMappingURL=handleCommands.js.map