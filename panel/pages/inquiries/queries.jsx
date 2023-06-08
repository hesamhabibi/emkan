import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: OrderFilter) {
      users: getAllUsers {
        id
        name: full_name
      }
      result: getOrders(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          user_id
          discount {
            code
          }
          transaction_id
          address_id
          date
          number
          post_track_code

          shipping_method {
            title_panel
          }

          payment_gateway {
            title_panel
          }

          type # {'cart': 1,'pre_order': 2,'complete': 3}
          status # {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}
          note
          products {
            product_id
            mix_variant_keys
            count
            note

            price {
              main_price
            }

            product {
              id
              title: title_panel

              details {
                product_code # String
              }

              order_mix_variant {
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
                }
              }

              variant {
                name # multi language
                name_panel
                name_web
                labels {
                  key
                  title_panel
                }
              }
            }
          }
          createdAt
          updatedAt

          total_prices {
            sum_product_price
            sum_product_price_without_offer
            total_price_with_discount
            post_price
            payment_price
            total_weight
          }

          user {
            full_name
            mobile
            email
          }

          address {
            state {
              name
            }
            city {
              name
            }
            address
            postal_code
          }
          # discount
          # transaction
          # all_transactions
          # address
        }
      }
    }
  `,
  setStatus: gql`
    mutation ($id: ID, $status: Int) {
      result: setStatusOrder(id: $id, status: $status) {
        id
        user_id
        discount_id
        transaction_id
        address_id
        date
        number
        post_track_code
        shipping_method # { ... }
        payment_method # { ... }
        type # {'cart': 1,'pre_order': 2,'complete': 3}
        status # {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}
        note
        products {
          product_id
          mix_variant_keys
          count
          note

          product {
            id
            title: title_panel

            details {
              product_code # String
            }

            order_mix_variant {
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
              }
            }

            variant {
              name # multi language
              name_panel
              name_web
              labels {
                key
                title_panel
              }
            }
          }
        }

        user {
          full_name
          mobile
        }

        # discount
        # transaction
        # address
      }
    }
  `,
  setPostTrackCodeOrder: gql`
    mutation ($id: ID, $post_track_code: Int) {
      result: setPostTrackCodeOrder(
        id: $id
        post_track_code: $post_track_code
      ) {
        id
        user_id
        discount_id
        transaction_id
        address_id
        date
        number
        post_track_code
        shipping_method # { ... }
        payment_method # { ... }
        type # {'cart': 1,'pre_order': 2,'complete': 3}
        status # {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}
        note
        products {
          product_id
          mix_variant_keys
          count
          note

          # product
        }
        createdAt
        updatedAt

        total_prices {
          sum_product_price
          sum_product_price_without_offer
          total_price_with_discount
          post_price
          payment_price
          total_weight
        }

        user {
          full_name
          mobile
        }
        # discount
        # transaction
        # all_transactions
        # address
      }
    }
  `,
  sendComment: gql`
    mutation ($id: ID, $comment: Int) {
      result: sendCommentOrder (id: $id, comment: $comment) {
        id
        user_id
        discount_id
        transaction_id
        address_id
        date
        number
        post_track_code
        shipping_method # { ... }
        payment_method # { ... }
        type # {'cart': 1,'pre_order': 2,'complete': 3}
        status # {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}
        note
        products {
          product_id
          mix_variant_keys
          count
          note

          # product
        }
        createdAt
        updatedAt

        total_prices {
          sum_product_price
          sum_product_price_without_offer
          total_price_with_discount
          post_price
          payment_price
          total_weight
        }

        user {
          full_name
          mobile
        }
        # discount
        # transaction
        # all_transactions
        # address
      }
    }
  `,
  setStatusOrder: gql`
    mutation ($id: ID, $input: setStatusOrderInput) {
      result: setStatusOrder(id: $id, input: $input) {
        id
        user_id
        discount {
          code
        }
        transaction_id
        address_id
        date
        number
        post_track_code

        shipping_method {
          title_panel
        }

        payment_gateway {
          title_panel
        }

        type # {'cart': 1,'pre_order': 2,'complete': 3}
        status # {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}
        note
        products {
          product_id
          mix_variant_keys
          count
          note

          price {
            main_price
          }

          product {
            id
            title: title_panel

            details {
              product_code # String
            }

            order_mix_variant {
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
              }
            }

            variant {
              name # multi language
              name_panel
              name_web
              labels {
                key
                title_panel
              }
            }
          }
        }
        createdAt
        updatedAt

        total_prices {
          sum_product_price
          sum_product_price_without_offer
          total_price_with_discount
          post_price
          payment_price
          total_weight
        }

        user {
          full_name
          mobile
          email
        }

        address {
          state {
            name
          }
          city {
            name
          }
          address
          postal_code
        }
        # discount
        # transaction
        # all_transactions
        # address
      }
    }
  `,
  postTrack: gql`
    mutation ($id: ID, $input: setPostTrackCodeOrderInput) {
      result: setPostTrackCodeOrder(id: $id, input: $input) {
        id
        user_id
        discount {
          code
        }
        transaction_id
        address_id
        date
        number
        post_track_code

        shipping_method {
          title_panel
        }

        payment_gateway {
          title_panel
        }

        type # {'cart': 1,'pre_order': 2,'complete': 3}
        status # {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}
        note
        products {
          product_id
          mix_variant_keys
          count
          note

          price {
            main_price
          }

          product {
            id
            title: title_panel

            details {
              product_code # String
            }

            order_mix_variant {
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
              }
            }

            variant {
              name # multi language
              name_panel
              name_web
              labels {
                key
                title_panel
              }
            }
          }
        }
        createdAt
        updatedAt

        total_prices {
          sum_product_price
          sum_product_price_without_offer
          total_price_with_discount
          post_price
          payment_price
          total_weight
        }

        user {
          full_name
          mobile
          email
        }

        address {
          state {
            name
          }
          city {
            name
          }
          address
          postal_code
        }
        # discount
        # transaction
        # all_transactions
        # address
      }
    }
  `,
}
