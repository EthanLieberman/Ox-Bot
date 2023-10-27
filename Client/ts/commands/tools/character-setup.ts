const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');

export = {
    data: new SlashCommandBuilder()
        .setName('character-setup')
        .setDescription('Generates a link to setup your active character'),

    async execute(interaction, client, baseUrl) {
        let playerId = interaction.user.id;
        let campaignId = null;

        await axios.get(`${baseUrl}/getPrefs/${playerId}`)
        .then(res => campaignId = res.data.active)


        const button = new ButtonBuilder()
            .setLabel(`${campaignId} Character setup`)
            .setStyle(ButtonStyle.Link)
            .setURL(`${baseUrl}?playerId=${playerId}&campaignId=${campaignId}`);


        if (!campaignId) {
            interaction.reply({
                content: "You dont have an active character or theres a database issue. If you need to make a character, use '/set-campaign' command",
                ephemeral: true
            })
        } else
            interaction.reply({
                components: [new ActionRowBuilder().addComponents(button)],
                ephemeral: true
        });
    },
};