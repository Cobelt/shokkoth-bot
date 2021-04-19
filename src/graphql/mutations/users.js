export const LOGIN = `#graphql
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password)
    }
`
export const SIGNUP = `#graphql
    mutation($username: String!, $password: String!) {
        signup(username: $username, password: $password)
    }
`
