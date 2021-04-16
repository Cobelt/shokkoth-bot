import Discord from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const client = new Discord.Client()

client.connections = new Map()

client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}!`)
})

fs.readdir(__dirname + '/events/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const { event } = require(`${__dirname}/events/${file}`)
        const eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client))
    })
})

client.commands = new Map()

fs.readdir(__dirname + '/commands/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const props = require(`${__dirname}/commands/${file}`)
        const commandName = file.split('.')[0]
        client.commands.set(commandName, props)
    })
})

// switch (command.toLowerCase()) {
//     case 'imp':
//     case 'import': {
//         message.reply('Actuellement sur la TODO list, déso ! :(')
//         break
//     }

//     case 's':
//     case 'stuff': {
//         message.reply('Actuellement sur la TODO list, déso ! :(')
//         break
//     }

//     case 'e':
//     case 'equip':
//     case 'equipment': {
//         message.reply('Actuellement sur la TODO list, déso ! :(')
//         break
//     }

//     case 'log':
//     case 'login': {
//         const { id } = message.author
//         message.reply(`Actuellement sur la TODO list, déso ! :(`)
//         break
//     }

//     default: {
//         message.reply('Commande inconnue :(')
//     }
// }
// })

client.login(process.env.API_KEY)
