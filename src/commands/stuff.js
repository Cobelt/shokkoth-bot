import axios from 'axios'

import { QUERIES } from '../graphql'
import * as MESSAGES from '../messages'

import { deleteShortlyAfter, getHeaders } from '../utils'

export async function run(client, message, args) {
    try {
        const id = args?.[0] || undefined
        const headers = getHeaders(client, message)

        const { data: { data, errors } = {} } = await axios.post(
            process.env.GRAPHQL_URI,
            {
                query: QUERIES.GET_STUFF_BY_ID,
                variables: id ? { id } : undefined,
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

        if (!data?.stuffOne) {
            return message.reply(
                MESSAGES.COMMON.error({
                    client,
                    customMessage: id
                        ? `Aucun stuff trouvé, il est peut-être en privé et ${
                              headers
                                  ? "tu n'en es pas le propriétaire"
                                  : "tu n'es pas loggué"
                          }`
                        : 'Aucun stuff publique trouvé',
                })
            )
        }

        return message.reply(
            MESSAGES.STUFFS.get({
                client,
                message,
                data: data?.stuffOne,
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
