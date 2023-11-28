const { readdirSync } = require("fs");
const path = require('path');

export = (client) => {
    client.handleComponents = async () => {
        const componentsFolders = readdirSync(path.join(__dirname, `./components`));
        for (const folder of componentsFolders) {
            const componentFiles = readdirSync(path.join(__dirname, `./components/${folder}`))
                .filter((file) => file.endsWith(".js"));

            const { buttons, selectMenus, modals } = client

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
                        const modal = require(path.join(__dirname, `../../components/${folder}/${file}`))
                        modals.set(modal.data.name, modal);
                    }
                    break;

                default:
                    break;
            }
        }
    };
};
