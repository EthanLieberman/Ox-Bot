const { SlashCommandBuilder } = require('discord.js');

export = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of commands you can use'),

    async execute(interaction) {
        await interaction.reply({
            content: `
**Commands:**
    ***/set-campaign*** (creates an active campaign/character or sets one in your list to active)
    ***/character-setup*** (Used to create & modify your character sheet, only once you have set a campaign)
    ***/list-campaigns*** (Lists your active campaign and all your other campaigns)
    ***/delete-campaign*** (Deletes the campaign of your choice, check your spelling)
    ***/roll-die*** (Rolls dice with options to roll multiple dice and add modifiers)
    ***/ability-check*** (make an ability check with your active character)
    ***/saving throw*** (make an saving throw with your active character)
    ***/view-stats*** (Selects a player to view their main stat card)
    ***/random*** (Get a random fact)
    ***/chuck*** (Gets you 1 chuck norris joke...not all jokes are for the faint of heart)
    ***/rick*** (Gets info on Rick & Morty characters or locations)
    
**Music:**
    *All music commands are typed starting with '!'*
    *you must be in a Voice channel to use any music commands*
    *currently admin use only...blame them*

    ***!play*** <song name or url here> (plays a song with whatever you type after the command)
    ***!pause*** (pauses current song)
    ***!resume*** (resumes curent song)
    ***!stop*** (stops music and bot leaves voice channel)
    ***!getQueue*** (gets a list of all songs added to the player)
    ***!skip*** (plays the next song in the queue if any)
    ***!setVolume*** <0-100> (sets the bot music volume at requested level)
    ***!toggleLoop*** (sets the current song on loop or stops loop if active)
    ***!toggleQueueLoop*** (same as loop for song except entire queue loops)
    ***!shuffle*** (randomizes song order)
    ***!nowPlaying*** (lists the currently playing song)`,
            ephemeral: true
        })



    }
};