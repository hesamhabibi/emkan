import { gql } from "@apollo/client";

export default {
  allowed: ["name", "key", "description"],
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
          key
          action_type
          action
          field
          description
          sort
          parent_id
          kind_status
          createdAt
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
