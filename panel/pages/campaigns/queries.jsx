import {gql} from "@apollo/client"

export default {
    all: gql`
    query ($page: Int, $limit: Int, $filter: CollectionFilter) {
      result: getCampaignCollections(
        page: $page
        limit: $limit
        filter: $filter
      ) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          type # {"static": 1, "dynamic": 2}
          condition {
            model_name
            limit
            logic # {"and": 1, "or": 2}
            orders {
              type # {"asc": 1, "desc": 2}
              field
            }
            wheres {
              operator # in CollectionModel in common folder
              where_field
              where_value
            }
          }
          list {
            product_id
            has_variant_key
            mix_variant_keys # array of arrays
            sort
            show
            expireAt

            product {
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
              has_comment
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
                createdAt
                updatedAt
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
                title_panel
                title_web
                user_access_ids

                # user_accesses
              }
            }
          }
          extra_fields {
            title # multi language
            title_panel
            # title_web
            description # multi language
            # description_panel
            # description_web
            show
            # seo_id
            media {
              media_id
              alt # multi language
              url
              # media
            }
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
              description
              keywords
              url
              # url_status
              canonical_url
              redirect_url_301
              robots_status
            }
          }
        }
      }
    }
  `,
    allRelated: gql`
    query($page: Int, $limit: Int, $filter: CollectionFilter) {
      result: getRelatedProductCollections(page: $page, limit: $limit, filter: $filter) {
      paginate {
        page
        limit
        total
        pages
      }
      data {
        id
        type # {"static": 1, "dynamic": 2}
        condition {
            model_name
            limit
            logic # {"and": 1, "or": 2}
            orders {
                type # {"asc": 1, "desc": 2}
                field
            }
            wheres {
                operator # in CollectionModel in common folder
                where_field
                where_value
            }
        }
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
            title_web
        }
        user_id
        createdAt
        updatedAt

        # user
      }
    }
    }`,
    create: gql`
    mutation ($input: CollectionInput!) {
      result: createCampaignCollection(input: $input) {
        id
        type # {"static": 1, "dynamic": 2}
        condition {
          model_name
          limit
          logic # {"and": 1, "or": 2}
          orders {
            type # {"asc": 1, "desc": 2}
            field
          }
          wheres {
            operator # in CollectionModel in common folder
            where_field
            where_value
          }
        }
        list {
          product_id
          has_variant_key
          mix_variant_keys # array of arrays
          sort
          show
          expireAt

          product {
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
            has_comment
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
              createdAt
              updatedAt
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
              title_panel
              title_web
              user_access_ids

              # user_accesses
            }
          }
        }
        extra_fields {
          title # multi language
          title_panel
          #          title_web
          description # multi language
          #          description_panel
          #          description_web
          show
          media {
            media_id
            alt # multi language
            #
            #
            url

            # media
          }
          startAt
          expireAt
          has_timer
          cover {
            media_id
            alt # multi language
            #
            #
            url

            # media
          }
          cover_position # {"up": 1,"up-right": 2,"right": 3,"down-right": 4,"down": 5, "down-left": 6,"left" 7,"up-left": 8}
          seo {
            title
            description
            keywords
            url
            #            url_status
            canonical_url
            redirect_url_301
            robots_status
          }
        }
        #        user_id
        #        createdAt
        #        updatedAt

        # user
      }
    }
  `,
    update: gql`
    mutation ($id: ID!, $input: CollectionInput!) {
      result: updateCampaignCollection(id: $id, input: $input) {
        id
        type # {"static": 1, "dynamic": 2}
        condition {
          model_name
          limit
          logic # {"and": 1, "or": 2}
          orders {
            type # {"asc": 1, "desc": 2}
            field
          }
          wheres {
            operator # in CollectionModel in common folder
            where_field
            where_value
          }
        }
        list {
          product_id
          has_variant_key
          mix_variant_keys # array of arrays
          sort
          show
          expireAt

          product {
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
            has_comment
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
            seo {
              title # multi language
              title_panel
              title_web
              description # multi language
              #              description_panel
              #              description_web
              keywords # multi language
              keywords_panel
              keywords_web
              url
              url_status
              canonical_url
              redirect_url_301
              redirect_url_404
              robots_status
              createdAt
              updatedAt
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
              #
              #
              url

              # media
            }
            video {
              media_id
              alt # multi language
              #
              #
              url

              # media
            }
            files {
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
              title_panel
              title_web
              user_access_ids

              # user_accesses
            }
          }
        }
        extra_fields {
          title # multi language
          title_panel
          #          title_panel
          #          title_web
          description # multi language
          #          description_panel
          #          description_web
          show
          #          seo_id
          media {
            media_id
            alt # multi language
            #
            #
            url

            # media
          }
          startAt
          expireAt
          has_timer
          cover {
            media_id
            alt # multi language
            #
            #
            url

            # media
          }
          cover_position # {"up": 1,"up-right": 2,"right": 3,"down-right": 4,"down": 5, "down-left": 6,"left" 7,"up-left": 8}
          seo {
            title
            description
            keywords
            url
            #            url_status
            canonical_url
            redirect_url_301
            robots_status
          }
        }
        #        user_id
        #        createdAt
        #        updatedAt

        # user
      }
    }
  `,
    createRelated: gql`
    mutation ($input: CollectionInput!) {
      result: createRelatedProductCollection(input: $input) {
        id
        type # {"static": 1, "dynamic": 2}
        condition {
          model_name
          limit
          logic # {"and": 1, "or": 2}
          orders {
            type # {"asc": 1, "desc": 2}
            field
          }
          wheres {
            operator # in CollectionModel in common folder
            where_field
            where_value
          }
        }
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
          title_web
        }
        user_id
        createdAt
        updatedAt

        # user
      }
    }
  `,
    updateRelated: gql`
    mutation ($id: ID!, $input: CollectionInput!) {
      result: updateRelatedProductCollection(id: $id, input: $input) {
        id
        type # {"static": 1, "dynamic": 2}
        condition {
          model_name
          limit
          logic # {"and": 1, "or": 2}
          orders {
            type # {"asc": 1, "desc": 2}
            field
          }
          wheres {
            operator # in CollectionModel in common folder
            where_field
            where_value
          }
        }
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
          title_web
        }
        user_id
        createdAt
        updatedAt

        # user
      }
    }
  `,
    delete: gql`
    mutation ($id: ID!) {
      result: deleteCampaignCollection(id: $id) {
        success
        message
      }
    }
  `,
    deleteRelated: gql`
      mutation($id: ID!) {
        result: deleteRelatedProductCollection(id: $id) {
          success
          message
        }
      }
  `,
}
