import axios from 'axios'

import { QUERIES } from '../graphql'
import * as MESSAGES from '../messages'

import { deleteShortlyAfter, getHeaders } from '../utils'

export async function run(client, message, args) {
    const headers = getHeaders(client, message)
    if (!headers) {
        return message
            .reply(MESSAGES.COMMON.notConnected({ client, message }))
            .then(deleteShortlyAfter)
    }

    try {
        const { data: { data, errors } = {} } = await axios.post(
            process.env.GRAPHQL_URI,
            { query: QUERIES.ME },
            { headers }
        )

        if (errors?.length > 0) {
            return message
                .reply(
                    MESSAGES.COMMON.error({
                        client,
                        customMessage: `Erreur :\n${errors
                            ?.map(error => error?.message)
                            ?.join('\n')}`,
                    })
                )
                .then(deleteShortlyAfter)
        }

        if (!data?.me) {
            return message
                .reply(MESSAGES.COMMON.error({ client }))
                .then(deleteShortlyAfter)
        }

        return message.reply(
            MESSAGES.ME.get({ client, message, data: data?.me })
        )
    } catch (e) {
        console.error({ e })
        return message
            .reply(
                MESSAGES.COMMON.error({
                    client,
                    customMessage: `Erreur :\n${e.message}`,
                })
            )
            .then(deleteShortlyAfter)
    }
}
