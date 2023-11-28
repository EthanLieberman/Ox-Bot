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
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("remove a specific track from queue")
        .addIntegerOption(option => option
        .setName("number")
        .setDescription("the number from queue you want to remove ")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue) {
                    return interaction.reply({ content: "There is nothing playing", ephemeral: true });
                }
                const trackIndex = interaction.options.getInteger("number") - 1;
                queue.node.remove(trackIndex);
                interaction.reply(`Removed`);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=remove.js.map