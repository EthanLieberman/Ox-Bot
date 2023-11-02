const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

export = {
    data: new SlashCommandBuilder()
        .setName('rick')
        .setDescription('view info on a random Rick & Morty character or location')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('rick and morty stuff')
                .setRequired(true)
                .addChoices(
                    { name: 'characters', value: 'character' },
                    { name: 'locations', value: 'location' }
                )
        ),


    async execute(interaction) {
        let choice: string = interaction.options.get('category').value
        let data: {
            name: string,
            id: string,
            image: string,
            type: string,
            gender: string,
            origin: {
                name: string
            },
            species: string,
            status: string,
            dimension: string
        } = {
            name: '',
            id: '',
            image: '',
            type: '',
            gender: '',
            origin: {
                name: ''
            },
            species: '',
            status: '',
            dimension: ''
        }
        let random:number;


        function rando(i: number) {
            return Math.round(Math.random() * i)
        }

        if (choice == 'character') {
            random = rando(826)
        } else {
            random = rando(126)
        }

        try {
        await axios.get(`https://rickandmortyapi.com/api/${choice}/${random}`)
            .then(res => {
                data = res.data
            });
        }   catch {
            interaction.reply({
                content: "aww jeez man y'know th th the database...thing its not working, its shit, just try again later man",
                ephemeral: true
            })
        }

        let embed = new EmbedBuilder();
        embed
        .setColor([117, 1, 1])
        .setTitle(data.name)
        .setDescription(`ID: ${data.id.toString()}`)
        .setFooter({ text: 'Ox-Bot by YerGodDamnRight' });

        if (choice == 'character') {
            embed
            .setImage(data.image)
            .addFields(
                { name: 'Type', value: data.type, inline: true },
                { name: 'Gender', value: data.gender, inline: true },
                { name: 'Home World', value: data.origin.name, inline: true },
            )
            .addFields(
                { name: 'Species', value: data.species, inline: true },
                { name: 'Status', value: data.status, inline: true },
            );
        }
        else {
            embed
            .addFields(
                { name: 'Type', value: String(data.type), inline: true },
                { name: 'Dimension', value: String(data.dimension), inline: true },
            );
        }
        
        interaction.reply({ embeds: [embed] });

    },
};