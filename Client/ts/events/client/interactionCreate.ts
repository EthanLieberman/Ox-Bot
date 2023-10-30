const { InteractionType } = require('discord.js');
// const chalk = require('chalk');

function time() {
	let date = new Date;
	let now = date.toLocaleString('en-US', {
		timeZone: 'America/Los_Angeles',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short'
	})
	return now
}


export = {
	name: 'interactionCreate',
	async execute(interaction, client, baseUrl) {
		if (interaction.isChatInputCommand()) {
			const { commands } = client;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;

			try {
				await command.execute(interaction, client, baseUrl);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: `something went wrong here...I'm sure its nothing`,
					ephemeral: true
				});
			}
		}
		else if (interaction.isButton()) {
			const { buttons } = client;
			const { customId } = interaction;
			const button = buttons.get(customId);
			if (!button) return new Error(`there's not a button for this`);

			try {
				await button.execute(interaction, client);
			} catch (error) { console.error(error) }
		}

		else if (interaction.isStringSelectMenu()) {
			const { selectMenus } = client;
			const { customId } = interaction;
			const menu = selectMenus.get(customId);
			if (!menu) return new Error("There is no code for this select menu");

			try {
				await menu.execute(interaction, client, baseUrl);
			} catch (error) { console.error(error) }
		}

		else if (interaction.type == InteractionType.ModalSubmit) {
			const { modals } = client;
			const { customId } = interaction;
			const modal = modals.get(customId);
			if (!modal) return new Error("There is no code for this modal")

			try {
				await modal.execute(interaction, client)
			} catch (error) { console.log(error) }
		}

		else if (interaction.isContextMenuCommand()) {
			const { commands } = client;
			const { commandName } = interaction;
			const contextCommand = commands.get(commandName);
			if (!contextCommand) return;

			try {
				await contextCommand.execute(interaction, client);
			} catch (error) { console.log(error) }
		}

		// console.log(
		// 	chalk.bold(`Command: `), chalk.green(`${interaction} \n`),
		// 	chalk.bold(`User: `), chalk.green(`${interaction.user.tag} \n`),
		// 	chalk.bold(`Server: `), chalk.green(`${interaction.guild.name} \n`),
		// 	chalk.bold(`Channel: `), chalk.green(`#${interaction.channel.name} \n`),
		// 	chalk.cyan(`At: ${time()} \n`)
		// );
	},
};