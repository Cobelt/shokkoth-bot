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
                    customMessage:
                        "Tu dois mentionner la victime, sinon je vais mute Jugg'.",
                })
            )
        )
    }
    if (member === message.author) {
        return message.reply(
            MESSAGES.COMMON.notAllowed({
                client,
                customMessage: "Tu ne peux pas t'auto-muter trou du cul.",
            })
        )
    }
    if (member === message.guild.me) {
        return message.reply(
            MESSAGES.COMMON.notAllowed({
                client,
                customMessage: 'Tu ne peux pas me muter, je ne suis pas con.',
            })
        )
    }
    const time = args?.[1] // minutes
    if (time) {
        if (!time || time > 1209600000 / 1000 / 60) {
            // Cap at 14 days, larger than 24.8 days causes integer overflow
            return message.reply(
                MESSAGES.COMMON.error({
                    client,
                    customMessage: 'Il faut que la durée soit < 14j',
                })
            )
        }
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
        await member.roles.add(muteRole)
        message.reply(MESSAGES.MUTE.mute({ client, message, member, time }))
    } catch (err) {
        console.error(err)
        return message.reply(
            MESSAGES.COMMON.error({ client, customMessage: err.message })
        )
    }

    if (time) {
        // Unmute member
        member.timeout = message.client.setTimeout(async () => {
            try {
                await member.roles.remove(muteRole)
                message.reply(
                    MESSAGES.MUTE.unmute({ client, message, member, time })
                )
            } catch (err) {
                console.error(err)
                return message.reply({ customMessage: err.message })
            }
        }, time)
    }
}
