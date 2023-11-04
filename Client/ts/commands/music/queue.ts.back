const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
export = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("list the queue"),
    async execute(interaction) {
        try {

        const queue = interaction.client.player.nodes.get(interaction.guild)

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "There is not playing anything", ephemeral: true })
        }

        const progress = queue.node.createProgressBar()
        const ts = queue.node.getTimestamp();

        const getQueue = useQueue(interaction.guild.id)
        const tracks = getQueue.tracks.toArray()
        console.log(tracks)

        const embed = new EmbedBuilder()
            .setTitle("Now playing")
            .setDescription(`[${queue.currentTrack.title}](${queue.currentTrack.url})`)
            .setThumbnail(`${queue.currentTrack.thumbnail}`)
            .addFields( )

        await interaction.reply({ embeds: [embed] })
    }catch (error) {
        console.log(error)
    }
}
}