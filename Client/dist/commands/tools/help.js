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
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with a list of commands you can use'),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply({
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
    *you must be in a Voice channel to use any music commands*

    ***/play*** <song name or url here> (plays a song with whatever you type in the command input)
    ***/pause*** (pauses current song)
    ***/resume*** (resumes curent song)
    ***/stop*** (stops music and bot leaves voice channel)
    ***/skip*** (plays the next song in the queue if any)
    ***/volume*** <0-100> (sets the bot music volume at requested level)
    ***/loop*** (sets the music to loop song, playlist, auto, or no loop)
    ***/shuffle*** (randomizes song order)
    ***/nowPlaying*** (lists the currently playing song)
    ***/playnext*** (play requested song after current song)
    ***/jump*** (skip to song # in the playlist)
    ***/back*** (play last song)`,
                ephemeral: true
            });
        });
    }
};
//# sourceMappingURL=help.js.map