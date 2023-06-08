import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($page: Int, $limit: Int, $filter: CRMFilter) {
      users: getAllUsers(
        filter: { mobile: [{ operator: NotEqual, value: null }] }
      ) {
        id
        mobile
        email
        full_name
      }
      result: getCRMs(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          type
          send_to {
            receiver_user_id
            receiver_value
            #            seen

            # receiver_user
          }
          status
          response
          title
          date
          message
        }
      }
    }
  `,
  create: gql`
    mutation ($input: SendSMSInput) {
      result: sendSMS(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen

          # receiver_user
        }
        status #[pending:1,success:2,reject:3]
        response
        date
      }
    }
  `,
  records: gql`
    query ($page: Int, $limit: Int, $filter: CRMFilter) {
      result: getCRMs(page: $page, limit: $limit, filter: $filter) {
        paginate {
          page
          limit
          total
          pages
        }
        data {
          id
          type
          send_to {
            receiver_user_id
            receiver_value
            #            seen

            # receiver_user
          }
          status
          response
          title
          date
          message
        }
      }
    }
  `,
  createSMS: gql`
    mutation ($input: SendSMSInput) {
      result: sendSMS(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen

          # receiver_user
        }
        status #[pending:1,success:2,reject:3]
        response
        date
        user_id
        createdAt
        updatedAt

        # user
      }
    }
  `,
  createPushNotification: gql`
    mutation ($input: SendPushNotificationInput) {
      result: sendPushNotification(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen

          # receiver_user
        }
        status #[pending:1,success:2,reject:3]
        response
        date
      }
    }
  `,
  createInternal: gql`
    mutation ($input: SendInternalMessageInput) {
      result: sendInternalMessage(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen

          # receiver_user
        }
        status #[pending:1,success:2,reject:3]
        response
        date
        user_id
      }
    }
  `,

  createPopup: gql`
    mutation ($input: SendPopupInput) {
      result: sendPopup(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen
        }
        status #[pending:1,success:2,reject:3]
        response
        date
      }
    }
  `,
  createExternal: gql`
    mutation ($input: SendExternalMessageInput) {
      result: sendExternalMessage(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen

          # receiver_user
        }
        status #[pending:1,success:2,reject:3]
        response
        date
      }
    }
  `,
  createEmail: gql`
    mutation ($input: SendEmailInput) {
      result: sendEmail(input: $input) {
        id
        title
        message
        type # {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}
        kind # integer
        send_to {
          receiver_user_id
          receiver_value
          seen

          # receiver_user
        }
        status #[pending:1,success:2,reject:3]
        response
        date
      }
    }
  `,
}
