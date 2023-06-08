import { gql } from "~/app/apollo-client";

export default {
  all: gql`
    query ($filter: AttributeFilter) {
      result: getAllAttributes(filter: $filter) {
        id
        parent_id
        sort
        deep
        title # multi language
        title_panel
        title_web
        active

        # deep 1
        attribute_group_ids
        # deep 2
        attribute_ids
        # deep 3
        type # ['text': 1,'big_text': 2,'two_answer_question': 3]
        default_attribute_value_id
        description # multi language
        description_panel
        description_web

        attribute_values {
          id
          value
          value_panel
        }

        # attribute_groups
        # attributes
        default_attribute_value {
          id
          value
          value_panel
        }
        # default_value
        # products
        # parent
        # children
        # user
      }
    }
  `,
  create: gql`
    mutation ($input: AttributeInput!) {
      result: createAttribute(input: $input) {
        id
        parent_id
        sort
        deep
        title # multi language
        title_panel
        title_web
        active

        # deep 1
        attribute_group_ids
        # deep 2
        attribute_ids
        # deep 3
        type # ['text': 1,'big_text': 2,'two_answer_question': 3]
        default_attribute_value_id
        description # multi language
        description_panel
        description_web

        attribute_values {
          id
          value
          value_panel
        }

        default_attribute_value {
          id
          value
          value_panel
        }

        # attribute_groups
        # attributes
        # default_attribute_value
        # default_value
        # products
        # parent
        # children
        # user
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: AttributeInput!) {
      result: updateAttribute(id: $id, input: $input) {
        id
        parent_id
        sort
        deep
        title # multi language
        title_panel
        title_web
        active

        attribute_values {
          id
          value
          value_panel
        }

        # deep 1
        attribute_group_ids
        # deep 2
        attribute_ids
        # deep 3
        type # ['text': 1,'big_text': 2,'two_answer_question': 3]
        default_attribute_value_id
        description # multi language
        description_panel
        description_web

        default_attribute_value {
          id
          value
          value_panel
        }

        # attribute_groups
        # attributes
        # default_attribute_value
        # default_value
        # products
        # parent
        # children
        # user
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteAttribute(id: $id) {
        success
        message
      }
    }
  `,
  updateDefault: gql`
    mutation ($id: ID!, $default_attribute_value_id: ID) {
      result: updateAttributeDefaultValue(
        id: $id
        default_attribute_value_id: $default_attribute_value_id
      ) {
        id
        parent_id
        sort
        deep
        title # multi language
        title_panel
        title_web
        active

        # deep 1
        attribute_group_ids
        # deep 2
        attribute_ids
        # deep 3
        type # ['text': 1,'big_text': 2,'two_answer_question': 3]
        default_attribute_value_id
        description # multi language
        description_panel
        description_web

        attribute_values {
          id
          value
          value_panel
        }

        default_attribute_value {
          id
          value
          value_panel
        }
      }
    }
  `,
};
