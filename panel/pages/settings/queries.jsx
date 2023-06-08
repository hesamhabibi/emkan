import { gql } from "@apollo/client";

export default {
  all: gql`
    query ($filter: SettingFilter) {
      result: getAllSettings(filter: $filter) {
        id
        name
        name_panel
        key
        description_panel
        description
        format # ["object":1, "array":2, "string":3, "big_text":4, "integer":5, "bool":6, "float":7]
        is_main
        value
        parsed_value
        extra_data
      }
    }
  `,
  create: gql`
    mutation ($input: SettingInput!) {
      result: createSetting(input: $input) {
        id
        name
        key
        description
        format
        is_main
        value
        name_panel
        description_panel

        parsed_value
        extra_data
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: SettingInput!) {
      result: updateSetting(id: $id, input: $input) {
        id
        name
        key
        description
        format # ["object":1, "array":2, "string":3, "big_text":4, "integer":5, "bool":6, "float":7]
        is_main
        value

        parsed_value
        extra_data

        name_panel
        description_panel
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteSetting(id: $id) {
        success
        message
      }
    }
  `,
};
