import { gql } from "@apollo/client"

export default {
  getData: gql`
    query {
      attributes: getAllAttributes(filter: { active: [{ value: "true" }] }) {
        id
        parent_id
        sort
        deep
        name: title_panel
        attribute_group_ids
        attribute_ids
        type # ['text': 1,'big_text': 2,'two_answer_question': 3]
        default_value
      }
      result: getAllTags {
        id
        name: title_panel
        title
        deep
        tag_ids
      }
      categories: getAllCategories(filter: { type: [{ value: 3 }] }) {
        id
        name: title_panel
        parent_id
        title
      }
      brands: getAllBrands {
        id
        name: title_panel
        title
      }
      colors: getAllColorLabels {
        key
        title
        values
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
        summary_web
        description # multi language
        description_panel
        description_web
        strengths
        strengths_panel
        strengths_web
        weaknesses
        weaknesses_panel
        weaknesses_web
        main_features
        main_features_panel
        main_features_web
        status # ["inactive": 1, "show": 2, "draft": 3]
        publishAt
        has_rating
        is_special
        only_description
        show_price
        type # ["product": 1, "digital": 2, "service": 3, "preview": 4]
        category_id
        brand_id
        seo_id
        tag_ids
        tag_group_id
        user_id
        visit_count
        createdAt
        updatedAt

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
          id
          price
          offer_price
          offer_startAt
          offer_expireAt
          discount_percent
          createdAt
          updatedAt
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
          canonical_url
          redirect_url_301
          redirect_url_404
          robots_status
          createdAt
          updatedAt
        }
        media {
          media_id
          alt
          url

          # media
        }
        media_gallery {
          media_id
          main
          alt
          url

          # media
        }
        video {
          media_id
          alt
          url

          # media
        }
        files {
          media_id
          alt
          url

          # media
        }
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

        has_variant # boolean
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

          # price
          # price_history
        }

        collections {
          related_products {
            collection_type # {"static": 1, "dynamic": 2}
            collection_id
          }
        }

        tutorials {
          file_key
          title
          title_panel
          title_web
          user_access_ids
        }
      }
    }
  `,
}
