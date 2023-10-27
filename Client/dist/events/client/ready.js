"use strict";
const chalk = require('chalk');
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(chalk.green(`Ready! Logged in as ${client.user.tag}`));
        // client.user.setUsername("GD Bot");
        // client.user.setAvatar("https://i.imgur.com/IiFhDDP.jpeg");
        // client.user.setActivity("Being worked on by my creator");
    },
};
//# sourceMappingURL=ready.js.map