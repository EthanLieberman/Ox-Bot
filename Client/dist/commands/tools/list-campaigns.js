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
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-campaigns')
        .setDescription('list your campaigns, and active campaign'),
    execute(interaction, client, baseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let playerId = interaction.user.id;
            let active = '';
            let campaigns = [];
            let campaignOutput = '';
            yield axios.get(`${baseUrl}/getPrefs/${playerId}`)
                .then(res => {
                active = res.data.active,
                    campaigns = res.data.campaigns;
            });
            if (!campaigns) {
                interaction.reply({
                    content: 'You dont have any campaigns, or the Database is down',
                    ephemeral: true
                });
                return;
            }
            for (let i = 0; i < campaigns.length; i++) {
                campaignOutput = campaignOutput.concat(`${i + 1}. ${campaigns[i]}\n`);
            }
            ;
            interaction.reply({
                content: `Your active camapign is: ${active}
          
Your campaigns are:
${campaignOutput}

To set your active campaign to another to be able to update that character and use their skills in your rolls, run the bot command "set-campaign" making sure to copy & paste the exact campaign listed above into the options field `,
                ephemeral: true
            });
        });
    }
};
//# sourceMappingURL=list-campaigns.js.map