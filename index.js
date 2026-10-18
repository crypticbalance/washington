import { Client, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';
import loadOperations from './load.js';
import config from './config.json' with { type: 'json' }

const client = new Client({
    intents: Object.values(GatewayIntentBits), 
    partials: Object.values(Partials)
});

client.on('clientReady', async (c) => {
    console.log(`${c.user.username} is online!`);

    loadOperations(c);
})

client.login(process.env.token)

export const information = config;
export const guild = await client.guilds.fetch(information.bot.guildId)