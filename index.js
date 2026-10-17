import { Client, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

const client = new Client({
    intents: Object.values(GatewayIntentBits), 
    partials: Object.values(Partials)
});

client.on('clientReady', async (c) => {
    console.log(`${c.user.username} is online!`)
})

client.login(process.env.token)