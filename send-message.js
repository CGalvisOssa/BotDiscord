const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');
require('dotenv').config();

// Importando las clases necesarias desde discord.js
const { Client, EmbedBuilder, Events, GatewayIntentBits, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

// Creando el cliente con los permisos necesarios
const client = new Client({ intents: [3276799] });

// Iniciando sesión en el bot usando el token del archivo .env
client.login(process.env.TOKEN);

console.log("El bot está listo rey");

const roles = [

    
    {
        id: '1289426850287714408',
        label : 'PapuAmigo'
    },
    {
        id: '1289427064784683088',
        label : 'PapuMayor'
    },
    {
        id: '1289427161064673310',
        label : 'Sumis@'
    }
    
]

client.on ('ready',(c) =>{

    try {
        const channel =  client.channels.cache.get('1289429206790570105');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )

        })

        channel.send({
            content: 'claim or remove a role below.',
            components: [row]
        })
        
        process.exit();

    } catch (error) {
        console.log(error);
    }
})