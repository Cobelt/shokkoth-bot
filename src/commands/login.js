import axios from 'axios'

import { MUTATIONS } from '../graphql'
import * as MESSAGES from '../messages'

import { deleteShortlyAfter } from '../utils'

export async function run(client, message, args) {
    try {
        if (message?.channel?.type === 'dm') {
            message
                .reply(MESSAGES.LOGIN.shouldRemoveMsg({ client }))
                .then(deleteShortlyAfter)
        } else {
            message.delete()
        }

        const username = args?.[0]
        const password = args?.[1]

        if ((username ?? '') === '' || (password ?? '') === '') {
            return message
                .reply(MESSAGES.LOGIN.wrongFormat({ client, message }))
                .then(deleteShortlyAfter)
        }

        const { data: { data, errors } = {} } = await axios.post(
            process.env.GRAPHQL_URI,
            {
                query: MUTATIONS.LOGIN,
                variables: { username, password },
            }
        )

        if (errors?.length > 0) {
            return message
                .reply(
                    MESSAGES.COMMON.error({
                        client,
                        customMessage: `Erreur lors de la connexion :\n${errors
                            ?.map(error => error?.message)
                            ?.join('\n')}`,
                    })
                )
                .then(deleteShortlyAfter)
        }

        if (!data?.login) {
            return message
                .reply(MESSAGES.COMMON.error({ client }))
                .then(deleteShortlyAfter)
        }

        client.connections.set(message.author.id, data?.login)

        return message.reply(
            MESSAGES.COMMON.success({
                client,
                customMessage: 'Vous êtes connecté ! :)',
            })
        )
    } catch (e) {
        console.error({ e })
        return message
            .reply(
                MESSAGES.COMMON.error({
                    client,
                    customMessage: `Erreur lors de la connexion :\n${e.message}`,
                })
            )
            .then(deleteShortlyAfter)
    }
}
