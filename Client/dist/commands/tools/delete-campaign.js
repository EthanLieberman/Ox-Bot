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
        .setName('delete-campaign')
        .setDescription('delete a campaign and its character')
        .addStringOption(option => option.setName('campaign')
        .setDescription('enter your campaign')
        .setRequired(true)),
    execute(interaction, client, baseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let playerId = interaction.user.id;
            let campaignId = interaction.options.get('campaign').value;
            let serverRes = '';
            yield axios.post(`${baseUrl}/delChar`, {
                playerId: playerId,
                data: campaignId
            })
                .then(res => serverRes = res.data);
            yield interaction.reply({
                content: serverRes,
                ephemeral: true
            });
        });
    }
};
//# sourceMappingURL=delete-campaign.js.map