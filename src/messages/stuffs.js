import Discord from 'discord.js'
import { bot, capitalize, getEmoji, getGuildColor } from '../utils'

import { EQUIPMENTS, STATS } from '../constants'

export function get({ client, message, args, data }) {
    const { name, level, gender, breed, stats, equipments, public: _public } =
        data || {}

    const mappedAndSortedEquipments =
        equipments?.length > 0 &&
        equipments?.map(equipment => ({
            ...equipment,
            typeObj: EQUIPMENTS?.translations?.[equipment?.type],
        }))

    if (mappedAndSortedEquipments?.length > 1) {
        mappedAndSortedEquipments.sort(
            (a, b) => a?.typeObj?.order - b?.typeObj?.order
        )
    }

    const genderEmoji =
        gender === 'male'
            ? getEmoji(client, 'male_sign')
            : getEmoji(client, 'female_sign')

    const visiblity = _public
        ? getEmoji(client, 'unlock')
        : getEmoji(client, 'lock')

    return new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setThumbnail(process.env.BOT_IMAGE)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(
            `${visiblity} [${breed?.name ?? '?'} ${
                level ?? '200'
            } ${genderEmoji}] ${name}`
        )
        .addFields([
            {
                name: 'Stats & Dommages',
                value:
                    Object.entries(stats)
                        .slice(0, 23)
                        ?.map(([stat, value]) => {
                            const label = STATS.translations[stat].fr
                            return `${label} : ${value}`
                        })
                        .join('\n') || 'null',
                inline: true,
            },
            {
                name: 'Rés. et autres',
                value:
                    Object.entries(stats)
                        .slice(23, 45)
                        ?.map(([stat, value]) => {
                            const label = STATS.translations[stat].fr
                            return `${label} : ${value}`
                        })
                        .join('\n') || 'null',
                inline: true,
            },
            { name: '\u200B', value: '**Équipements**' },
            ...(mappedAndSortedEquipments?.length > 0
                ? mappedAndSortedEquipments?.map(equipment => {
                      const name = equipment?.typeObj?.fr || ''
                      return {
                          name: capitalize(name),
                          value: equipment?.name,

                          inline: true,
                      }
                  })
                : []),
        ])
        .setFooter(...bot(client))
        .setTimestamp()
}
