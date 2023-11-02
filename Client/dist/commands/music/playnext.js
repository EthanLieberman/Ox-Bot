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
const { QueryType } = require("discord-player");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("playnext")
        .setDescription("song to play next right after the one is playing right now")
        .addStringOption(option => option
        .setName("name")
        .setDescription("name of song")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queue = interaction.client.player.nodes.get(interaction.guild);
                if (!queue || !queue.isPlaying()) {
                    return interaction.reply({ content: 'There is nothing playing' });
                }
                const query = interaction.options.getString("name");
                const searchResults = yield interaction.client.player.search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                });
                if (!searchResults || !searchResults.tracks.length) {
                    return interaction.reply({ content: 'No results' });
                }
                queue.node.insert(searchResults.tracks[0]);
                yield interaction.reply("Successfully changed the order");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=playnext.js.map