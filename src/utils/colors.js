export function getGuildColor(message) {
    return message?.guild?.me?.displayHexColor || '#33ff33'
}
