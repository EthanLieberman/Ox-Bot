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
        .setName("skip")
        .setDescription("skip current song"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue || !queue.isPlaying()) {
                    return interaction.reply({ content: "There is nothing playing" });
                }
                const currentTrack = queue.current;
                const success = queue.node.skip();
                return interaction.reply({ content: `Skipped ${queue.currentTrack}` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=skip.js.map