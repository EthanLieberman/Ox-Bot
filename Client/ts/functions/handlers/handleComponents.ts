const { readdirSync } = require("fs");

export = (client) => {
    client.handleComponents = async () => {
        const componentsFolders = readdirSync(`./components`);
        for (const folder of componentsFolders) {
            const componentFiles = readdirSync(`./components/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { buttons, selectMenus, modals } = client

            switch (folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${file}`);
                        buttons.set(button.data.name, button);
                    }
                    break;

                case "selectMenus":
                    for (const file of componentFiles) {
                        const menu = require(`../../components/${folder}/${file}`);
                        selectMenus.set(menu.data.name, menu);
                    }
                    break;

                case "modals":
                    for (const file of componentFiles) {
                        const modal = require(`../../components/${folder}/${file}`)
                        modals.set(modal.data.name, modal);
                    }
                    break;

                default:
                    break;
            }
        }
    };
};