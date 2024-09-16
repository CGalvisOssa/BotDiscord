const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('nena')
		.setDescription('regguetton'),
	async execute(interaction) {
		await interaction.reply('tu ere mala');
	},}