import { gql } from "@apollo/client";

const GET_USERS = gql`
  query ($page: Int, $limit: Int, $filter: UserFilter) {
    result: getUsers(page: $page, limit: $limit, filter: $filter) {
      paginate {
        page
        limit
        total
        pages
      }
      data {
        id
        name
        last_name
        full_name
        username
        email
        mobile
        is_active
        access_id
        createdAt
        updatedAt

        user_information {
          media {
            media_id
            alt
            url

            # media
          }
          address_ids
          phone
          gender

          # addresses
        }
        # role
        # roleAccessControlLists
        # panel
        # panelAccessControlLists
        # blogs
        # products
        # brands
        # categories
        # medias

        # transactions
        # complete_orders
        # cart
        # tutorials
      }
    }
  }
`;

const GET_USERS_WITH_ACCESSES = gql`
  query ($page: Int, $limit: Int, $filter: UserFilter, $sort: [Sort]) {
    users: getUsers(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      paginate {
        page
        limit
        total
        pages
      }
      data {
        id
        name
        last_name
        full_name
        username
        email
        mobile
        is_active
        access_id
        createdAt
        updatedAt

        user_information {
          media {
            media_id
            alt
            url

            # media
          }
          address_ids
          phone
          gender

          # addresses
        }
        # role
        # roleAccessControlLists
        # panel
        # panelAccessControlLists
        # blogs
        # products
        # brands
        # categories
        # medias

        # transactions
        # complete_orders
        # cart
        # tutorials
      }
    }
    accesses: getAllAccesses {
      id
      name
      description
      createdAt
      updatedAt

      # accessControlLists
      # users
    }
  }
`;

const GET_ALL_USERS = gql`
  query ($filter: UserFilter) {
    result: getAllUsers(filter: $filter) {
      id
      name
      last_name
      full_name
      username
      email
      mobile
      is_active
      access_id
      createdAt
      updatedAt

      user_information {
        media {
          media_id
          alt
          url

          # media
        }
        address_ids
        phone
        gender

        # addresses
      }
      # role
      # roleAccessControlLists
      # panel
      # panelAccessControlLists
      # blogs
      # products
      # brands
      # categories
      # medias

      # transactions
      # complete_orders
      # cart
      # tutorials
    }
  }
`;

const GET_USER = gql`
  query ($id: ID!) {
    result: getUser(id: $id) {
      id
      name
      last_name
      full_name
      username
      email
      mobile
      is_active
      access_id
      createdAt
      updatedAt

      user_information {
        media {
          media_id
          alt
          url

          # media
        }
        address_ids
        phone
        gender

        # addresses
      }
      # role
      # roleAccessControlLists
      # panel
      # panelAccessControlLists
      # blogs
      # products
      # brands
      # categories
      # medias

      # transactions
      # complete_orders
      # cart
      # tutorials
    }
  }
`;

const GET_USER_WITH_ACCESSES = gql`
  query ($id: ID!) {
    user: getUser(id: $id) {
      id
      name
      last_name
      full_name
      username
      email
      mobile
      is_active
      access_id
      createdAt
      updatedAt

      user_information {
        media {
          media_id
          alt
          url

          # media
        }
        address_ids
        phone
        gender

        # addresses
      }
      # role
      # roleAccessControlLists
      # panel
      # panelAccessControlLists
      # blogs
      # products
      # brands
      # categories
      # medias

      # transactions
      # complete_orders
      # cart
      # tutorials
    }
    accesses: getAllAccesses {
      id
      name
      description
      createdAt
      updatedAt

      # accessControlLists
      # users
    }
  }
`;

export {
  GET_USERS,
  GET_ALL_USERS,
  GET_USER,
  GET_USERS_WITH_ACCESSES,
  GET_USER_WITH_ACCESSES,
};
