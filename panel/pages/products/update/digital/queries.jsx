import { gql } from "@apollo/client"

export default {
  getData: gql`
    query ($id: ID!) {
      product: getProduct(id: $id) {
        title # multi language
        summary # multi language
        description # multi language
        strengths
        weaknesses
        main_features
        status # ["inactive": 1, "show": 2, "draft": 3]
        publishAt
        has_rating
        has_comment
        is_special
        only_description
        show_price
        type # ["product": 1, "digital": 2, "service": 3, "preview": 4]
        category_id
        brand_id
        tag_ids
        tag_group_id
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
        seo {
          title # multi language
          description # multi language
          keywords # multi language
          url
          canonical_url
          redirect_url_301
          redirect_url_404
          robots_status
        }
        media_gallery {
          media_id
          main
          alt # multi language
          url

          # media
        }
        video {
          media_id
          alt # multi language
          url

          # media
        }
        files {
          media_id
          alt # multi language
          url

          # media
        }
        attribute_variant_id
        attribute_groups {
          attribute_group_id
          attributes {
            attribute_id
            value # multi language
            #                      attribute_value_id

            # attribute
            # attribute_value
            # value_panel
            # value_web
          }

          # attribute_group
        }

        has_variant # boolean
        variant {
          name # multi language
          type # {"text": 1, "color": 2, "shop": 3, "file":4 }
          labels {
            key
            title # multi language
            values # JSON
          }
        }
        mix_variant {
          keys # array of String
          is_main_price # boolean
          is_active # boolean
          sort
       
          has_media_gallery
          price {
            price
            offer_price
            offer_startAt
            offer_expireAt
            discount_percent
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
        
                   # price
                   # price_history
        }

        collections {
          related_products {
            collection_type # {"static": 1, "dynamic": 2}
            collection_id

            # collection
            # collection_title
            # collection_title_panel
            # collection_title_web
            # collection_list
          }
        }

        services {
          api_config {
            type # {"rest":1,"graphql':2}
            app_key
            url
            mutation
          }
        }

        tutorials {
          file_key
          title
          user_access_ids

          # user_accesses
        }

        # price_history
        # category
        # brand
        # tags
        # tag_group
        # comments
        # user
      }
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
  update: gql`
    mutation ($id: ID!, $input: ProductInput!) {
      result: updateProduct(id: $id, input: $input) {
        title # multi language
        summary # multi language
        description # multi language
        strengths
        weaknesses
        main_features
        status # ["inactive": 1, "show": 2, "draft": 3]
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
        }
        seo {
          title # multi language
          description # multi language
          keywords # multi language
          url
          url_status
          canonical_url
          redirect_url_301
          redirect_url_404
          robots_status
        }
        media_gallery {
          media_id
          main
          alt # multi language
          url

          # media
        }
        video {
          media_id
          alt # multi language
          url

          # media
        }
        files {
          media_id
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
            value # multi language

            # attribute
            # attribute_value
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
        
        #          # price
        #          # price_history
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
