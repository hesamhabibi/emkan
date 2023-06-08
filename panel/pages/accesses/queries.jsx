import { gql } from "~/app/apollo-client";

export default {
  allowed: ["name", "description"],
  all: gql`
    query ($page: Int, $limit: Int, $filter: AccessFilter) {
      result: getAccesses(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          name
          description
        }
      }
    }
  `,
  create: gql`
    mutation ($input: AccessInput!) {
      result: createAccess(input: $input) {
        id
        name
        description
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: AccessInput!) {
      result: updateAccess(id: $id, input: $input) {
        id
        name
        description
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteAccess(id: $id) {
        success
        message
      }
    }
  `,
};
