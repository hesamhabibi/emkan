import { gql } from "~/app/apollo-client"

export default {
  allowed: ["name", "description"],
  all: gql`
    query ($page: Int, $limit: Int, $filter: DiscountFilter) {
      brands: getAllBrands {
        id
        name: title_panel
      }
      categories: getAllCategories(filter: { type: [{ value: 3 }] }) {
        id
        name: title_panel
      }
      campaigns: getAllCampaignCollections {
        id
        extra_fields {
          name: title_panel
        }
      }
      accesses: getAllAccesses {
        id
        name
      }
      users: getAllUsers {
        id
        name: full_name
      }
      result: getDiscounts(page: $page, limit: $limit, filter: $filter) {
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
          title_web
          code
          status # {'active': 1, 'inactive': 2}
          type # {'percent': 1, 'amount': 2}
          value
          max_price
          min_price
          startAt
          expireAt
          settings {
            use_limit {
              type # {'user': 1, 'code': 2}
              count
            }
            condition {
              type # {'factor': 1, 'category': 2, 'brand': 3, 'campaign': 4}
              values
            }
            access {
              type # {'user': 1, 'access': 2}
              values
            }
          }
        }
      }
    }
  `,
  create: gql`
    mutation ($input: DiscountInput!) {
      result: createDiscount(input: $input) {
        id
        title # mulit language
        title_panel
        title_web
        code
        status # {'active': 1, 'inactive': 2}
        type # {'percent': 1, 'amount': 2}
        value
        max_price
        min_price
        startAt
        expireAt
        settings {
          use_limit {
            type # {'user': 1, 'code': 2}
            count
          }
          condition {
            type # {'factor': 1, 'category': 2, 'brand': 3, 'campaign': 4}
            values
          }
          access {
            type # {'user': 1, 'access': 2}
            values
          }
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: DiscountInput!) {
      result: updateDiscount(id: $id, input: $input) {
        id
        title # mulit language
        title_panel
        title_web
        code
        status # {'active': 1, 'inactive': 2}
        type # {'percent': 1, 'amount': 2}
        value
        max_price
        min_price
        startAt
        expireAt
        settings {
          use_limit {
            type # {'user': 1, 'code': 2}
            count
          }
          condition {
            type # {'factor': 1, 'category': 2, 'brand': 3, 'campaign': 4}
            values
          }
          access {
            type # {'user': 1, 'access': 2}
            values
          }
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteDiscount(id: $id) {
        success
        message
      }
    }
  `,
  setStatus: gql`
    mutation ($id: ID, $status: Int) {
      result: setStatusDiscount(id: $id, status: $status) {
        id
        title # mulit language
        title_panel
        title_web
        code
        status # {'active': 1, 'inactive': 2}
        type # {'percent': 1, 'amount': 2}
        value
        max_price
        min_price
        startAt
        expireAt
        settings {
          use_limit {
            type # {'user': 1, 'code': 2}
            count
          }
          condition {
            type # {'factor': 1, 'category': 2, 'brand': 3, 'campaign': 4}
            values
          }
          access {
            type # {'user': 1, 'access': 2}
            values
          }
        }
      }
    }
  `,
}
