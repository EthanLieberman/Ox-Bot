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
const { readdirSync } = require("fs");
const path = require('path');
module.exports = (client) => {
    client.handleComponents = () => __awaiter(void 0, void 0, void 0, function* () {
        const componentsFolders = readdirSync(path.join(__dirname, `./components`));
        for (const folder of componentsFolders) {
            const componentFiles = readdirSync(path.join(__dirname, `./components/${folder}`))
                .filter((file) => file.endsWith(".js"));
            const { buttons, selectMenus, modals } = client;
            switch (folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(path.join(__dirname, `../../components/${folder}/${file}`));
                        buttons.set(button.data.name, button);
                    }
                    break;
                case "selectMenus":
                    for (const file of componentFiles) {
                        const menu = require(path.join(__dirname, `../../components/${folder}/${file}`));
                        selectMenus.set(menu.data.name, menu);
                    }
                    break;
                case "modals":
                    for (const file of componentFiles) {
                        const modal = require(path.join(__dirname, `../../components/${folder}/${file}`));
                        modals.set(modal.data.name, modal);
                    }
                    break;
                default:
                    break;
            }
        }
    });
};
//# sourceMappingURL=handleComponents.js.map