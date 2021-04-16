import dayjs from 'dayjs'

export async function run(client, message, args) {
    const isOwner = message.author.id === process.env.OWNER_ID

    if (isOwner) {
        const time = dayjs().format('[[]HH:mm]')
        message?.channel?.send(`
            ${time} (Combat) **${message?.author?.username}** lance **Doom**.\n
            ${time} (Combat) **${message?.author?.username}** tue **Shokkoth** !\n
            ${time} (Combat) **Shokkoth** est mort !\n
            ${time} (Combat) Combat terminé.
        `)
        // client.destroy()
    }
}
