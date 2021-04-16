import memoize from 'lodash.memoize'
import removeAccent from 'lodash.deburr'
import clone from 'lodash.clonedeep'

export const validate = (type, translationName, translationsObj = {}) => {
    if (!translationsObj[translationName]) return false
    if (translationName === findKey(type, translationsObj)) return true
    return false
}

export function replaceDeep(values, match, newValue) {
    let copy = clone(values)

    if (!(copy instanceof Object)) {
        return copy
    }

    Object.entries(values).forEach(([key, value]) => {
        if ([undefined, match].flat().includes(value)) {
            copy[key] = newValue
        } else if (value instanceof Object) {
            if (
                Object.values(value).some(
                    e => ![undefined, match].flat().includes(e)
                )
            ) {
                copy[key] = replaceDeep(value, match, newValue)
            } else {
                copy[key] = newValue
            }
        } else {
            copy[key] = value
        }
    })

    return copy
}

export const clean = memoize(
    values => replaceDeep(values, ['', null], undefined),
    values => JSON.stringify(values)
)

export const toLowerCaseNFC = memoize(string =>
    string.normalize('NFC').toLowerCase()
)

export const toURLValid = memoize(string =>
    toLowerCaseNFC(removeAccent(string).replace(/\W+/g, '-'))
)

export const translateType = (type, translations, lang) => {
    const validType = toURLValid(type)

    const found = Object.values(translations)
        .map(translation => {
            if (
                toURLValid(translation.fr) === validType ||
                toURLValid(translation.en) === validType
            ) {
                if (['fr', 'en'].includes(lang.toLowerCase()))
                    return translation[lang]
                if (toURLValid(translation.fr) === validType)
                    return translation.en
                if (toURLValid(translation.en) === validType)
                    return translation.fr
            }
        })
        .filter(e => !!e)
    if (found.length > 0) return found[0]
}

export function findKey(type, translations) {
    const validType = toURLValid(type)
    const [foundKey, foundTranslation] =
        Object.entries(translations).find(([key, translation]) => {
            return (
                toURLValid(translation.fr) === validType ||
                toURLValid(translation.en) === validType
            )
        }) || []
    return foundKey
}
