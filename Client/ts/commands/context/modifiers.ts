const { SlashCommandBuilder, EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType, ApplicationCommand } = require('discord.js');
const axios = require('axios').default;

export = {
    data: new ContextMenuCommandBuilder()
        .setName('modifiers')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client, baseUrl) {
        let playerId: string = interaction.targetUser.id;   // the targetted players Id
        let campaignId: string = ''; // the players campaign Id
        let data: {
            strength: string,
            dexterity: string,
            constitution: string,
            intelligence: string,
            wisdom: string,
            charisma: string,
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
        } = {
            strength: '',
            dexterity: '',
            constitution: '',
            intelligence: '',
            wisdom: '',
            charisma: '',
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
                { name: 'Strength', value: String(data.strength || 'N/A'), inline: true },
                { name: 'Dexterity', value: String(data.dexterity || 'N/A'), inline: true },
                { name: 'Constitution', value: String(data.constitution || 'N/a'), inline: true },
            )
            .addFields(
                { name: 'Inteligence', value: String(data.intelligence || 'N/A'), inline: true },
                { name: 'Wisdom', value: String(data.wisdom || 'N/A'), inline: true },
                { name: 'Charisma', value: String(data.charisma || 'N/A'), inline: true }
            )
            .setFooter({ text: 'Ox-Bot by YerGodDamnRight' });

        interaction.reply({ embeds: [embed] });
    }
}