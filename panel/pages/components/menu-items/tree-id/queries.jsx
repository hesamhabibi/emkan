import { gql } from "~/app/apollo-client";

export default {
  all: gql`
    query ($parent_id: ID!, $filter: AccessComponentFilter) {
      result: getAllAccessComponentsChildren(
        parent_id: $parent_id
        filter: $filter
      ) {
        id
        name
        type # values: {"menu_item": 1, "column": 2, "route": 3, "id": 4, "action": 5}
        key
        action_type
        action
        field
        description
        sort
        parent_id
        kind_status

        is_internal
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
        parent_id
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
        parent_id
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
  sort: gql`
    mutation ($input: [sortAccessComponentInput]) {
      result: sortAccessComponents(input: $input) {
        success
        message
      }
    }
  `,
};
