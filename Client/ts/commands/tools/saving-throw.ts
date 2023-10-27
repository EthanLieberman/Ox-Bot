const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

export = {
    data: new SlashCommandBuilder()
        .setName('saving-throw')
        .setDescription('make a saving throw')
        .addStringOption(option =>
            option.setName('check-type')
                .setDescription('select what saving throw to make')
                .setRequired(true)
                .addChoices(
                    { name: 'strength save', value: 'strSave' },
                    { name: 'dexterity save', value: 'dexSave' },
                    { name: 'constitution save', value: 'conSave' },
                    { name: 'intelligence save', value: 'intSave' },
                    { name: 'wisdom save', value: 'wisSave' },
                    { name: 'charisma save', value: 'chaSave' }
                    ))
        .addStringOption(option2 =>
            option2.setName('modify')
                .setDescription('roll with advantage or disadvantage')
                .setRequired(false)
                .addChoices(
                    { name: 'advantage', value: 'advantage' },
                    { name: 'disadvantage', value: 'disadvantage' },
                )),

      async execute(interaction, client, baseUrl) {
        const playerId: string = interaction.user.id  //player numberic ID
        const username: string = interaction.user.username; // player Username
        const avatar: string = interaction.user.avatarURL(); // player pfp
        const checkType: string = interaction.options.get('check-type').value;  //Type of skill check for DB
        let campaignId: string = '';  // Campaign Id for DB
        let dbClear: boolean = true; // database ok flag
        
        let modify: string = 'none';  // Advantage or disadvantage
        
        if (interaction.options.get('modify')) {  // If optional dis/advantage selected
            modify = interaction.options.get('modify').value;
        }

        let skill: number = 0; // value of skill from DB
        
        const random = () => {  // random rolls of a D20
          return Math.floor(Math.random() * 20 ) + 1;
        }

        await axios.get(`${baseUrl}/getPrefs/${playerId}`)  // gets player active campaign for campaign Id from DB
        .then(res => campaignId = res.data.active)
        .catch(res => dbClear = false);


        if (!dbClear) {
          interaction.reply({
            content: "Character not found, Database down or you need to create a character with **'/character-setup'**",
            ephemral: true});
          return
        };


        await axios.get(`${baseUrl}/${playerId}/${campaignId}`) // gets character data from DB
        .then(res => skill = res.data[checkType])
        .catch();


        let roll1: number = random(); // 1st roll
        let roll2: number = random(); // 2nd roll

        let high: number; // sets the higher number
        let low: number;  // sets the lower number

        let nat20: string = '\u200b'; // if a nat 20 set flavor text

        if (roll1 > roll2) { high = roll1, low = roll2 }  // sets the high/low based on numbers rolled
        else { high = roll2, low = roll1 }


        let rolls: string = ''; // combined dis/advantage rolls formatted for embed
        let base: number; // the final usable roll for base roll

        if (modify == 'advantage') {
          rolls = `${high}, ~~${low}~~`;
          base = high;
          if (high == 20) {nat20 = 'Nat 20!'}
        }
        else if (modify == 'disadvantage') {
          rolls = `${low}, ~~${high}~~`;
          base = low;
          if (low == 20) {nat20 = 'Nat 20!'}
        }
        else {
          rolls = `${roll1}`;
          base = roll1;
          if (roll1 == 20) {nat20 = 'Nat 20!'}
        }


        let embed = new EmbedBuilder()
        .setColor([117, 1, 1])
        .setAuthor({ name: `${username}`, iconURL: `${avatar}` })
        .setThumbnail('https://firebasestorage.googleapis.com/v0/b/discord-bots-b3eeb.appspot.com/o/saving-throw.jpg?alt=media&token=8f4210e0-5ff0-46f6-bc0e-b7306471df93&_gl=1*1o1za2e*_ga*NTAxMDcwNTMzLjE2OTcwODI2Mzk.*_ga_CW55HF8NVT*MTY5Nzg3MTA1NC4yNC4xLjE2OTc4NzEyNDEuNjAuMC4w')
        .setDescription(modify)
        .addFields(
          { name: 'Skill', value: checkType, inline: true },
          { name: 'Rolls', value: rolls, inline: true},
          { name: '\u200b', value: `${nat20 || 0}`, inline: true},

          { name: '\u200b', value: '\u200b' },

          { name: 'Base', value: `${base}`, inline: true },
          { name: 'Modifer', value: `${skill}`, inline: true},
          { name: 'Total', value: `${base + skill}`, inline: true},
        )
        .setFooter({text: 'Ox bot by YGDR'});


        interaction.reply({ embeds: [embed] });

    }

}