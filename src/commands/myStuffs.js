import axios from 'axios'

import { QUERIES } from '../graphql'
import * as MESSAGES from '../messages'

import { deleteShortlyAfter, getHeaders } from '../utils'

export async function run(client, message, args) {
    try {
        const headers = getHeaders(client, message)
        if (!headers) {
            return message
                .reply(MESSAGES.COMMON.notConnected({ client, message }))
                .then(deleteShortlyAfter)
        }

        const { data: { data, errors } = {} } = await axios.post(
            process.env.GRAPHQL_URI,
            {
                query:
                    args?.[0] === 'full'
                        ? QUERIES.MY_STUFFS
                        : QUERIES.MY_STUFFS_IDS,
            },
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

        if (!data?.myStuffs) {
            return message
                .reply(MESSAGES.COMMON.error({ client }))
                .then(deleteShortlyAfter)
        }

        return message.reply(
            MESSAGES.MY_STUFFS.idsList({
                client,
                message,
                data: data?.myStuffs,
            })
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
