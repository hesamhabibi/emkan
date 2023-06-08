import SwitchToggle from "@admin/Input/SwitchToggle"

export default {
  allowedFields: [
    "title",
    "code",
    "expireAt",
    "startAt",
    "status",
    "type",
    "value",
    "settings",
    "min_price",
    "max_price",
  ],
  fields: [
    [
      {
        perm: "discount_codes_name_field",
        size: 12,
        type: "text",
        name: "name",
      },
      {
        perm: "accesses_description_column",
        size: 12,
        type: "textarea",
        name: "description",
      },
    ],
  ],
  defaultValues: {
    name: "",
    description: "",
  },
  filterFields: [
    [
      {
        size: 6,
        // perm: "blogs_title_column",
        name: "title",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
        perm: "discount_codes_title_column",
      },
      {
        size: 6,
        type: "number",
        name: "code",
        perm: "discount_codes_code_column",
      },
    ],
  ],
  tableFields: [
    { title: "title_panel", perm: "discount_codes_title_column" },
    { title: "code", perm: "discount_codes_code_column" },
  ],
  tableActions: (actions, translation) => [
    {
      perm: "discount_codes_status_action",
      render: (row, key) => (
        <>
          <small className="ml-2">
            {translation(row.status === 1 ? "active" : "inactive")}
          </small>
          <span style={{ position: "relative", bottom: "-6px" }}>
            <SwitchToggle
              key={key}
              size="sm"
              field={{
                value: row.status === 1,
                onChange: actions.setStatus.bind(this, row),
              }}
            />
          </span>
        </>
      ),
    },
    {
      onClick: actions.edit,
      icon: "far fa-edit",
      tooltip: translation("edit", "discount"),
      dir: "right",
      perm: "discount_codes_edit_action",
    },
    {
      onClick: actions.delete,
      icon: "far fa-trash-alt",
      tooltip: translation("delete", "discount"),
      dir: "right",
      perm: "discount_codes_delete_action",
    },
  ],
}
