const { Events } = require("discord.js")
export = {
    name: Events.ClientReady,
    once: true,
   async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}.`)
      }
} 