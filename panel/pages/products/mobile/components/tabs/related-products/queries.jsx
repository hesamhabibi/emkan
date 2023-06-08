import { gql } from "@apollo/client"

export default {
  relatedProducts: gql`
    query ($selection: RelatedProductSelectionInput) {
      result: getAllRelatedProductBySelection(selection: $selection) {
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
        status
        publishAt
        has_rating
        is_special
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
        media {
          media_id
          alt # multi language
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
            collection_type
            collection_id

            # collection
            # collection_title
            # collection_title_panel
            # collection_title_web
            # collection_list
          }
        }

        tutorials {
          file_key
          title
          title_panel
          title_web
          user_access_ids

          # user_accesses
        }

        # price_history
        # categories
        # brand
        # tags
        # tag_group
        # comments
        # user
      }
    }
  `,
}
