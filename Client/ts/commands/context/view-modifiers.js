const { SlashCommandBuilder, EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType, ApplicationCommand } = require('discord.js');
const axios = require('axios').default;

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('view-modifiers')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client, baseUrl) {
        let id = interaction.targetUser.id
        let data = '';

        await axios.get(`${baseUrl}/check/${id}`)
            .then(res => {
                console.log("data received from server")
                console.log(
                    res.status,
                    res.statusText,
                    res.data
                )
                data = res.data;
            }
            )
            .catch(e => console.log(e))

        console.log(data)
        await interaction.reply(`
${interaction.targetUser.username}'s Modifiers
Strength: ${data.strength}
Dexterity: ${data.dexterity}
Constitution: ${data.constitution}
Intelligence: ${data.intelligence}
Wisdom: ${data.wisdom}
Charisma: ${data.charisma}
Acrobatics: ${data.acrobatics}
Animal handling: ${data.animalHandling}
Arcana: ${data.arcana}
Athletics: ${data.athletics}
Deception: ${data.deception}
History: ${data.history}
Insight: ${data.insight}
Intimidation: ${data.intimidation}
Investigation: ${data.investigation}
Medicine: ${data.medicine}
Nature: ${data.nature}
Perception: ${data.perception}
Performance: ${data.performance}
Persuasion: ${data.persuasion}
Religion: ${data.religion}
Sleight of hand: ${data.sleightOfHand}
Stealth: ${data.stealth}
Survival: ${data.survival}`)
    }
}