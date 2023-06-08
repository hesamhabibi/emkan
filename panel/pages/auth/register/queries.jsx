import { gql } from "@apollo/client";

export default {
  register: gql`
    mutation ($input: UserPanelRegisterInput!) {
      result: panelRegister(input: $input) {
        token
        user {
          id
          name
          last_name
          username
          email
          mobile
          is_active
          access_id
        }
      }
    }
  `,
};
