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
const { QueueRepeatMode } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("loop queue/track/autoplay")
        .addNumberOption(option => option
        .setName("select")
        .setDescription("select an option")
        .setRequired(true)
        .addChoices({ name: 'off', value: QueueRepeatMode.OFF }, { name: "track", value: QueueRepeatMode.TRACK }, { name: 'queue', value: QueueRepeatMode.QUEUE }, { name: 'autoplay', value: QueueRepeatMode.AUTOPLAY })),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue || !queue.isPlaying()) {
                    return interaction.reply({ content: "There is no queue!" });
                }
                const loopMode = interaction.options.getNumber("select");
                queue.setRepeatMode(loopMode);
                const mode = loopMode === QueueRepeatMode.TRACK ? `🔂` : loopMode === QueueRepeatMode.QUEUE ? `🔂` : `▶`;
                return interaction.reply({ content: `${mode} | Updated loop mode` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=loop.js.map