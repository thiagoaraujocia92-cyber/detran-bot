javascript
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let usuarios = {};

client.once('ready', () => {
    console.log('🚗 DETRAN Bot Online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, user } = interaction;

    if (commandName === 'registrar') {
        usuarios[user.id] = { pontos: 20, status: 'Ativa' };
        await interaction.reply('CNH registrada com 20 pontos.');
    }

    if (commandName === 'consultar') {
        if (!usuarios[user.id]) return interaction.reply('Você não tem CNH registrada.');
        await interaction.reply(`Status: ${usuarios[user.id].status} | Pontos: ${usuarios[user.id].pontos}`);
    }

    if (commandName === 'multa') {
        if (!usuarios[user.id]) return interaction.reply('Usuário não registrado.');
        usuarios[user.id].pontos -= 5;

        if (usuarios[user.id].pontos <= 0) {
            usuarios[user.id].status = 'Suspensa';
            return interaction.reply('CNH Suspensa por zerar pontos!');
        }

        await interaction.reply('Multa aplicada (-5 pontos).');
    }
});

client.login(process.env.TOKEN);
