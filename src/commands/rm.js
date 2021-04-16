export function run(client, message, args) {
    if (
        message.channel.type !== 'dm' &&
        message?.channel
            ?.permissionsFor(message?.member)
            ?.has('MANAGE_MESSAGES')
    ) {
        const quantity = parseInt(args?.[0], 10) || 1
        message?.channel?.bulkDelete(quantity + 1) // +1 to delete the command + X messages
    }
}
