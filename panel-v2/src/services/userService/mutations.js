import { gql } from "@apollo/client";

const DELETE_USER = gql`
mutation($id: ID!) {
    result: deleteUser(id: $id) {
      success
      message
    }
  }
`;

const CREATE_USER = gql`
mutation($input: UserInput!) {
    result: createUser(input: $input) {
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

const UPDATE_USER = gql`
mutation($id: ID!, $input: UserInput!) {
    result: updateUser(id: $id, input: $input) {
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
`

export {DELETE_USER,CREATE_USER,UPDATE_USER}
