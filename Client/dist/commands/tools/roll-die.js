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
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll-die')
        .setDescription('choose something')
        .addIntegerOption(Option => Option.setName('die-type')
        .setDescription('number of sides of die to roll')
        .setRequired(true)
        .addChoices({ name: 'd4', value: 4 }, { name: 'd6', value: 6 }, { name: 'd8', value: 8 }, { name: 'd10', value: 10 }, { name: 'd12', value: 12 }, { name: 'd20', value: 20 }, { name: 'd100', value: 100 }))
        .addIntegerOption(option2 => option2.setName('die-count')
        .setDescription('number of times to roll')
        .setRequired(false))
        .addIntegerOption(option3 => option3.setName('modifier')
        .setDescription('Ability score modifier')
        .setRequired(false)),
    execute(interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // retrieve user choice and assign to variables
            const user = interaction.user.username;
            const DieType = interaction.options.getInteger('die-type');
            let Rolls = [];
            let Total = 0;
            let DieCount = (_a = interaction.options.getInteger('die-count')) !== null && _a !== void 0 ? _a : 1;
            let Modifier = (_b = interaction.options.getInteger('modifier')) !== null && _b !== void 0 ? _b : 0;
            // set constants
            const flavorText = [
                "Nat 20!!!",
                "Critical fail!",
                "Now thats allot of damage!",
                "Tickle damage",
                " "
            ];
            let flavorChoice = "";
            //functions
            /**
             * Uses math to roll a die
             * @n - die of N sides
             */
            function rolldie(n) {
                return Math.floor(Math.random() * n) + 1;
            }
            ;
            /**
             * decides the flavor test
             * @dietype the type of die rolled
             * @diecount the amount of dies rolled
             * @total total of rolled dies
             */
            function flavorDecider(dietype, diecount, total) {
                if (dietype == 100) {
                    return "4";
                }
                if (dietype == 20 && diecount == 1 && total == 20) {
                    flavorChoice == flavorText[0];
                    return "0";
                }
                else if (dietype == 20 && diecount == 1 && total == 1) {
                    flavorChoice = flavorText[1];
                    return "1";
                }
                ;
                if (diecount > 1 || dietype != 20 && diecount == 1) {
                    if (total > (dietype * diecount) * .75) {
                        return "2";
                    }
                    else if (total < (dietype * diecount) * .25) {
                        return "3";
                    }
                    ;
                }
                return "4";
            }
            //single die
            if (DieCount == 1) {
                Rolls.push(rolldie(DieType));
                Total = Rolls[0];
            }
            // multi die
            else {
                for (let i = 0; i < DieCount; i++) {
                    let result = rolldie(DieType);
                    Rolls.push(result);
                    Total += result;
                }
            }
            ;
            flavorChoice = flavorText[flavorDecider(DieType, DieCount, Total)];
            let TotalPlus = Total + Modifier;
            const embed = new EmbedBuilder()
                .setColor([117, 1, 1])
                .setDescription(flavorChoice)
                .setThumbnail("https://firebasestorage.googleapis.com/v0/b/discord-bots-b3eeb.appspot.com/o/dnd%20logo.png?alt=media&token=c7f1b8db-2c1d-4bb7-b5dd-7d6f016ce798&_gl=1*lutcoe*_ga*MjA4MTQ1Nzg3Ny4xNjc2NTY3NDA1*_ga_CW55HF8NVT*MTY5NjYzNTA2OC4zLjEuMTY5NjYzNTE1MS40OS4wLjA.")
                .addFields({ name: "Player", value: user }, { name: ' ', value: ' ', inline: false }, { name: 'Die Type', value: DieType.toString(), inline: true }, { name: 'Rolls', value: Rolls.toString(), inline: true }, { name: ' ', value: ' ', inline: false }, { name: 'Base', value: Total.toString(), inline: true }, { name: 'Modifier', value: Modifier.toString(), inline: true }, { name: 'Total', value: TotalPlus.toString(), inline: true })
                .setFooter({ text: 'Ox-Bot by YerGodDamnRight' });
            yield interaction.reply({ embeds: [embed] });
        });
    }
};
//# sourceMappingURL=roll-die.js.map