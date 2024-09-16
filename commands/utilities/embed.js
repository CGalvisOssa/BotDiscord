const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Función para crear el embed
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

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Devuelve un embed con informacion del bot.'),
    async execute(interaction) {
        try {
            console.log('Creando el embed...');
            const embed = createEmbed();
            console.log('Embed creado:', embed);
            await interaction.reply({ embeds: [embed] });
            console.log('Respuesta enviada.');
        } catch (error) {
            console.error('Error al enviar el embed:', error);
            await interaction.reply({ content: 'Hubo un error al enviar el embed.', ephemeral: true });
        }
    },	
};

