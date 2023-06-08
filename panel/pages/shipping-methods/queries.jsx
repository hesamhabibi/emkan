import { gql } from "@apollo/client"

export default {
  all: gql`
    query ($filter: ShippingMethodFilter) {
      shipping: getSettingByKey(key: "shipping_methods") {
        value
      }
      result: getAllShippingMethods(filter: $filter) {
        id
        title
        title_panel
        is_main
        title_web
        description
        description_panel
        description_web
        admin_description
        status # {'active': 1,'inactive': 2}
        weight_sensitivity
        conditions {
          type # {'weight': 1,'price': 2}
          operator # {'less_than': 1,'less_than_or_equal': 2,'equal': 3,'not_equal': 4,'more_than': 5,'more_than_or_equal': 6}
          value
        }
        attributes {
          id
          operator
          from_weight
          to_weight
        }
      }
    }
  `,
  create: gql`
    mutation ($input: ShippingMethodInput!) {
      result: createShippingMethod(input: $input) {
        id
        title
        title_panel
        is_main
        title_web
        description
        description_panel
        description_web
        admin_description
        status # {'active': 1,'inactive': 2}
        weight_sensitivity
        conditions {
          type # {'weight': 1,'price': 2}
          operator # {'less_than': 1,'less_than_or_equal': 2,'equal': 3,'not_equal': 4,'more_than': 5,'more_than_or_equal': 6}
          value
        }
        attributes {
          id
          operator
          from_weight
          to_weight
        }
      }
    }
  `,
  update: gql`
    mutation ($id: ID!, $input: ShippingMethodInput!) {
      result: updateShippingMethod(id: $id, input: $input) {
        id
        title
        title_panel
        is_main
        title_web
        description
        description_panel
        description_web
        admin_description
        status # {'active': 1,'inactive': 2}
        weight_sensitivity
        conditions {
          type # {'weight': 1,'price': 2}
          operator # {'less_than': 1,'less_than_or_equal': 2,'equal': 3,'not_equal': 4,'more_than': 5,'more_than_or_equal': 6}
          value
        }
        attributes {
          id
          operator
          from_weight
          to_weight
        }
      }
    }
  `,
  delete: gql`
    mutation ($id: ID!) {
      result: deleteShippingMethod(id: $id) {
        success
        message
      }
    }
  `,
  updateSetting: gql`
    mutation ($input: SettingInput!) {
      result: updateSettingByKey(key: "shipping_methods", input: $input) {
        value
      }
    }
  `,
}
