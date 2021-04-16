export function bot(client) {
    return [
        client?.user?.nickname || client?.user?.username,
        process.env.BOT_IMAGE,
    ]
}
