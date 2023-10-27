const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

export = {
    data: new SlashCommandBuilder()
        .setName('roll-die')
        .setDescription('choose something')
        .addIntegerOption(Option =>
            Option.setName('die-type')
                .setDescription('number of sides of die to roll')
                .setRequired(true)
                .addChoices(
                    { name: 'd4', value: 4 },
                    { name: 'd6', value: 6 },
                    { name: 'd8', value: 8 },
                    { name: 'd10', value: 10 },
                    { name: 'd12', value: 12 },
                    { name: 'd20', value: 20 },
                    { name: 'd100', value: 100 }
                ))
        .addIntegerOption(option2 =>
            option2.setName('die-count')
                .setDescription('number of times to roll')
                .setRequired(false))
        .addIntegerOption(option3 =>
            option3.setName('modifier')
                .setDescription('Ability score modifier')
                .setRequired(false)),

    async execute(interaction: any) {
        // retrieve user choice and assign to variables
        const user: string = interaction.user.username
        const DieType: number = interaction.options.getInteger('die-type');
        let Rolls: number[] = [];
        let Total: number = 0;
        let DieCount: number = interaction.options.getInteger('die-count') ?? 1;
        let Modifier: number = interaction.options.getInteger('modifier') ?? 0;

        // set constants
        const flavorText: string[] = [
            "Nat 20!!!",
            "Critical fail!",
            "Now thats allot of damage!",
            "Tickle damage",
            " "
        ];
        let flavorChoice: string = "";

        //functions
        /**
         * Uses math to roll a die
         * @n - die of N sides
         */
        function rolldie(n: number): number {
            return Math.floor(Math.random()* n) + 1;
        };

        /**
         * decides the flavor test
         * @dietype the type of die rolled
         * @diecount the amount of dies rolled
         * @total total of rolled dies
         */
        function flavorDecider(dietype: number, diecount: number, total: number): string {

            if(dietype == 100){
                return "4";
            }

            if(dietype == 20 && diecount == 1 && total == 20) {
                flavorChoice == flavorText[0];
                return "0";
            }
            else if (dietype == 20 && diecount == 1 && total == 1) {
                flavorChoice = flavorText[1];
                return "1";
            };

            if(diecount > 1 || dietype != 20 && diecount == 1) {

                if (total > (dietype * diecount) * .75) {
                    return "2";
                }
                else if (total < (dietype * diecount) * .25) {
                    return "3";
                };
            }

            return "4"
        }
        
        //single die
        if(DieCount == 1) {
            Rolls.push(rolldie(DieType));
            Total = Rolls[0];
        }

        // multi die
        else {
            for (let i: number = 0; i < DieCount; i++) {
                let result: number = rolldie(DieType)
                Rolls.push(result)
                Total += result
            }
        };

        flavorChoice = flavorText[flavorDecider(DieType, DieCount, Total)]
        let TotalPlus = Total + Modifier;

        const embed = new EmbedBuilder()
                .setColor([117, 1, 1])
                .setDescription(flavorChoice)
                .setThumbnail("https://firebasestorage.googleapis.com/v0/b/discord-bots-b3eeb.appspot.com/o/dnd%20logo.png?alt=media&token=c7f1b8db-2c1d-4bb7-b5dd-7d6f016ce798&_gl=1*lutcoe*_ga*MjA4MTQ1Nzg3Ny4xNjc2NTY3NDA1*_ga_CW55HF8NVT*MTY5NjYzNTA2OC4zLjEuMTY5NjYzNTE1MS40OS4wLjA.")
                .addFields(
                    { name: "Player", value: user},

                    { name: ' ', value: ' ', inline: false},

                    { name: 'Die Type', value: DieType.toString(), inline: true},
                    { name: 'Rolls', value: Rolls.toString(), inline: true},

                    { name: ' ', value: ' ', inline: false},

                    { name: 'Base', value: Total.toString(), inline: true},
                    { name: 'Modifier', value: Modifier.toString(), inline: true},
                    { name: 'Total', value: TotalPlus.toString(), inline: true},
                )
                .setFooter({ text: 'Ox-Bot by YerGodDamnRight' });

            await interaction.reply({ embeds: [embed] });

    }
};