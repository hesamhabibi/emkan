import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

export const ServerQuery = (token) => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.apiHost}/api/graphql`,
      credentials: "same-origin",
      headers: { Authorization: `Bearer ${token}` },
    }),
    cache: new InMemoryCache({
      addTypename: false,
      resultCaching: false,
    }),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  })
}
