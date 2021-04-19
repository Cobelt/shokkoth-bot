import * as FRAGMENTS from '../fragments'

export const IMPORT_STUFF = `#graphql
mutation ($link: String!) {
    importStuff(link: $link) {
        ...StuffInfosFragment
        ...StuffBaseStatsFragment
        ...StuffFullStatsFragment
        smithmagic
        equipments {
            name
            type
        }
        public
    }
}

${FRAGMENTS.STUFF_INFOS}
${FRAGMENTS.STUFF_BASE_STATS}
${FRAGMENTS.STUFF_FULL_STATS}
`
