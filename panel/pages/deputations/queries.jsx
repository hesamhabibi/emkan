import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: DeputationFilter) {
      cities: getSettingByKey(key: "all_cities") {
        value
      }
      states: getSettingByKey(key: "all_states") {
        value
      }
      result: getDeputations(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          title # mulit language
          title_panel
          description # mulit language
          state_id
          city_id
          address # mulit language
          address_panel
          postal_code
          location
          label # mulit language
          label_panel
          cellphone

          media {
            media_id
            alt # multi language
            url

            # media
          }
          media_gallery {
            media_id
            main
            alt # multi language
            url

            # media
          }
          # state
          # city
          # user
        }
      }
    }
  `,
  create: gql`
    mutation ($input: DeputationInput!) {
      result: createDeputation(input: $input) {
        id
        title # mulit language
        title_panel
        description # mulit language
        state_id
        city_id
        address # mulit language
        address_panel
        postal_code
        location
        label # mulit language
        label_panel
        cellphone

        media {
          media_id
          alt # multi language
          url

          # media
        }
        media_gallery {
          media_id
          main
          alt # multi language
          url

          # media
        }
        # state
        # city
        # user
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: DeputationInput!) {
      result: updateDeputation(id: $id, input: $input) {
        id
        title # mulit language
        title_panel
        description # mulit language
        state_id
        city_id
        address # mulit language
        address_panel
        postal_code
        location
        label # mulit language
        label_panel
        cellphone

        media {
          media_id
          alt # multi language
          url

          # media
        }
        media_gallery {
          media_id
          main
          alt # multi language
          url

          # media
        }
        # state
        # city
        # user
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteDeputation(id: $id) {
        success
        message
      }
    }
  `,
}
