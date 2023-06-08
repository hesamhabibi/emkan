import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation (
    $username: String!
    $password: String!
    $recaptcha_v3_token: String
  ) {
    result: panelLogin(
      username: $username
      password: $password
      recaptcha_v3_token: $recaptcha_v3_token
    ) {
      token
      user {
        id
        name
        email
        username
      }
    }
  }
`;

// const REGISTER_USER = gql`
//   mutation ($input: UserPanelRegisterInput!) {
//     result: panelRegister(input: $input) {
//       token
//       user {
//         id
//         name
//         last_name
//         full_name
//         username
//         email
//         mobile
//       }
//     }
//   }
// `;

const LOGOUT_USER = gql`
  mutation {
    result: panelLogout {
      success
      message
    }
  }
`;

export { LOGIN_USER, LOGOUT_USER };
