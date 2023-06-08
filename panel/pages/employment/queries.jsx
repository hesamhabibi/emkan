import { gql } from "@apollo/client"

export default {
  all: gql`
    query($page: Int, $limit: Int, $filter: CareerFormFilter) {
  result: getCareerForms(page: $page, limit: $limit, filter: $filter) {
    paginate {
        page
        limit
        total
        pages
    }
    data {
        id
        title # multi language
        title_panel
        title_web
        user_name
        user_last_name
        user_email
        user_mobile
        fields {
            name
            title # multi language
            title_panel
            title_web
            type
            size
            value
        }
        createdAt
    }
  }
}
  `,
}
