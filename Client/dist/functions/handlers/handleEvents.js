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
const fs = require('node:fs');
const path = require('path');
module.exports = (client, player, baseUrl) => {
    client.handleEvents = () => __awaiter(void 0, void 0, void 0, function* () {
        const eventFolders = fs.readdirSync(path.join(__dirname, `../../events`));
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(path.join(__dirname, `../../events/${folder}`))
                .filter(file => file.endsWith('.js'));
            switch (folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(path.join(__dirname, `../../events/${folder}/${file}`));
                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args, client));
                        }
                        else {
                            client.on(event.name, (...args) => event.execute(...args, client, baseUrl));
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
    });
};
//# sourceMappingURL=handleEvents.js.map