const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const axios = require('axios');

export = {
    data: new ContextMenuCommandBuilder()
        .setName('modifiers')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client, baseUrl) {
        let playerId: string = interaction.targetUser.id;   // the targetted players Id
        let campaignId: string = ''; // the players campaign Id
        let data: {
            acrobatics: string,
            animalHandling: string,
            arcana:  string,
            athletics: string,
            deception: string,
            history: string,
            insight: string,
            intimidation: string,
            investigation: string,
            medicine: string,
            nature: string,
            perception: string,
            performance: string,
            persuasion: string,
            religion: string,
            sleightOfHand: string,
            stealth: string,
            survival: string,
            name: string,
            class: string,
            level: string,
            pfpUrl: string
        } = {
            acrobatics: '',
            animalHandling: '',
            arcana: '',
            athletics: '',
            deception: '',
            history: '',
            insight: '',
            intimidation: '',
            investigation: '',
            medicine: '',
            nature: '',
            perception: '',
            performance: '',
            persuasion: '',
            religion: '',
            sleightOfHand: '',
            stealth: '',
            survival: '',
            name: '',
            class: '',
            level: '',
            pfpUrl: ''
        };  // the stat data

        let dbClear: boolean = true // if target player has no characters end


        await axios.get(`${baseUrl}/getPrefs/${playerId}`)  // gets player active campaign for campaign Id from DB
        .then(res => campaignId = res.data.active)
        .catch(() => dbClear = false);

        if(!dbClear) {
            interaction.reply({
                content: "Character not found, Database down or they don't have any characters",
                ephemeral: true});
            return
        }

        await axios.get(`${baseUrl}/${playerId}/${campaignId}`) // gets character data from DB
        .then(res => data = res.data);

        let embed = new EmbedBuilder()
            .setColor([117, 1, 1])
            .setTitle(data.name || 'The nameless one')
            .setDescription(`Level: ${data.level} ${data.class} ` || 'Undecided Adventurer')
            .setThumbnail(data.pfpUrl || 'https://styles.redditmedia.com/t5_rjbmv/styles/communityIcon_8eoix3xy09d51.png?width=256&s=d2629df112e2b5adc27afb24f5035083f4333fc1')
            .addFields(
                { name: 'Acrobatics', value: String(data.acrobatics || 'N/A'), inline: true },
                { name: 'Animal Handling', value: String(data.animalHandling || 'N/A'), inline: true },
                { name: 'Arcana', value: String(data.arcana || 'N/a'), inline: true },
                { name: 'Athletics', value: String(data.athletics || 'N/a'), inline: true },
                { name: 'Deception', value: String(data.deception || 'N/a'), inline: true },
                { name: 'History', value: String(data.history || 'N/a'), inline: true }
            )
            .addFields(
                { name: 'Insight', value: String(data.insight || 'N/A'), inline: true },
                { name: 'Intimidation', value: String(data.intimidation || 'N/A'), inline: true },
                { name: 'Investigation', value: String(data.investigation || 'N/A'), inline: true },
                { name: 'Medicine', value: String(data.medicine || 'N/A'), inline: true },
                { name: 'Nature', value: String(data.nature || 'N/A'), inline: true },
                { name: 'Perception', value: String(data.perception || 'N/A'), inline: true }
            )
            .addFields(
                { name: 'Performance', value: String(data.performance || 'N/A'), inline: true },
                { name: 'Persuasion', value: String(data.persuasion || 'N/A'), inline: true },
                { name: 'Religion', value: String(data.religion || 'N/A'), inline: true },
                { name: 'Sleight Of Hand', value: String(data.sleightOfHand || 'N/A'), inline: true },
                { name: 'Stealth', value: String(data.stealth || 'N/A'), inline: true },
                { name: 'Survival', value: String(data.survival || 'N/A'), inline: true }
            )
            .setFooter({ text: 'Ox-Bot by YerGodDamnRight' });

        interaction.reply({ embeds: [embed] });
    }
}