const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios')

export = {
    data: new SlashCommandBuilder()
        .setName('list-campaigns')
        .setDescription('list your campaigns, and active campaign'),

    async execute(interaction, client, baseUrl) {

      let playerId: string = interaction.user.id;
      let active: string = '';
      let campaigns: [] = []
      let campaignOutput = ''


        await axios.get(`${baseUrl}/getPrefs/${playerId}`)
        .then(res => {
          active = res.data.active,
          campaigns = res.data.campaigns
        })

        if (!campaigns) {
          interaction.reply({
            content: 'You dont have any campaigns, or the Database is down',
            ephemeral: true
          });

          return
        }

        for (let i: number = 0; i < campaigns.length; i++) {
          campaignOutput = campaignOutput.concat(`${i+1}. ${campaigns[i]}\n`)
        };

        interaction.reply({
          content: `Your active camapign is: ${active}
          
Your campaigns are:
${campaignOutput}

To set your active campaign to another to be able to update that character and use their skills in your rolls, run the bot command "set-campaign" making sure to copy & paste the exact campaign listed above into the options field `,

          ephemeral: true
        })
    }
};