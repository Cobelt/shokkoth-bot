import axios from 'axios'

import { MUTATIONS } from '../graphql'
import * as MESSAGES from '../messages'

import { deleteShortlyAfter, getHeaders } from '../utils'

export async function run(client, message, args) {
    try {
        if (message?.channel?.type !== 'dm') {
            message.delete()
        }

        const headers = getHeaders(client, message)
        if (!headers) {
            return message
                .reply(MESSAGES.COMMON.notConnected({ client, message }))
                .then(deleteShortlyAfter)
        }

        const _link = args?.[0]
        const link = link?.match(/^<?(?<link>.*)>?$/)?.link || _link

        if (!link) {
            return message
                .reply(
                    MESSAGES.COMMON.error({
                        client,
                        customMessage:
                            'Tu dois mettre un lien vers un stuff DB',
                    })
                )
                .then(deleteShortlyAfter)
        }

        const { data: { data, errors } = {} } = await axios.post(
            process.env.GRAPHQL_URI,
            {
                query: MUTATIONS.IMPORT_STUFF,
                variables: { link },
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

        if (!data?.importStuff) {
            return message
                .reply(MESSAGES.COMMON.error({ client }))
                .then(deleteShortlyAfter)
        }

        return message.reply(
            MESSAGES.STUFFS.get({
                client,
                message,
                data: data?.importStuff,
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
