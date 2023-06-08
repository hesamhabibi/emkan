import { gql } from "@apollo/client";

export default {
  all: gql`
    {
      result: getAllCategories {
        id
        name: title_panel
        parent_id
      }
    }
  `,
  create: gql`
    mutation ($input: CategoryInput!) {
      result: createCategory(input: $input) {
        id
        name: title_panel
        parent_id
      }
    }
  `,
};
