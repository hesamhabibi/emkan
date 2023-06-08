import { gql } from "@apollo/client"

export default {
  all: gql`
    query {
      result: getTicketDepartments {
        title
        title_panel
        title_web
        number
      }
    }
  `,
  tab: gql`
    query ($page: Int, $limit: Int, $filter: TicketFilter) {
      result: getTickets(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          title
          text
          status # {'open': 1,'close': 2}
          department
          number
          name
          last_name
          email
          mobile
          media {
            media_id
            alt
            url

            # media
          }
          user_id
          reply_to_id
          createdAt
          updatedAt

          user {
            full_name
            user_information {
              media {
                url
              }
            }
          }
          # reply_to
          # replies
        }
      }
    }
  `,
  replies: gql`
    query ($filter: TicketFilter) {
      result: getAllTickets(filter: $filter) {
        id
        title
        text
        status # {'open': 1,'close': 2}
        department # todo
        number
        name
        last_name
        email
        mobile
        media {
          media_id
          alt
          url

          # media
        }
        user_id
        reply_to_id
        createdAt
        updatedAt

        user {
          full_name
          user_information {
            media {
              url
            }
          }
        }
        # reply_to
        # replies
      }
    }
  `,
  createReply: gql`
    mutation ($id: ID, $input: TicketInput) {
      result: replyTicket(id: $id, input: $input) {
        id
        title
        text
        status # {'open': 1,'close': 2}
        department # todo
        number
        name
        last_name
        email
        mobile
        media {
          media_id
          alt
          url

          # media
        }
        user_id
        reply_to_id
        createdAt

        user {
          full_name
          user_information {
            media {
              url
            }
          }
        }
      }
    }
  `,
  setStatus: gql`
    mutation ($id: ID, $input: TicketSetStatusInput) {
      result: setStatusTicket(id: $id, input: $input) {
        id
        title
        text
        status # {'open': 1,'close': 2}
        department
        number
        name
        last_name
        email
        mobile
        media {
          media_id
          alt
          url

          # media
        }
        user_id
        reply_to_id
        createdAt
        updatedAt

        # user
        # reply_to
        # replies
      }
    }
  `,
}
