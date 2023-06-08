import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($filter: TagFilter) {
      result: getAllTags(filter: $filter) {
        id
        title_panel
        title
        deep
        tag_group_ids
        tag_ids
        tags {
          id
          title
          title_panel
        }
      }
    }
  `,
  createTag: gql`
    mutation ($input: TagInput!) {
      result: createTag(input: $input) {
        id
        title # multi language
        title_panel
        deep # {"tag": 1, "tag_group": 2}
        tag_group_ids
        tag_ids
        tags {
          id
          title
          title_panel
        }
      }
    }
  `,
  updateTag: gql`
    mutation ($id: ID!, $input: TagInput!) {
      result: updateTag(id: $id, input: $input) {
        id
        title
        title_panel
        deep
        tag_ids
        tag_group_ids
        tags {
          id
          title
          title_panel
        }
      }
    }
  `,
  deleteTag: gql`
    mutation ($id: ID!) {
      result: deleteTag(id: $id) {
        success
        message
      }
    }
  `,
}
