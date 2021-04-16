import * as MESSAGES from '../messages'

export async function run(client, message, args) {
    const isOwner = message.author.id === process.env.OWNER_ID
    const isAdmin = message?.member?.permissions?.has('ADMINISTRATOR')

    if (!message.channel.type === 'dm') {
        return message.reply(MESSAGES.COMMON.notAllowed({ client }))
    }

    const muteRole = message.guild.roles.cache.find(
        role => role.name === 'Mute'
    )

    if (!muteRole) {
        return message.reply(MESSAGES.MUTE.noMuteRole({ client }))
    }

    if (!isOwner && !isAdmin) {
        return message.reply(MESSAGES.COMMON.notAllowed({ client }))
    }

    const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args?.[0])

    if (!member) {
        return message.reply(
            message.reply(
                MESSAGES.COMMON.notAllowed({
                    client,
                    customMessage: "Tu dois mentionner l'heureux élu.",
                })
            )
        )
    }

    if (member.roles.cache.has(muteRole)) {
        return message.reply(
            MESSAGES.COMMON.notAllowed({
                client,
                message,
                args,
                customMessage:
                    "Le bougre est déjà mute, sah quelle victime celui-là, on dirait Jugg'.",
            })
        )
    }

    // MUTE NOW
    try {
        await member.roles.remove(muteRole)
        message.reply(MESSAGES.MUTE.unmute({ client, message, member }))
    } catch (err) {
        console.error(err)
        return message.reply(
            MESSAGES.COMMON.error({ client, customMessage: err.message })
        )
    }
}
