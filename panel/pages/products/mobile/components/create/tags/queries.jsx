import { gql } from "@apollo/client";

export default {
  create: gql`
    mutation ($input: TagInput!) {
      result: createTag(input: $input) {
        id
        name: title_panel
        deep
        tag_group_ids
      }
    }
  `,
};
