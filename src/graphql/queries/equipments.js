export const SEARCH_EQUIPMENT = `#graphql
    query ($searchName: String) {
        equipmentOne(filter: { searchName: $searchName }) {
            _id
            ankamaId
            name
            level
            type
            category
            typeOrder
            imgUrl
            url
            
            statistics
            characteristics
            passives
            conditions
            
            set {
                name
                equipments {
                    name
                    type
                }
            }
        }
    }
`
