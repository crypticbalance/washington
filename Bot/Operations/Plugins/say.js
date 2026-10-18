import { information } from "#root"
import { logMessageCommand } from "../../Source/Functions/logMessageCommand.js";

const name = new Error().stack
    ?.split("\n")[1]
    ?.trim()
    .match(/at (\w+)/)?.[1];

const debug = information.bot.debug[name] === "true";

export async function say(client) {
    if(debug) console.log(`[${name.toUpperCase()}] Function begun`);
    client.on('messageCreate', async (m) => {
        if(debug) console.log(`[${name.toUpperCase()}] Listener received`);
        if(m.content.startsWith(information.bot.prefix + 'say')) {
            if(m.member.roles.cache.has(information.roles.staff)) {
                const toSay = m.content.slice(1 + "say".length).trim()
                const channel = await client.channels.fetch(m.channel.id);

                const message = channel.send(toSay + `\n> -# This message is not created nor endorsed by the bot or it's developers, it was sent by a staff member of **${m.guild.name}**.`);

                m.delete();

                const time = Date.now()

                const additionalArgs = {
                    "Command Name": `\`Say\``, 
                    "Content": `\`${toSay}\``, 
                    "Time": `<t:${Math.round(time / 1000)}:F> / <t:${Math.round(time / 1000)}:R> (${time})`
                }

                logMessageCommand(client, m.author.id, m.channel.id, message.id, additionalArgs)
            } else {
                await m.reply(`**${m.author.username}**, you are not permitted to use this command.\n> -# If you believe this is a mistake, ensure you have the staff member role (usage id: ${information.roles.staff})`)
            }
        }
    })
};