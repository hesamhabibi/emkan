import Tag from "@admin/Tag"

const types = {
  0: "unknown",
  1: "cart",
  2: "pre_order",
  3: "complete",
}

export const statusTypes = {
  0: "not_set",
  1: "reject",
  2: "complete",
  3: "pending",
  4: "packing",
  5: "sending",
  6: "sent",
}

const shipping_methods = {
  0: "not_set",
  1: "reject",
  2: "complete",
  3: "pending",
  4: "packing",
  5: "sending",
  6: "sent",
}

// {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}

export default {
  filterFields: (translation, users) => [
    [
      {
        type: "text",
        size: 6,
        name: "number",
        perm: "orders_number_column",
      },
      // {
      //   type: "select",
      //   size: 6,
      //   name: "type",
      //   data: Object.keys(types).map((item) => ({
      //     id: parseInt(item),
      //     name: translation(types[item]),
      //   })),
      // },
      { size: 6, type: "date", name: "from_date" },
      { size: 6, type: "date", name: "to_date" },
      {
        type: "select-searchable",
        size: 6,
        name: "user_id",
        data: users,
        label: translation("client"),
        perm: "orders_full_name_column",
      },
      {
        type: "toggle",
        size: 12,
        name: "status",
        data: Object.keys(statusTypes).map((item) => ({
          id: parseInt(item),
          name: translation(statusTypes[item], "orders"),
        })),
        perm: "orders_status_column",
      },
    ],
  ],
  tableActions: (actions, router) => [
    {
      icon: "fa-shipping-fast",
      onClick: actions.postTrack,
      tooltip: "post_track",
      dir: "right",
      perm: "orders_post_track_action",
    },
    {
      icon: "fa-eye",
      onClick: actions.factor,
      tooltip: "view",
      dir: "right",
      perm: "orders_view_factor_action",
    },
  ],
  tableFields: (translation, locale, callback) => [
    {
      title: "date",
      td: (row, key) =>
        new Date(parseInt(row.date, 10))
          .toLocaleString(locale)
          .replace("،", " - "),
      perm: "orders_date_column",
    },
    { title: "number", perm: "orders_number_column" },
    {
      title: "full_name",
      td: (row, key) => row.user?.full_name,
      perm: "orders_full_name_column",
    },
    {
      title: "payment_gateway",
      td: (row, key) =>
        row.payment_gateway?.title_panel
          ? row.payment_gateway?.title_panel
          : "-",
      perm: "orders_payment_gateway_column",
    },
    {
      title: "shipping_method",
      td: (row, key) =>
        row.shipping_method?.title_panel
          ? row.shipping_method?.title_panel
          : "-",
      perm: "orders_payment_method_column",
    },
    {
      title: "status",
      td: (row, key) => (
        <Tag
          onClick={() => callback(row)}
          className="pointer"
          type={row.status === 0 ? "error" : "primary"}
          key={key}
        >
          {translation(statusTypes[row.status], "order")}
        </Tag>
      ),
      perm: "orders_status_column",
    },
  ],
}
