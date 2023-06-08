import { gql } from "@apollo/client";

export default {
  create: gql`
    mutation ($input: BrandInput!) {
      result: createBrand(input: $input) {
        id
        name: title_panel
      }
    }
  `,
};
