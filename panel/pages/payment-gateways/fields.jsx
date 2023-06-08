import Shield from "@admin/Shield"

const field_types = {
  boolean: "toggle",
  textarea: "textarea",
}

const getTableFields = (translation, gateways, is_desktop) => {
  if (is_desktop) {
    return [
      {
        title: "image",
        td: (row) => (
          <img
            height="50"
            src={
              process.env.apiHost +
              gateways.find((item) => item.gateway === row.gateway).logo
            }
          />
        ),
        perm: "payment_gateways_image_column",
      },
      { title: "title_panel", perm: "payment_gateways_title_column" },
      {
        title: "status",
        td: (row) => translation(row.status ? "active" : "inactive"),
        perm: "payment_gateways_status_column",
      },
    ]
  } else {
    return [
      {
        title: "image",
        td: (row) => (
          <>
            <Shield id="payment_gateways_image_column">
              <img
                height="50"
                src={
                  process.env.apiHost +
                  gateways.find((item) => item.gateway === row.gateway)?.logo
                }
              />
            </Shield>
            <Shield id="payment_gateways_title_column">
              <span className="pr-2">{row.title_panel}</span>
            </Shield>
          </>
        ),
      },
      {
        title: "status",
        td: (row) => translation(row.status ? "active" : "inactive"),
        perm: "payment_gateways_status_column",
      },
    ]
  }
}

const Fields = {
  form: (fields, translation) => [
    [
      {
        name: "title",
        component: "text",
        gridSize: 6,
        type: "multi-language",
        perm: "payment_gateways_title_field",
      },
      {
        name: "status",
        type: "toggle",
        size: 6,
        data: [
          {
            name: translation("active"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("inactive"),
            color: "#EC6060",
            id: false,
          },
        ],
        perm: "payment_gateways_status_field",
      },
      ...fields.map((item) => ({
        direction: "ltr",
        label: translation(item.title, "gateways"),
        name: `fields.${item.name}`,
        type: field_types[item.type_name],
        size: item.size,
        className: "text-left",
        data: [
          {
            name: translation("active"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("inactive"),
            color: "#EC6060",
            id: false,
          },
        ],
      })),
    ],
  ],
  tableFields: (translation, gateways, is_desktop) =>
    getTableFields(translation, gateways, is_desktop),
  tableActions: (actions) => [
    {
      icon: "fa-edit",
      onClick: actions.edit,
      perm: "payment_gateways_edit_action",
    },
    {
      icon: "fa-trash-alt",
      onClick: actions.delete,
      perm: "payment_gateways_delete_action",
    },
  ],
}

export default Fields
