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
        .setName("volume")
        .setDescription("set volume")
        .addIntegerOption(option => option
        .setName("number")
        .setDescription("number of volume")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue || !queue.isPlaying()) {
                    return interaction.reply("There is nothing playing");
                }
                const vol = parseInt(interaction.options.getInteger("number"));
                if (!vol) {
                    return interaction.reply(`Current volume is ${queue.node.volume}`);
                }
                const success = queue.node.setVolume(vol);
                interaction.reply({ content: success ? `volume set to ${vol}` : "something went wrong" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=volume.js.map