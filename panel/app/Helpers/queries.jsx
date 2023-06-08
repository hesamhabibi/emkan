import { gql } from "@apollo/client";

export default {
  report: gql`
    mutation ($input: ReportInput!) {
      result: createReport(input: $input) {
        id
      }
    }
  `,
};
