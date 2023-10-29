const fs = require('node:fs');

export = (client, player, baseUrl) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./events`);
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./events/${folder}`)
                .filter(file => file.endsWith('.js'));

            switch (folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args, client));
                        }
                        else {
                            client.on(event.name, (...args) => event.execute(...args, client, baseUrl))
                        }
                    }

                // case 'music':
                //     for (const file of eventFiles) {
                //         const event = require(`../../events/${folder}/${file}`);
                //         player.on(event.name, (...args) => {
                //             event.execute(...args, client)
                //         })
                //     }

                //     break;

                default:
                    break;
            }
        }
    }
}