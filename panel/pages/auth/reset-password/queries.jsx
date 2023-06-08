import { gql } from "@apollo/client"

export default {
  resetPassword: gql`
    mutation ($email: String!, $recaptcha_v3_token: String) {
      result: resetPasswordEmail(
        email: $email
        recaptcha_v3_token: $recaptcha_v3_token
      ) {
        success
        message
      }
    }
  `,
  confirmation: gql`
    mutation ($input: UserResetPasswordInput) {
      result: resetPassword(input: $input) {
        success
        message
      }
    }
  `,
}
