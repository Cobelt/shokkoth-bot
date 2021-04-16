import dayjs from 'dayjs'
import Discord from 'discord.js'
import { bot, getGuildColor } from '../utils'

export function noMuteRole({ client, message, args } = {}) {
    const embed = new Discord.MessageEmbed()
        .setColor('#ff3333')
        .setTitle('Je ne trouve pas de rôle "Mute" à assigner à ce bouffon :(')
        .setFooter(...bot(client))
    return embed
}

export function mute({ client, message, args, member, time } = {}) {
    const embed = new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setTitle('Mute')
        .addField('Bourreau', message.author, true)
        .addField('Victime', member, true)
        .setFooter(...bot(client))
        .setTimestamp()

    if (time) {
        embed.addField("Jusqu'à", dayjs().add(time, 'minutes'), true)
    }

    return embed
}

export function unmute({ client, message, args, member } = {}) {
    return new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setTitle('Unmute')
        .addField('Bourreau', message.author, true)
        .addField('Victime', member, true)
        .setFooter(...bot(client))
        .setTimestamp()
}
