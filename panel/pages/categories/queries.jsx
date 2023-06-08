import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($filter: CategoryFilter) {
      result: getAllCategories(filter: $filter) {
        id
        title
        title_panel
        active
        show_in_menu
        title_panel
        description
        type # {blog:1, page:2, product:3}
        parent_id
        sort
        media {
          url
          alt
          media_id
        }
        seo {
          title
          description
          keywords
          url
          canonical_url
          redirect_url_301
          robots_status
        }
      }
    }
  `,
  create: gql`
    mutation ($input: CategoryInput!) {
      result: createCategory(input: $input) {
        id
        title
        title_panel
        sort
        active
        show_in_menu
        description
        type # {blog:1, page:2, product:3}
        parent_id
        media {
          url
          alt
          media_id
        }
        seo_id
        seo {
          title
          description
          keywords
          url
          canonical_url
          redirect_url_301
          robots_status
          redirect_url_404
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: CategoryInput!) {
      result: updateCategory(id: $id, input: $input) {
        id
        sort
        title
        title_panel
        active
        show_in_menu
        description
        type # {blog:1, page:2, product:3}
        parent_id
        media {
          url
          alt
          media_id
        }
        seo_id
        seo {
          title
          description
          keywords
          url
          canonical_url
          redirect_url_301
          robots_status
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteCategory(id: $id) {
        success
        message
      }
    }
  `,
  sort: gql`
    mutation ($input: [sortCategoryInput]) {
      result: sortCategories(input: $input) {
        success
        message
      }
    }
  `,
}
