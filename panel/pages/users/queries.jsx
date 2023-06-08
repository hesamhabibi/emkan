import { gql } from "@apollo/client";

export default {
  all: gql`
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
          username
          email
          mobile
          is_active
          access_id
          access {
            name
          }
        }
      }
      accesses: getAccessIdsByAccess {
        id
        name
      }
    }
  `,
  create: gql`
    mutation ($input: UserInput!) {
      result: createUser(input: $input) {
        id
        name
        last_name
        username
        email
        mobile
        is_active
        access_id
        access {
          name
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: UserInput!) {
      result: updateUser(id: $id, input: $input) {
        id
        name
        last_name
        username
        email
        mobile
        is_active
        access_id
        access {
          name
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteUser(id: $id) {
        success
        message
      }
    }
  `,
  changePassword: gql`
    mutation ($id: ID!, $input: changePasswordUserInput!) {
      result: changePasswordUser(id: $id, input: $input) {
        id
      }
    }
  `,
};
