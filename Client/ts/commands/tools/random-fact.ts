const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

export = {
    data: new SlashCommandBuilder()
        .setName('random-fact')
        .setDescription('Get a random fact'),

    async execute(interaction) {
        let reply: string = '';

        await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random')
            .then(res => reply = res.data.text)
            .catch(e => console.log(e))

        interaction.reply(reply || 'fact database unreachable')
    }
};