const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

export = {
    data: new SlashCommandBuilder()
        .setName('delete-campaign')
        .setDescription('delete a campaign and its character')
        .addStringOption(option => 
          option.setName('campaign')
          .setDescription('enter your campaign')
          .setRequired(true)
          ),

    async execute(interaction, client, baseUrl) {

      let playerId: string = interaction.user.id;
      let campaignId: string = interaction.options.get('campaign').value;
      let serverRes: string = '';

      
        await axios.post(`${baseUrl}/delChar`, {
          playerId: playerId,
          data: campaignId
        })
        .then(res => serverRes = res.data)


        await interaction.reply({
          content: serverRes,
          ephemeral: true
        })
    }
};