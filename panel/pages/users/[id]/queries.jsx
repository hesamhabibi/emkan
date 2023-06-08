import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: AddressFilter) {
      cities: getSettingByKey(key: "all_cities") {
        value
      }
      states: getSettingByKey(key: "all_states") {
        value
      }
      result: getAddresses(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          title
          id
          postal_code
          city_id
          state_id
          address
          location
          is_default
          model_name
          model_id
          address

          city {
            id
            name
            name_panel
            name_web
            slug
            state_id
          }

          state {
            id
            name_panel
          }
        }
      }
    }
  `,
  create: gql`
    mutation ($input: UserAddressInput!) {
      result: createUserAddress(input: $input) {
        id
        postal_code
        city_id
        state_id
        address
        location
        is_default
        title
        address
        city {
          id
          name
          name_panel
          name_web
          slug
          state_id
        }

        state {
          id
          name_panel
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: AddressInput!) {
      result: updateAddress(id: $id, input: $input) {
        id
        postal_code
        city_id
        state_id
        address
        location
        is_default
        model_name
        model_id
        createdAt
        updatedAt
        title
        address

        city {
          id
          name
          name_panel
          name_web
          slug
          state_id
        }
        state {
          id
          name_panel
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteAddress(id: $id) {
        success
        message
      }
    }
  `,
}
