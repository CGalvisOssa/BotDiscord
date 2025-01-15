require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'add',
        description: 'Adds two numbers  ',
        options:
        [
            {
            name: 'first-number',
            description: 'El primer numero',
            type: ApplicationCommandOptionType.Number,
            choices:
                [
                {
                    name: 'one',
                    value: 1,
                },
                {
                    name: 'two',
                    value: 2,
                }
                ],
                required: true,
                },  
            {
            name: 'second-number',
            description: 'El segundo numero ',
            type: ApplicationCommandOptionType.Number,
            choices:
                [
                {
                    name: 'one',
                    value: 1,
                },
                {
                    name: 'two',
                    value: 2,
                }
                ],
            required: true,
            }
        ]
    },
    {
        name: 'embed',
        description: 'Reply with the embed of the bot'
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();

