const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const axios = require('axios').default;

export = {
    data: new ContextMenuCommandBuilder()
        .setName('view-stats')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client, baseUrl) {
        // gets the player data from db
        let { playerId } = interaction.targetUser   // gets the id of the target player
        console.log('playerId', playerId)
        let campaignId: string = ''; // the targetted plays active campaign
        let data: {
            name: string,
            level: string,
            class: string,
            pfpUrl: string,
            strength: string,
            dexterity: string,
            constitution:string,
            intelligence: string,
            wisdom: string,
            charisma: string
        } = {
            name: '',
            level: '',
            class: '',
            pfpUrl: '',
            strength: '',
            dexterity: '',
            constitution:'',
            intelligence: '',
            wisdom: '',
            charisma: ''
        } // the character data

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

    },
};