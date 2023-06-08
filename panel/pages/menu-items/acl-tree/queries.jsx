import { gql } from "@apollo/client";

export default {
  all: gql`
    query ($parent_id: ID!, $access_id: ID, $filter: AccessComponentFilter) {
      result: getAllAccessComponentsChildren(
        parent_id: $parent_id
        access_id: $access_id
        filter: $filter
      ) {
        id
        name
        type
        key
        action_type
        action
        description
        sort
        parent_id
        kind_status
        createdAt

        is_internal
        has_access
      }
    }
  `,
  submit: gql`
    mutation (
      $access_id: ID!
      $accessComponents: [AccessControlListBulkInput]
    ) {
      result: bulkCreateAccessControlList(
        access_id: $access_id
        accessComponents: $accessComponents
      ) {
        success
        message
      }
    }
  `,
};
