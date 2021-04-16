// it's to the "?", "!", ... before the command
const PREFIX = process.env.PREFIX

export async function event(client, message) {
    // Ignore all bots
    if (message.author.bot) return null

    const [prefixAndCommand, ...args] = message
        ?.toString()
        ?.trim()
        ?.split(/ +/g)

    // Ignore messages not starting with the prefix (in .env)
    if (!message.content.startsWith(PREFIX)) return null

    const command = prefixAndCommand?.split(PREFIX)?.[1]

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command)

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) {
        return null
    }

    // Run the command
    await cmd.run(client, message, args)
}
