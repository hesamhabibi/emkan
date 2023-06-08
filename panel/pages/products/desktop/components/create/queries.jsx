import { gql } from "@apollo/client";

export default {
  attribute: gql`
    mutation ($input: AttributeInput!) {
      result: createAttribute(input: $input) {
        id
        parent_id
        sort
        deep
        name: title_panel
        attribute_group_ids
        attribute_ids
        type
        default_value
      }
    }
  `,
};
