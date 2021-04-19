import Discord from 'discord.js'

import { EQUIPMENTS, STATS } from '../constants'
import { bot, capitalize, getEmoji, getGuildColor } from '../utils'

export function wrongFormat({ client, message, args } = {}) {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Le bon format de la commande est :')
        .setDescription("$item [partie ou nom de l'item]")
        .setFooter(...bot(client))
        .setTimestamp()

    if (message?.channel?.type !== 'dm') {
        embed.addFields([
            {
                name: `${getEmoji(
                    client,
                    'information_source'
                )} Info ${getEmoji(client, 'information_source')}`,
                value:
                    "Si l'item renvoyé n'est pas le bon, essayez d'être plus précis sur le nom ! :)",
            },
        ])
    }

    return embed
}

export function get({ client, message, args, data }) {
    const {
        name,
        level,
        type,
        statistics,
        characteristics,
        passives,
        conditions,
        imgUrl,
        set,
    } = data || {}

    return new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setThumbnail(
            imgUrl
                ? `http://s.ankama.com/www/static.ankama.com/${imgUrl}`
                : process.env.BOT_IMAGE
        )
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(
            `${name ?? '?'} - [${capitalize(
                EQUIPMENTS.translations[type]?.fr
            )} ${level ?? '?'}]`
        )
        .addFields(
            [
                characteristics?.length > 0 && {
                    name: "Effet de l'arme",
                    value:
                        characteristics
                            ?.map(({ type, value, min, max }) => {
                                const label = STATS.translations[type]?.fr
                                return `${label} : ${
                                    value ? value : `${min} à ${max}`
                                }`
                            })
                            .join('\n') || 'null',
                    inline: true,
                },
                statistics?.length > 0 && {
                    name: 'Statistiques',
                    value:
                        statistics
                            ?.map(({ type, value }) => {
                                const label = STATS.translations[type]?.fr
                                return `${label} : ${value}`
                            })
                            .join('\n') || 'null',
                    inline: true,
                },
                passives?.length > 0 && {
                    name: 'Passifs',
                    value:
                        passives
                            ?.map(({ name, type, value }) => {
                                const label = type
                                    ? STATS.translations[type]?.fr || name
                                    : name
                                return `${label} ${
                                    value ? ': ' + value : ''
                                }`.trim()
                            })
                            .join('\n') || 'null',
                },
                conditions?.length > 0 && {
                    name: 'Conditions',
                    value: conditions.join('\n') || 'null',
                },
                set && {
                    name: set?.name || '',
                    value:
                        set?.equipments?.length > 0 &&
                        set?.equipments
                            ?.map(equip =>
                                `${equip?.name} ${
                                    equip?.type
                                        ? '(' +
                                          (capitalize(
                                              EQUIPMENTS.translations[
                                                  equip?.type
                                              ]?.fr
                                          ) || 'type inconnu') +
                                          ')'
                                        : ''
                                }`.trim()
                            )
                            .join('\n'),
                },
            ].filter(e => !!e)
        )
        .setFooter(...bot(client))
        .setTimestamp()
}
