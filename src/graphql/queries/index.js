import * as FRAGMENTS from '../fragments'

export const MY_STUFFS_IDS = `#graphql
    query {
        myStuffs {
            _id
            name
        }
    }
`

export const MY_STUFFS = `#graphql
    query {
        myStuffs {
            ...StuffInfosFragment
            ...StuffBaseStatsFragment
            ...StuffFullStatsFragment
            smithmagic
            equipments {
                name
                type
            }
        }
    }

    ${FRAGMENTS.STUFF_INFOS}
    ${FRAGMENTS.STUFF_BASE_STATS}
    ${FRAGMENTS.STUFF_FULL_STATS}
`

export const GET_STUFF_BY_ID = `#graphql
    query($id: MongoID) {
        stuffOne(filter: { _id: $id }) {
            ...StuffInfosFragment
            ...StuffBaseStatsFragment
            ...StuffFullStatsFragment
            smithmagic
            equipments {
                name
                type
            }
        }
}

    ${FRAGMENTS.STUFF_INFOS}
    ${FRAGMENTS.STUFF_BASE_STATS}
    ${FRAGMENTS.STUFF_FULL_STATS}
`

export const ME = `#graphql
    query {
        me {
            username
            stuffs {
                name
            }
            characters {
                name
            }
        }
    }
`
