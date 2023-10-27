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
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('character-setup')
        .setDescription('Generates a link to setup your active character'),
    execute(interaction, client, baseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let playerId = interaction.user.id;
            let campaignId = null;
            yield axios.get(`${baseUrl}/getPrefs/${playerId}`)
                .then(res => campaignId = res.data.active);
            const button = new ButtonBuilder()
                .setLabel(`${campaignId} Character setup`)
                .setStyle(ButtonStyle.Link)
                .setURL(`${baseUrl}?playerId=${playerId}&campaignId=${campaignId}`);
            if (!campaignId) {
                interaction.reply({
                    content: "You dont have an active character or theres a database issue. If you need to make a character, use '/set-campaign' command",
                    ephemeral: true
                });
            }
            else
                interaction.reply({
                    components: [new ActionRowBuilder().addComponents(button)],
                    ephemeral: true
                });
        });
    },
};
//# sourceMappingURL=character-setup.js.map