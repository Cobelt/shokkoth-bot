import dayjs from 'dayjs'

export function run(client, message, args) {
    const isOwner = message.author.id === process.env.OWNER_ID

    if (isOwner) {
        const time = dayjs().format('[[]HH:mm]')
        message?.channel?.send(`
            ${time} (Privé) **à ${message?.author?.username}** : Bonne nuit !.\n
            ${time} (Informations) **Shokkoth** est déconnecté.
        `)
        // client.destroy()
    }
}
