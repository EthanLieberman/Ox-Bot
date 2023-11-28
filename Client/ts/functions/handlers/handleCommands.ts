import { yellow } from "colorette";
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('path');


export = (client) => {
    client.handleCommands = async () => {
        const { commands, commandArray } = client;
        const commandFolders = fs.readdirSync(path.join(__dirname, `../../commands`));
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(path.join(__dirname, `../../commands/${folder}`))
                .filter(file => file.endsWith('.js'));


            for (const file of commandFiles) {
                const command = require(path.join(__dirname, `../../commands/${folder}/${file}`));
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                // console.log(`Command: ${command.data.name} has passed through the handler`)
            };
        };

        const rest = new REST({ version: '10' }).setToken(process.env.token);
        try {
            console.log(yellow("Started refreshing application (/) commands"));
            await rest.put(Routes.applicationCommands(process.env.clientId), {
                body: commandArray,
            });
            console.log(yellow("Sucessfully reloaded application (/) commands"));
        } catch (error) {
            console.log(error);
        }
    };
};