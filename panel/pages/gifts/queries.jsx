import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: CollectionFilter) {
      result: getGiftCollections(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          list {
            product_id
            has_variant_key
            mix_variant_keys # array of arrays
            sort
            show
            expireAt

            # product
          }
          extra_fields {
            title # multi language
            title_panel
            description # multi language
            show
            media {
              media_id
              alt # multi language
              url
              # media
            }
            score
            startAt
            expireAt
            has_timer
            cover {
              media_id
              alt # multi language
              url

              # media
            }
            cover_position # {"up": 1,"up-right": 2,"right": 3,"down-right": 4,"down": 5, "down-left": 6,"left" 7,"up-left": 8}
            seo {
              title
              description # multi language
              keywords # multi language
              url
              canonical_url
              redirect_url_301
              redirect_url_404
              robots_status
            }
          }
        }
      }
    }
  `,
  create: gql`
    mutation ($input: CollectionInput!) {
      result: createGiftCollection(input: $input) {
        id
        list {
          product_id
          has_variant_key
          mix_variant_keys # array of arrays
          sort
          show
          expireAt

          # product
        }
        extra_fields {
          title # multi language
          title_panel
          description # multi language
          show
          media {
            media_id
            alt # multi language
            url
            # media
          }
          score
          startAt
          expireAt
          has_timer
          cover {
            media_id
            alt # multi language
            url

            # media
          }
          cover_position # {"up": 1,"up-right": 2,"right": 3,"down-right": 4,"down": 5, "down-left": 6,"left" 7,"up-left": 8}
          seo {
            title
            description # multi language
            keywords # multi language
            url
            canonical_url
            redirect_url_301
            redirect_url_404
            robots_status
          }
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: CollectionInput!) {
      result: updateGiftCollection(id: $id, input: $input) {
        id
        list {
          product_id
          has_variant_key
          mix_variant_keys # array of arrays
          sort
          show
          expireAt

          # product
        }
        extra_fields {
          title # multi language
          title_panel
          description # multi language
          show
          media {
            media_id
            alt # multi language
            url
            # media
          }
          score
          startAt
          expireAt
          has_timer
          cover {
            media_id
            alt # multi language
            url

            # media
          }
          cover_position # {"up": 1,"up-right": 2,"right": 3,"down-right": 4,"down": 5, "down-left": 6,"left" 7,"up-left": 8}
          seo {
            title
            description # multi language
            keywords # multi language
            url
            canonical_url
            redirect_url_301
            redirect_url_404
            robots_status
          }
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteGiftCollection(id: $id) {
        success
        message
      }
    }
  `,
}
