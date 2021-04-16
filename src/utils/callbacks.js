export function deleteShortlyAfter(msg) {
    msg.delete({ timeout: 10000 })
}

export function getHeaders(client, message) {
    const token = client.connections.get(message.author.id)
    if (!token) return null
    return {
        Authorization: 'Bearer ' + token,
    }
}
