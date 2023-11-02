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
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rick')
        .setDescription('view info on a random Rick & Morty character or location')
        .addStringOption(option => option.setName('category')
        .setDescription('rick and morty stuff')
        .setRequired(true)
        .addChoices({ name: 'characters', value: 'character' }, { name: 'locations', value: 'location' })),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let choice = interaction.options.get('category').value;
            let data = {
                name: '',
                id: '',
                image: '',
                type: '',
                gender: '',
                origin: {
                    name: ''
                },
                species: '',
                status: '',
                dimension: ''
            };
            let random;
            function rando(i) {
                return Math.round(Math.random() * i);
            }
            if (choice == 'character') {
                random = rando(826);
            }
            else {
                random = rando(126);
            }
            try {
                yield axios.get(`https://rickandmortyapi.com/api/${choice}/${random}`)
                    .then(res => {
                    data = res.data;
                });
            }
            catch (_a) {
                interaction.reply({
                    content: "aww jeez man y'know th th the database...thing its not working, its shit, just try again later man",
                    ephemeral: true
                });
            }
            let embed = new EmbedBuilder();
            embed
                .setColor([117, 1, 1])
                .setTitle(data.name)
                .setDescription(`ID: ${data.id.toString()}`)
                .setFooter({ text: 'Ox-Bot by YerGodDamnRight' });
            if (choice == 'character') {
                embed
                    .setImage(data.image)
                    .addFields({ name: 'Type', value: data.type, inline: true }, { name: 'Gender', value: data.gender, inline: true }, { name: 'Home World', value: data.origin.name, inline: true })
                    .addFields({ name: 'Species', value: data.species, inline: true }, { name: 'Status', value: data.status, inline: true });
            }
            else {
                embed
                    .addFields({ name: 'Type', value: String(data.type), inline: true }, { name: 'Dimension', value: String(data.dimension), inline: true });
            }
            interaction.reply({ embeds: [embed] });
        });
    },
};
//# sourceMappingURL=rick.js.map