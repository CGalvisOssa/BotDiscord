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

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});















//CREACION DE RESPUESTAS EN BASE A PALABRAS ESCRITAS 
client.on("messageCreate", async message => {
    // Convertir el mensaje a minúsculas para que ignore mayúsculas/minúsculas
    const msgContent = message.content.toLowerCase();

    // Caso "hola"
    if (msgContent === "hola") {
        message.channel.send("Buena la arepa");
                                } 
    // Nena
    else if(msgContent === "nena"){
        message.channel.send("Como tu no hay");
    }
    // Caso "!embed"
    else if (msgContent === "!embed") {
        // Crear el embed
        const embed = new EmbedBuilder()
            .setTitle("BotEmikukis")
            .setAuthor({ name: "CGalvisOssa", iconURL: 'https://i.ibb.co/1XPTB0L/Icon-Solarian.jpg', url: 'https://github.com/CGalvisOssa' })
            .setColor(0x00AE86)
            .setDescription("Este es un bot de prueba inspirado en emikukis.")
            .setFooter({ text: "Derechos reservados por cris.sas", iconURL: 'https://i.ibb.co/1XPTB0L/Icon-Solarian.jpg' })
            .setImage('https://i.ibb.co/fGqKNq0/emikukis.jpg')
            .setThumbnail('https://i.ibb.co/fGqKNq0/emikukis.jpg')
            .setTimestamp()
            .setURL("https://github.com/CraterMaik")
            .addFields(
                { name: "Comunidad", value: "Papus" },
                { name: "Estado", value: "Extrovertida", inline: true },
                { name: "Novio?", value: "Casada", inline: true }
            );

        // Enviar el embed al canal
        message.channel.send({ embeds: [embed] });

    // Default: no hace nada
    } else {
        // Aquí puedes agregar una respuesta genérica o dejar vacío si no quieres que responda.
    }
});


client.login(token);
console.log("El bot está listo");
