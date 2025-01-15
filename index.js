const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

// Creando el cliente con los permisos necesarios
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Iniciando sesión en el bot usando el token del archivo .env
client.login(process.env.TOKEN);

// Evento para manejar interacciones de comandos
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Trayendo la respuesta de los comandos
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number')?.value;
        const num2 = interaction.options.get('second-number')?.value;

        // Respondiendo con la suma
        interaction.reply(`The sum is ${num1 + num2}`);
    }
});

client.once('ready', () => {
    console.log("El bot está listo rey");
});





//ESTADO DEL BOT



/* 
client.on('ready',() =>{
client.user.setActivity({
    name: 'papeando',
    type: ActivityType.Streaming,
    url: 'https://www.twitch.tv/emikukis'

})}
)
client.on('interactionCreate', async (interaction) => {
    // Verifica si es una interacción de botón
    if (interaction.isButton()) {
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {
            await interaction.editReply({
                content: "I couldn't find that role",
            });
            return;
        }

        const hasRole = interaction.member.roles.cache.has(role.id);

        if (hasRole) {
            // Eliminar el rol si ya lo tiene
            await interaction.member.roles.remove(role);
            await interaction.editReply({
                content: `Removed the role ${role.name}`,
            });
        } else {
            // Añadir el rol si no lo tiene
            await interaction.member.roles.add(role);
            await interaction.editReply({
                content: `Added the role ${role.name}`,
            });
        }
    }

    // Verifica si es un comando
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "embed") {
        function createEmbed() {
            return new EmbedBuilder()
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
                    { name: "Novio?", value: "????", inline: true }
                );
        }

        interaction.reply({ embeds: [createEmbed()] });
    }

    if (interaction.commandName === "add") {
        const num1 = interaction.options.getNumber('first-number');
        const num2 = interaction.options.getNumber('second-number');

        interaction.reply(`La suma es: ${num1 + num2}`);
    }
});

PRIMER METODO DE CREACION DE COMANDOS
// Prefijo
let prefix = config.prefix;

// Creación de comandos con un prefijo único
client.on("message", (message) => {
    // Ignorar mensajes de otros bots
    if (message.author.bot) return;

    if (message.content === ' >>hola') {
        message.reply('Hola Mario, ¿cómo estás?');
    } else if (message.content.startsWith(prefix + 'sapo')) {
        message.channel.send('Si las ranas planificaran no habría tanto sapo hpta');
    }
});

//SEGUNDO METODO DE CREACION DE COMANDOS
// Cargando comandos
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Bucle a través de las carpetas de comandos y carga cada comando
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] El comando en ${filePath} no tiene una propiedad "data" o "execute" requerida.`);
        }
    }
}

// Bucle a través de los archivos de eventos y carga cada evento
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

// Creando cooldowns para evitar el spam
*/
