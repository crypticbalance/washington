import { ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";

export function generateMessageCommandLog(userArgs, channelArgs, messageId, additionalArgs) {
    let channelArgsFormatted = [];
    let userArgsFormatted = [];
    let additionalArgsFormatted = [];

    Object.entries(channelArgs).forEach(([key, value]) => {
        channelArgsFormatted.push(`**${key}**: ${value}`)
    });

    Object.entries(userArgs).forEach(([key, value]) => {
        userArgsFormatted.push(`**${key}**: ${value}`)
    });

    Object.entries(additionalArgs).forEach(([key, value]) => {
        additionalArgsFormatted.push(`**${key}**: ${value}`)
    });

    return new ContainerBuilder()
        .setAccentColor(0x518ded)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('# Command Log')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**User Information**\n> ${userArgsFormatted.join('\n> ')}`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Channel Information**\n> ${channelArgsFormatted.join('\n> ')}`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(false)
                .setSpacing(SeparatorSpacingSize.Large)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Command Information**\n> ${additionalArgsFormatted.join('\n> ')}`)
        )
}