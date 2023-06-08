import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: ProductFilter) {
      result: getProducts(page: $page, limit: $limit, filter: $filter) {
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
          summary # multi language
          summary_panel
          description # multi language
          description_panel
          status # ["inactive": 1, "show": 2, "draft": 3]
          type # ["product": 1, "digital": 2, "service": 3]
          category_id
          brand_id
          tag_ids
          tag_group_id

          price {
            price
            offer_price
            offer_startAt
            offer_expireAt
            discount_percent
          }
          comments {
            id
            title
            text
            user_id
            user {
              full_name
            }
            confirmed
            reply_to_id
            model_name
          }
          price_history {
            id
            price
            offer_price
            discount_percent
            createdAt
          }

          mix_variant {
            keys # array of String
            is_main_price # boolean
            is_active # boolean
            sort
            price_id

            has_media_gallery
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

            details {
              product_code # String
              warehouse # String
              use_count # Boolean
              count # Int
              count_status # Int
              count_unit # Int
              limit_min # Int
              limit_max # Int
              length # Int cm
              width # Int cm
              height # Int cm
              weight # Int grams
            }

            price {
              price
              offer_price
              offer_startAt
              offer_expireAt
              discount_percent
            }

            # price
            price_history {
              id
              price
              offer_price
              discount_percent
              createdAt
            }
          }
          seo {
            title # multi language
            title_panel
            title_web
            description # multi language
            description_panel
            description_web
            keywords # multi language
            keywords_panel
            keywords_web
            url
            url_status
            canonical_url
            redirect_url_301
            redirect_url_404
            robots_status
          }

          price_history {
            id
            price
            offer_price
            discount_percent
            createdAt
          }
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
          attribute_variant_id
          attribute_groups {
            attribute_group_id
            attributes {
              attribute_id
              attribute_value_id

              # attribute
              # attribute_value
              # value # multi language
              # value_panel
              # value_web
            }

            # attribute_group
          }
          # price_history
          # category
          # brand
          # tags
          # tag_groups
          # attribute_groups
          variant {
            name # multi language
            name_panel
            name_web
            type # {"text": 1, "color": 2, "shop": 3, "file":4 }
            labels {
              key
              title # multi language
              title_panel
              title_web
              values # JSON
            }
          }
          # mix_variant
          # user
        }
      }
    }
  `,
  create: gql`
    mutation ($input: ProductInput!) {
      result: createProduct(input: $input) {
        id
        title # multi language
        title_panel
        title_web
        summary # multi language
        summary_panel
        description # multi language
        description_panel
        status # ["inactive": 1, "show": 2, "draft": 3]
        type # ["product": 1, "digital": 2, "service": 3]
        category_id
        brand_id
        tag_ids
        tag_group_id

        price {
          price
          offer_price
          offer_expireAt
          offer_startAt
          discount_percent
          product_code
          count
          limit
        }
        seo {
          title # multi language
          title_panel
          description # multi language
          description_panel
          keywords # multi language
          keywords_panel
          url
          url_status
          canonical_url
          redirect_url_301
          redirect_url_404
          robots_status
        }
        mix_variant {
          keys
        }
        price_history {
          id
          price
          offer_price
          discount_percent
          createdAt
        }
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
        attribute_variant_id
        attribute_groups {
          attribute_group_id
          attributes {
            attribute_id
            attribute_value_id

            # attribute
            # attribute_value
            # value # multi language
            # value_panel
            # value_web
          }

          # attribute_group
        }
        # price_history
        # category
        # brand
        # tags
        # tag_groups
        # attribute_groups
        variant {
          name # multi language
          name_panel
          name_web
          type # {"text": 1, "color": 2, "shop": 3, "file":4 }
          labels {
            key
            title # multi language
            title_panel
            title_web
            values # JSON
          }
        }
        mix_variant {
          keys # array of String
          is_main_price # boolean
          is_active # boolean
          sort
          price_id

          has_media_gallery
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

          details {
            product_code # String
            warehouse # String
            use_count # Boolean
            count # Int
            count_status # Int
            count_unit # Int
            limit_min # Int
            limit_max # Int
            length # Int cm
            width # Int cm
            height # Int cm
            weight # Int grams
          }

          price {
            price
            offer_price
            offer_startAt
            offer_expireAt
            discount_percent
          }

          # price
          price_history {
            id
            price
            offer_price
            discount_percent
            createdAt
          }
        }
        # user
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: ProductInput!) {
      result: updateProduct(id: $id, input: $input) {
        id
        title # multi language
        title_panel
        summary # multi language
        summary_panel
        description # multi language
        description_panel
        status # ["inactive": 1, "show": 2, "draft": 3]
        type # ["product": 1, "digital": 2, "service": 3]
        category_id
        brand_id
        tag_ids
        tag_group_id

        price {
          price
          offer_price
          offer_startAt
          offer_expireAt
          discount_percent
        }

        price_history {
          id
          price
          offer_price
          discount_percent
          createdAt
        }

        mix_variant {
          keys # array of String
          is_main_price # boolean
          is_active # boolean
          sort
          price_id

          has_media_gallery
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

          details {
            product_code # String
            warehouse # String
            use_count # Boolean
            count # Int
            count_status # Int
            count_unit # Int
            limit_min # Int
            limit_max # Int
            length # Int cm
            width # Int cm
            height # Int cm
            weight # Int grams
          }

          price {
            price
            offer_price
            offer_startAt
            offer_expireAt
            discount_percent
          }

          # price
          # price_history
        }
        seo {
          title # multi language
          title_panel
          title_web
          description # multi language
          description_panel
          description_web
          keywords # multi language
          keywords_panel
          keywords_web
          url
          url_status
          canonical_url
          redirect_url_301
          redirect_url_404
          robots_status
        }

        price_history {
          id
          price
          offer_price
          discount_percent
          createdAt
        }
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
        attribute_variant_id
        attribute_groups {
          attribute_group_id
          attributes {
            attribute_id
            attribute_value_id

            # attribute
            # attribute_value
            # value # multi language
            # value_panel
            # value_web
          }

          # attribute_group
        }
        # price_history
        # category
        # brand
        # tags
        # tag_groups
        # attribute_groups
        variant {
          name # multi language
          name_panel
          name_web
          type # {"text": 1, "color": 2, "shop": 3, "file":4 }
          labels {
            key
            title # multi language
            title_panel
            title_web
            values # JSON
          }
        }
        mix_variant {
          keys # array of String
          is_main_price # boolean
          is_active # boolean
          sort
          price_id

          has_media_gallery
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

          details {
            product_code # String
            warehouse # String
            use_count # Boolean
            count # Int
            count_status # Int
            count_unit # Int
            limit_min # Int
            limit_max # Int
            length # Int cm
            width # Int cm
            height # Int cm
            weight # Int grams
          }

          price {
            price
            offer_price
            offer_startAt
            offer_expireAt
            discount_percent
          }

          # price
          price_history {
            price
            offer_price
            discount_percent
            createdAt
          }
        }
        # user
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteProduct(id: $id) {
        success
        message
      }
    }
  `,
  updateMixVariant: gql`
    mutation ($input: [ProductUpdateMixVariantInput]) {
      result: updateMixVariant(input: $input) {
        success
        message
      }
    }
  `,
}
