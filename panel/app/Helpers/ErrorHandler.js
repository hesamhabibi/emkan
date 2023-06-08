import { withRouter } from "next/router"
import React from "react"
import queries from "./queries"
import client from "~/app/apollo-client"

export function QueryError(e, toast) {
  if (e.message && toast) {
    toast(e.message, { status: "error" })
  }
}

export default withRouter(
  class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
      client.mutate({
        mutation: queries.report,
        variables: {
          input: {
            action: this.props.router.asPath,
            action_type: 4,
            error: { message: error.message, trace: error.stack },
          },
        },
      })
      this.props.router.push(`/500?url=${this.props.router.asPath}`)
    }

    render() {
      return this.props.children
    }
  }
)
