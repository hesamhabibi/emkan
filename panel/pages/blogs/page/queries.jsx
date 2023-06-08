import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: BlogFilter) {
      categories: getAllCategories(filter: { type: [{ value: 2 }] }) {
        id
        name: title_panel
      }
      tags: getAllTags {
        id
        name: title_panel
        deep
      }
      result: getBlogs(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          title
          title_panel
          summary
          summary_panel
          description
          description_panel
          status
          type
          category_id
          tag_ids
          tag_group_id
          visit_count
          publishAt

          has_comment
          has_rating

          media {
            media_id
            alt
            url
          }
          media_gallery {
            media_id
            main
            alt
            url
          }

          document {
            media_id
            alt # mulit language
            url

            # media
          }
          comments {
            id
            title
            user_id
            text
            user {
              full_name
            }
            confirmed
            reply_to_id
            model_name
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
    }
  `,
  create: gql`
    mutation ($input: BlogInput!) {
      result: createBlog(input: $input) {
        id
        title
        title_panel
        description
        description_panel
        status
        type
        visit_count
        has_comment
        has_rating
        publishAt

        media_gallery {
          media_id
          main
          alt
          url
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
  update: gql`
    mutation ($id: ID!, $input: BlogInput!) {
      result: updateBlog(id: $id, input: $input) {
        id
        title
        title_panel
        description
        description_panel
        status
        type
        visit_count
        has_comment
        has_rating
        publishAt

        media_gallery {
          media_id
          main
          alt
          url
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
  delete: gql`
    mutation ($id: ID!) {
      result: deleteBlog(id: $id) {
        success
        message
      }
    }
  `,
}
