import axios from 'axios'

import { QUERIES } from '../graphql'
import * as MESSAGES from '../messages'

import { deleteShortlyAfter, getHeaders } from '../utils'

export async function run(client, message, args) {
    try {
        if (args?.length < 1) {
            return message
                .reply(
                    MESSAGES.ITEM.wrongFormat({
                        client,
                        customMessage: `Erreur :\n${errors
                            ?.map(error => error?.message)
                            ?.join('\n')}`,
                    })
                )
                .then(deleteShortlyAfter)
        }

        const headers = getHeaders(client, message)

        const { data: { data, errors } = {} } = await axios.post(
            process.env.GRAPHQL_URI,
            {
                query: QUERIES.SEARCH_EQUIPMENT,
                variables: {
                    searchName: args
                        .filter(e => !!e)
                        .join(' ')
                        .trim(),
                },
            },
            { headers }
        )

        console.log({
            searchName: args
                .filter(e => !!e)
                .join(' ')
                .trim(),
        })

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

        if (!data?.equipmentOne) {
            return message.reply(
                MESSAGES.COMMON.error({
                    client,
                    customMessage:
                        'Aucun item trouvé, essaye une autre partie du nom ?',
                })
            )
        }

        return message.reply(
            MESSAGES.ITEM.get({
                client,
                message,
                data: data?.equipmentOne,
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
