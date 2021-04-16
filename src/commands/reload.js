export function run(client, message, args) {
    if (message.author.id === process.env.OWNER_ID) {
        if (!(args.length > 0)) {
            return message.reply(
                'Il faut préciser quelle commande reloader monsieur.'
            )
        }

        const commandName = args?.[0]

        // Remove from map if the command already exists
        if (client.commands.has(commandName)) {
            delete require.cache[
                require.resolve(`${__dirname}/${commandName}.js`)
            ]
            client.commands.delete(commandName)
        }
        // the path is relative to the *current folder*, so just ./filename.js
        // We also need to delete and reload the command from the client.commands Enmap
        const props = require(`${__dirname}/${commandName}.js`)
        client.commands.set(commandName, props)
        message.reply(`La commande ${commandName} a bien été reloadée`)
    }
}
