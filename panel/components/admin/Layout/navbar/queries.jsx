import { gql } from "@apollo/client";

export default {
  logout: gql`
    mutation {
      panelLogout {
        message
      }
    }
  `,
  reminders: gql`
    query ($type: Int, $date_start: String, $date_end: String) {
      reminders: getRangeSelfReminders(
        date_start: $date_start
        date_end: $date_end
        type: $type
      ) {
        id
        title
        description
        start_date
        end_date
        for_every_one
      }
      events: getRangeCalenderEvents(
        date_start: $date_start
        date_end: $date_end
      ) {
        title
        type
        month
        jMonth
        day
        jDay
        date
      }
    }
  `,
};
