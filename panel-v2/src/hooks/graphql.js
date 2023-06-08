import { useApolloClient } from "@apollo/client";

function useGraphql() {
  const client = useApolloClient();
  async function queryGraphql(query, variables, options) {
    return await new Promise(async (resolve, reject) => {
      return await client
        .query({
          query,
          variables,
          fetchPolicy: "network-only",
          ...options,
        })
        .then(({ error, data }) => {
          if (error) {
            return reject({
              error,
              status: false,
            });
          }
          return resolve({
            data: data?.result ? data?.result : data,
            status: true,
          });
        });
    });
  }

  const mutationGraphql = async (mutation, variables) => {
    return await new Promise(async (resolve, reject) => {
      return await client
        .mutate({
          mutation,
          variables,
        })
        .then(({ error, data }) => {
          if (error) {
            return reject({
              error,
              status: false,
            });
          }
          return resolve({
            data: data?.result ? data?.result : data,
            status: true,
          });
        });
    });
  };
  return { queryGraphql, client, mutationGraphql };
}

export default useGraphql;
