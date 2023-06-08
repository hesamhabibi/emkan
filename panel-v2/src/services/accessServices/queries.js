import { gql } from "@apollo/client";

const GET_ALL_ACCESSES = gql`
query($filter: AccessFilter) {
    result: getAllAccesses(filter: $filter) {
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

export {GET_ALL_ACCESSES}