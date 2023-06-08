import { gql } from "@apollo/client"

export default {
  login: gql`
    mutation (
      $username: String
      $password: String
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
          last_name
          email
          username
        }

        menu_items {
          id
          access_component_id # if is null menu item is collapse
          parent_id
          sort
          title
          icon
          badge_key
          route
          columns
          fields
          actions
          child_access_components_keys
        }
        settings
      }
    }
  `,
}
