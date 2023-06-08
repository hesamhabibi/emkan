import Tag from "@admin/Tag"

const statuses = {
  1: "inactive",
  2: "show",
  3: "draft",
}

//["product": 1, "digital": 2, "service": 3, "preview": 4]

const types = ["", "product", "digital", "service", "preview"]

export default {
  filterFields: [
    [
      {
        size: 6,
        name: "title",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
      },
      {
        size: 6,
        name: "summary",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
      },
    ],
  ],
  tableFields: (translation) => [
    {
      perm: "products_image_column",
      title: "image",
      td: (row) => (
        <img
          width="35"
          src={
            row.media?.url
              ? process.env.apiHost + row.media?.url
              : "/images/not-found.png"
          }
          alt={row.media?.alt}
        />
      ),
    },
    {
      title: "product_code",
      td: (row) => row.details?.product_code,
      perm: "products_product_code_column",
    },
    { title: "title_panel", perm: "products_title_column" },
    // {title: "title_panel", td: (row) => `${row.title_panel} - (${row.variant[0].name_panel})`},
    // {
    //   title: "mix variants count",
    //   td: (row) => (
    //     <h6>
    //       {row.mix_variant.length}{" "}
    //       <small>{translation("variant", "products")}</small>
    //     </h6>
    //   ),
    // },
    // { title: "product type", td: (row) => translation(types[row.type]) },
    {
      title: "status",
      td: (item) => (
        <Tag
          type={
            item.status === 3
              ? "info"
              : item.status === 2
              ? "success"
              : "orange"
          }
        >
          {translation(statuses[item.status])}
        </Tag>
      ),
      perm: "products_status_column",
    },
    {
      title: <i className="fas fa-star" />,
      td: (row) => `${row.average_rate || "0"} / 5`,
      perm: "products_rate_column",
    },
  ],
  tableActions: (actions) => [
    {
      onClick: (row) => actions.comments(row),
      icon: "fa-comments",
      tooltip: "comment-management",
      dir: "right",
      perm: "products_see_comments_action",
    },
    {
      onClick: (rows) => actions.priceAction(rows),
      icon: "fa-dollar-sign",
      tooltip: "set-price",
      dir: "right",
      perm: "products_set_price_action",
    },
    {
      onClick: (rows) => actions.edit(rows),
      icon: "fa-edit",
      tooltip: "update",
      dir: "right",
      perm: "products_edit_action",
    },
    {
      onClick: (rows) => actions.delete(rows),
      icon: "fa-trash-alt",
      tooltip: "delete",
      dir: "right",
      perm: "products_delete_action",
    },
  ],
}
