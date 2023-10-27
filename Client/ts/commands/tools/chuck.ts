const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

export = {
    data: new SlashCommandBuilder()
        .setName('chuck')
        .setDescription('Get a random Chuck Norris joke'),

    async execute(interaction) {
        let reply: string = '';

        await axios.get('https://api.chucknorris.io/jokes/random')
            .then(res => reply = res.data.value)
            .catch(e => console.log(e))

        interaction.reply(reply || 'joke database unreachable')
    }
};