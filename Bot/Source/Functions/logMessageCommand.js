import { information, guild } from "#root"
import { generateMessageCommandLog } from "../Builders/Containers/Functions/container.js";
import { getRank } from "./getRank.js";

export async function logMessageCommand(client, id, channelId, messageId, additionalArgs) {
    const user = await client.users.fetch(id);
    const member = await guild.members.fetch(id);
    const logChannel = await client.channels.fetch(information.logging.commands.message);
    const channel = await client.channels.fetch(channelId);
    const channelInfo = {
        "Channel": `<#${channel.id}>`, 
        "Channel Id": `\`${channelId}\``, 
        "Channel Name": `\`${channel.name}\``
    };
    const userInfo = {
        "User": `<@${id}>`,
        "Username": `${user.username}`,
        "User Id": `${id}`, 
        "Rank": `${getRank(member)}`
    }

    

    const container = generateMessageCommandLog(userInfo, channelInfo, messageId, additionalArgs)

    await logChannel.send({
        components: [container.toJSON()], 
        flags: 1 << 15
    })
}