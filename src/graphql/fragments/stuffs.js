export const STUFF_INFOS = `#graphql
    fragment StuffInfosFragment on Stuffs {
        _id
        name
        level
        gender
        breed {
            name
        }
        public
    }
`

export const STUFF_BASE_STATS = `#graphql
    fragment StuffBaseStatsFragment on Stuffs {
        baseStats {
            attributed {
                VITALITY
                WIDSDOM
                STRENGTH
                INTELLIGENCE
                CHANCE
                AGILITY
            }
            scroll {
                VITALITY
                WIDSDOM
                STRENGTH
                INTELLIGENCE
                CHANCE
                AGILITY
            }
        }
    }
`

export const STUFF_FULL_STATS = `#graphql
    fragment StuffFullStatsFragment on Stuffs {
        stats {
            AP
            MP
            RANGE
            SUMMONS
            CRITICAL
            INITIATIVE
            VITALITY
            STRENGTH
            AGILITY
            INTELLIGENCE
            CHANCE
            WISDOM
            PUISSANCE
            DAMAGE
            NEUTRAL_DAMAGE
            EARTH_DAMAGE
            AIR_DAMAGE
            FIRE_DAMAGE
            WATER_DAMAGE
            MELEE_DAMAGE
            RANGED_DAMAGE
            CRITICAL_DAMAGE
            PUSHBACK_DAMAGE
            NEUTRAL_RESISTANCE
            EARTH_RESISTANCE
            FIRE_RESISTANCE
            WATER_RESISTANCE
            AIR_RESISTANCE
            NEUTRAL_STATIC_RESISTANCE
            EARTH_STATIC_RESISTANCE
            FIRE_STATIC_RESISTANCE
            WATER_STATIC_RESISTANCE
            AIR_STATIC_RESISTANCE
            MELEE_RESISTANCE
            RANGED_RESISTANCE
            CRITICAL_RESISTANCE
            PUSHBACK_RESISTANCE
            AP_PARRY
            MP_PARRY
            AP_REDUCTION
            MP_REDUCTION
            DODGE
            LOCK
            PROSPECTING
            HEALS
        }
    }
`
