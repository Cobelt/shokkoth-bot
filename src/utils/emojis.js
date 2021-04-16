export function getEmoji(client, name) {
    const found = client?.emojis?.cache?.find(emoji => emoji.name == name) || ''
    return found || `\:${name}:`
}
