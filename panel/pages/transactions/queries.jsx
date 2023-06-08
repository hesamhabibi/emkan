import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: TransactionFilter) {
      result: getTransactions(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          sand_box # boolean
          status # { 1: true, 2: "fail" }
          request_response
          request_parsed_response {
            code
            message
          }
          callback_response
          callback_parsed_response {
            code
            message
          }
          verify_response
          verify_parsed_response {
            code
            message
          }
          gateway
          amount
          description
          unique_number
          paidAt
          verifiedAt
          payment_url
          order_id
          createdAt
          updatedAt

          order {
            number
          }
          user {
            full_name
            mobile
            email
          }
        }
      }
    }
  `,
}
