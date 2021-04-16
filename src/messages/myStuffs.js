import Discord from 'discord.js'
import { bot, getGuildColor } from '../utils'

export function idsList({ client, message, args, data }) {
    return new Discord.MessageEmbed()
        .setColor(getGuildColor(message))
        .setThumbnail(process.env.BOT_IMAGE)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addFields(
            data?.length > 0
                ? data?.map(({ _id, name }) => ({
                      name,
                      value: _id,
                      inline: true,
                  }))
                : [
                      {
                          name: 'Stuffs',
                          value: "Il n'y a aucun stuff associé à ce compte.",
                      },
                  ]
        )
        .setFooter(...bot(client))
        .setTimestamp()
}
