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
const { InteractionType } = require('discord.js');
const colorette_1 = require("colorette");
function time() {
    let date = new Date;
    let now = date.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    return now;
}
module.exports = {
    name: 'interactionCreate',
    execute(interaction, client, baseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.isChatInputCommand()) {
                const { commands } = client;
                const { commandName } = interaction;
                const command = commands.get(commandName);
                if (!command)
                    return;
                try {
                    yield command.execute(interaction, client, baseUrl);
                }
                catch (error) {
                    console.error(error);
                    yield interaction.reply({
                        content: `something went wrong here...I'm sure its nothing`,
                        ephemeral: true
                    });
                }
            }
            else if (interaction.isButton()) {
                const { buttons } = client;
                const { customId } = interaction;
                const button = buttons.get(customId);
                if (!button)
                    return new Error(`there's not a button for this`);
                try {
                    yield button.execute(interaction, client);
                }
                catch (error) {
                    console.error(error);
                }
            }
            else if (interaction.isStringSelectMenu()) {
                const { selectMenus } = client;
                const { customId } = interaction;
                const menu = selectMenus.get(customId);
                if (!menu)
                    return new Error("There is no code for this select menu");
                try {
                    yield menu.execute(interaction, client, baseUrl);
                }
                catch (error) {
                    console.error(error);
                }
            }
            else if (interaction.type == InteractionType.ModalSubmit) {
                const { modals } = client;
                const { customId } = interaction;
                const modal = modals.get(customId);
                if (!modal)
                    return new Error("There is no code for this modal");
                try {
                    yield modal.execute(interaction, client);
                }
                catch (error) {
                    console.log(error);
                }
            }
            else if (interaction.isContextMenuCommand()) {
                const { commands } = client;
                const { commandName } = interaction;
                const contextCommand = commands.get(commandName);
                if (!contextCommand)
                    return;
                try {
                    yield contextCommand.execute(interaction, client);
                }
                catch (error) {
                    console.log(error);
                }
            }
            console.log((0, colorette_1.bold)(`Command: `), (0, colorette_1.green)(`${interaction} \n`), (0, colorette_1.bold)(`User: `), (0, colorette_1.green)(`${interaction.user.tag} \n`), (0, colorette_1.bold)(`Server: `), (0, colorette_1.green)(`${interaction.guild.name} \n`), (0, colorette_1.bold)(`Channel: `), (0, colorette_1.green)(`#${interaction.channel.name} \n`), (0, colorette_1.cyan)(`At: ${time()} \n`));
        });
    },
};
//# sourceMappingURL=interactionCreate.js.map