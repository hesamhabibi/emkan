import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: BrandFilter) {
      result: getBrands(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          title # multi language
          title_panel
          title_web
          active
          show_in_menu
          description # multi language
          description_panel
          description_web
          user_id
          createdAt
          updatedAt

          media {
            media_id
            alt
            url

            # media
          }
          # user
          seo {
            title # multi language
            # title_panel
            # title_web
            description # multi language
            # description_panel
            # description_web
            keywords # multi language
            # keywords_panel
            # keywords_web
            url
            # url_status #["auto": 1, "custom": 2]
            canonical_url
            redirect_url_301
            robots_status
            # createdAt
            # updatedAt
          }
        }
      }
    }
  `,
  create: gql`
    mutation ($input: BrandInput!) {
      result: createBrand(input: $input) {
        id
        title # multi language
        title_panel
        title_web
        active
        show_in_menu
        description # multi language
        description_panel
        description_web
        seo_id
        user_id
        createdAt
        updatedAt

        media {
          media_id
          alt # multi language
          url

          # media
        }
        # user
        seo {
          title # multi language
          # title_panel
          # title_web
          description # multi language
          # description_panel
          # description_web
          keywords # multi language
          # keywords_panel
          # keywords_web
          url
          # url_status #["auto": 1, "custom": 2]
          canonical_url
          redirect_url_301
          robots_status
          # createdAt
          # updatedAt
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: BrandInput!) {
      result: updateBrand(id: $id, input: $input) {
        id
        title # multi language
        title_panel
        title_web
        active
        show_in_menu
        description # multi language
        description_panel
        description_web
        seo_id
        user_id
        createdAt
        updatedAt

        media {
          media_id
          alt # multi language
          url

          # media
        }
        # user
        seo {
          title # multi language
          # title_panel
          # title_web
          description # multi language
          # description_panel
          # description_web
          keywords # multi language
          # keywords_panel
          # keywords_web
          url
          # url_status #["auto": 1, "custom": 2]
          canonical_url
          redirect_url_301
          robots_status
          # createdAt
          # updatedAt
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteBrand(id: $id) {
        success
        message
      }
    }
  `,
}
