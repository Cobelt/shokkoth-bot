import Discord from 'discord.js'
import { getEmoji } from '../utils'

export function shouldRemoveMsg({ client, message, args } = {}) {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(
            'Pense à bien supprimer le message de ta commande $login pour que des yeux baladeurs ne te volent pas ton mot de passe !'
        )

    return embed
}

export function wrongFormat({ client, message, args } = {}) {
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Le bon format de la commande est :')
        .setDescription('$login [username] [password]')
        .setFooter(client?.user?.username, client?.user?.avatarURL)
        .setTimestamp()

    if (message?.channel?.type !== 'dm') {
        embed.addFields([
            {
                name: `${getEmoji(client, 'warning')} Attention ${getEmoji(
                    client,
                    'warning'
                )}`,
                value:
                    "Vous devriez m'envoyer cette commande en DM afin de ne pas montrer votre mot de passe à tout le monde !",
            },
            {
                name: 'DM',
                value:
                    'Tu peux utiliser la commande $dm pour que je fasse le premier pas !',
            },
        ])
    }

    return embed
}
