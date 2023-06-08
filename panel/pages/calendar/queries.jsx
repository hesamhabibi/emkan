import { gql } from "@apollo/client";

export default {
  all: gql`
    query ($type: Int, $date_start: String, $date_end: String) {
      users: getAllUsers {
        id
        name: full_name
      }
      reminders: getRangeSelfReminders(
        date_start: $date_start
        date_end: $date_end
        type: $type
      ) {
        id
        title
        description
        start_date
        is_owner
        can_edit
        editable
        end_date
        access_user_ids
      }
      events: getRangeCalenderEvents(
        date_start: $date_start
        date_end: $date_end
      ) {
        title
        type
        type_title_panel
        month
        jMonth
        day
        jDay
        date
      }
    }
  `,
  createReminder: gql`
    mutation ($input: ReminderInput!) {
      result: createReminder(input: $input) {
        id
        title
        description
        start_date
        end_date
        can_edit
        editable
        access_user_ids
        is_owner
      }
    }
  `,
  updateReminder: gql`
    mutation ($id: ID!, $input: ReminderInput!) {
      result: updateReminder(id: $id, input: $input) {
        id
        title
        description
        start_date
        end_date
        user_id
        editable
        access_user_ids
        createdAt
        is_owner
        can_edit
      }
    }
  `,
  deleteReminder: gql`
    mutation ($id: ID!) {
      result: deleteReminder(id: $id) {
        success
        message
      }
    }
  `,
};
