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
        .setName("jump")
        .setDescription("jump to a specific song in the queue")
        .addIntegerOption(option => option
        .setName("value")
        .setDescription("number of the song")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tracks = interaction.options.getInteger("value");
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue) {
                    return interaction.reply({ content: "There is no queue!" });
                }
                const trackIndex = tracks - 1;
                yield queue.node.jump(trackIndex);
                return interaction.reply({ content: "Jumped successfully successfully!" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=jump.js.map