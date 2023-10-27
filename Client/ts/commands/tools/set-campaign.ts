const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios')

export = {
    data: new SlashCommandBuilder()
        .setName('set-campaign')
        .setDescription('sets your active campaign or creates a new one')
        .addStringOption(option => 
          option.setName('campaign')
          .setDescription('enter your campaign')
          .setRequired(true)
        ),

    async execute(interaction, client, baseUrl) {

      let playerId: string = interaction.user.id;
      let data: string = interaction.options.get('campaign').value
      let serverRes: string = '';


        await axios.post(`${baseUrl}/updatePrefs`, {
            playerId: playerId,
            data: data
        })
        .then(res => serverRes = res.data)

        interaction.reply({
          content: serverRes,
          ephemeral: true
          })
    }
};