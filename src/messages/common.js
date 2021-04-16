import Discord from 'discord.js'
import { bot, getGuildColor } from '../utils'

export function notConnected({ client, message, args, customMessage } = {}) {
    return new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setTitle(customMessage || 'Commence donc par te connecter')
        .setFooter(...bot(client))
}

export function notAllowed({ client, message, args, customMessage } = {}) {
    return new Discord.MessageEmbed()
        .setColor('#ff6633')
        .setTitle(customMessage || 'Tu ne peux pas faire ça pignouf.')
        .setFooter(...bot(client))
}

export function success({ client, message, args, customMessage } = {}) {
    return new Discord.MessageEmbed()
        .setColor('#33ff33')
        .setTitle(customMessage || "C'est une réussite !")
        .setFooter(...bot(client))
}

export function error({ client, message, args, customMessage } = {}) {
    return new Discord.MessageEmbed()
        .setColor('#ff3333')
        .setTitle(customMessage || 'Il y a eu une erreur')
        .setFooter(...bot(client))
}
