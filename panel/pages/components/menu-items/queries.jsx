import { gql } from "~/app/apollo-client";

export default {
  allowed: ["name", "type", "description", "kind_status", "type", "action"],
  all: gql`
    query ($page: Int, $limit: Int, $filter: AccessComponentFilter) {
      result: getAccessComponents(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          name
          type
          description
          action
          kind_status
          is_internal
        }
      }
    }
  `,
  create: gql`
    mutation ($input: AccessComponentInput!) {
      result: createAccessComponent(input: $input) {
        id
        name
        type
        key
        action_type
        action
        field
        description
        sort
        kind_status
        is_internal
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: AccessComponentInput!) {
      result: updateAccessComponent(id: $id, input: $input) {
        id
        name
        type
        key
        action_type
        action
        field
        description
        sort
        kind_status
        is_internal
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteAccessComponent(id: $id) {
        success
        message
      }
    }
  `,
};
