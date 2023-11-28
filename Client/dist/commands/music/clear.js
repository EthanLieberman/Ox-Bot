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
        .setName("clear")
        .setDescription("clear the queue"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield interaction.deferReply();
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue) {
                    return interaction.editReply({ content: "There is no queue!" });
                }
                yield queue.tracks.clear();
                return interaction.editReply({ content: "Queue cleared successfully!" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=clear.js.map