import { gql } from "@apollo/client";

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: ReportFilter) {
      result: getReports(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          action
          action_type
          parameters
          error
          status_code
          status
          createdAt
          device_info

          user {
            id
            full_name
          }
        }
      }
    }
  `,
  setStatus: gql`
    mutation ($id: ID!, $status: Int!) {
      result: setStatusReport(id: $id, status: $status) {
        id
        action
        action_type
        parameters
        error
        status_code
        status
        createdAt
        device_info

        user {
          id
          name
          last_name
          username
          email
          mobile

          access {
            name
          }
        }
      }
    }
  `,
};
