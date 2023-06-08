import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
  HttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

export { gql }

const authLink = setContext((_, { headers }) => {
  let token
  try {
    token = JSON.parse(localStorage.getItem("user")).token
  } catch (e) {
    token = ""
  }

  return {
    headers: {
      ...headers,
      token: token || "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: process.env.apiUrl })),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
})

export const server = (token) => {
  const serverLink = createHttpLink({
    uri: process.env.apiUrl,
  })

  const link = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        token,
      },
    }
  })

  return new ApolloClient({
    link: link.concat(serverLink),
    cache: new InMemoryCache({
      addTypename: false,
      resultCaching: false,
    }),
  })
}

export default client
