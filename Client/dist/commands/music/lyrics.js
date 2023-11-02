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
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { lyricsExtractor } = require("@discord-player/extractor");
const search = lyricsExtractor();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("song to search lyrics")
        .addStringOption(option => option
        .setName("name")
        .setDescription("name of song")),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield interaction.deferReply("working");
                const queue = interaction.client.player.nodes.get(interaction.guild);
                const music = interaction.options.getString("name");
                if (!queue && !music) {
                    return interaction.editReply({ content: "There is no queue and you didn't mention any song name!" });
                }
                if (queue || music) {
                    const result = yield search.search(music !== null && music !== void 0 ? music : queue.currentTrack.title);
                    if (!result) {
                        return interaction.editReply({ content: `No lyrics found for: ${music ? music : queue.currentTrack.title}` });
                    }
                    const trimmedLyrics = result.lyrics.substring(0, 1997);
                    const embed = new EmbedBuilder()
                        .setTitle(`${result.title}`)
                        .setThumbnail(`${result.thumbnail}`)
                        .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics);
                    yield interaction.editReply({ embeds: [embed] });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
//# sourceMappingURL=lyrics.js.map