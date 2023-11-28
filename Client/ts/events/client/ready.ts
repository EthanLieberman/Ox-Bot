const { Events } = require("discord.js")
import { green } from "colorette";
export = {
    name: Events.ClientReady,
    once: true,
   async execute(client) {
        console.log(`${green('Ready! Logged in as ')} ${green(client.user.tag)}\n`)
      }
} 