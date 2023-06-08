import { Fragment } from "react"
import { int2Comma } from "~/app/global"

const gateways = {
  1: "mellat",
}

export default {
  filterFields: (translation) => [
    [
      { size: 6, type: "date", name: "from_date" },
      { size: 6, type: "date", name: "to_date" },
      {
        size: 6,
        type: "number",
        name: "amount",
        perm: "transactions_price_column",
      },
      {
        size: 6,
        type: "select",
        name: "gateway",
        data: Object.keys(gateways).map((key) => ({
          id: key,
          name: translation(gateways[key]),
        })),
        perm: "transaction_gateway_column",
      },
    ],
  ],
  tableFields: (translation) => [
    {
      title: "date",
      td: (row) =>
        new Date(parseInt(row.paidAt, 10))
          .toLocaleString("fa-IR")
          .replace("،", " - "),
      perm: "transactions_date_column",
    },
    {
      title: "price",
      td: (row) => int2Comma(row.amount || 0),
      perm: "transactions_price_column",
    },
    {
      title: "description",
      td: (row, key) => (
        <Fragment key={key}>
          <span
            className="ml-2"
            style={{ fontWeight: "bold", color: "#ee6565" }}
          >
            {row.user?.full_name}
          </span>
          <br />
          <span>
            {translation("about factor")}: {row.order.number}
          </span>
        </Fragment>
      ),
      perm: "transactions_detail_column",
    },
    {
      title: "gateway",
      td: (row) => translation(gateways[row.gateway]),
      perm: "transaction_gateway_column",
    },
  ],
}
