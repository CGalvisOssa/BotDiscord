const fs = require('node:fs');
const path = require('node:path');

//Se llaman las clases necesarias desde discord.js
const { Client, EmbedBuilder, Events, GatewayIntentBits, Collection } = require("discord.js");

//Se crea el servidor y se le dan los permisos necesarios
const client = new Client({ intents: [3276799] });

//LLamando al archivo que contiene el token del bot de discord
const { token } = require('./config.json');



//Trayendo a funcionar los comandos
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

//  2    ciclos que recorren la carpeta de comandos y extrae cada archivo js

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//2 ciclos para extraer cada archivo de la carpeta eventos 
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Creando cooldowns para evitar el spam





client.login(token);
console.log("El bot está listo");
