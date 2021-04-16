import Discord from 'discord.js'
import { bot, getGuildColor } from '../utils'

export function get({ client, message, args, data } = {}) {
    const { username, stuffs, characters } = data || {}
    return new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setTitle(username)
        .addFields([
            {
                name: 'Stuffs',
                value:
                    stuffs?.length > 0
                        ? stuffs?.map(stuff => stuff?.name)?.join('\n')
                        : 'Pas encore de stuffs créés.',
                inline: true,
            },
            {
                name: 'Personnages',
                value:
                    characters?.length > 0
                        ? characters
                              ?.map(character => character?.name)
                              ?.join('\n')
                        : 'Pas encore de personnages créés.',
                inline: true,
            },
        ])
        .setFooter(...bot(client))
        .setTimestamp()
}
