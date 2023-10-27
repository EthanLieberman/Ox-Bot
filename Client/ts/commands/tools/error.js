const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('error')
        .setDescription('creates error'),

    async execute(interaction) {

    }
};