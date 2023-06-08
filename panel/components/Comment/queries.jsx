import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($filter: CommentFilter) {
      result: getAllComments(filter: $filter) {
        id
        title
        text
        confirmed
        reply_to_id
        user_id
        model_name
        model_type
        model_id
        createdAt
        updatedAt

        # reply_to
        # replies
        user {
          full_name
        }

        user_id
      }
      confirmation: getSettingByKey(key: "comments_need_confirmation") {
        value
      }
    }
  `,
  reply: gql`
    mutation ($reply_to_id: ID!, $input: CommentInput) {
      result: replyComment(reply_to_id: $reply_to_id, input: $input) {
        id
        title
        text
        confirmed
        reply_to_id
        user_id
        model_name
        model_type
        model_id
        createdAt
        updatedAt

        user {
          full_name
        }

        user_id

        # reply_to
        # replies
        # user
      }
    }
  `,
  create: gql`
    mutation ($input: CreateCommentInput!) {
      result: createComment(input: $input) {
        id
        title
        text
        confirmed
        reply_to_id
        user_id
        model_name
        model_type
        model_id
        createdAt
        updatedAt
        user {
          full_name
        }

        user_id
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteComment(id: $id) {
        success
        message
      }
    }
  `,
  confirmed: gql`
    mutation ($id: ID!, $confirmed: Boolean) {
      result: setConfirmComment(id: $id, confirmed: $confirmed) {
        id
        title
        text
        confirmed
        reply_to_id
        user_id
        model_name
        model_type
        model_id
        createdAt
        updatedAt

        # reply_to
        # replies
        user {
          full_name
        }

        user_id
      }
    }
  `,
}
