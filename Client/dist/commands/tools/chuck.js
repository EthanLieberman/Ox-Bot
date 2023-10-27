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
        .setName('chuck')
        .setDescription('Get a random Chuck Norris joke'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let reply = '';
            yield axios.get('https://api.chucknorris.io/jokes/random')
                .then(res => reply = res.data.value)
                .catch(e => console.log(e));
            interaction.reply(reply || 'joke database unreachable');
        });
    }
};
//# sourceMappingURL=chuck.js.map