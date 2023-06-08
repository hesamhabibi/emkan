import { gql } from "@apollo/client"

export default {
  all: gql`
    query {
      result: getAllPaymentGateways {
        id
        title
        title_panel
        gateway
        status
        fields
      }
      gateways: getSettingByKey(key: "available_payment_gateways") {
        value
      }
    }
  `,
  create: gql`
    mutation ($input: PaymentGatewayInput) {
      result: createPaymentGateway(input: $input) {
        id
        title
        title_panel
        gateway
        status
        fields
      }
    }
  `,
  update: gql`
    mutation ($id: ID, $input: PaymentGatewayInput) {
      result: updatePaymentGateway(id: $id, input: $input) {
        id
        title
        title_panel
        gateway
        status
        fields
      }
    }
  `,
  delete: gql`
    mutation ($id: ID) {
      result: deletePaymentGateway(id: $id) {
        success
        message
      }
    }
  `,
  sort: gql`
    mutation ($input: [sortPaymentGatewayInput]) {
      result: sortPaymentGateways(input: $input) {
        success
        message
      }
    }
  `,
}
