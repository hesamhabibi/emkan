import { gql } from "@apollo/client";

export default {
  delete: gql`
    mutation ($id: ID) {
      result: deleteMedia(id: $id) {
        success
        message
      }
    }
  `,
};
