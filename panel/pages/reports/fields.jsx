import Tag from "@admin/Tag"

export default {
  defaultValues: {
    name: "",
    last_name: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    is_active: true,
  },
  passwordFields: [
    [
      {
        size: 6,
        name: "password",
        type: "password",
      },
      {
        size: 6,
        name: "password_confirmation",
        type: "password",
      },
    ],
  ],
  filterFields: [
    [
      {
        size: 6,
        perm: "reports_action_column",
        name: "action",
      },
      {
        size: 6,
        perm: "reports_action_type_column",
        name: "action_type",
      },
      {
        size: 6,
        perm: "reports_status_column",
        type: "toggle",
        name: "status",
        data: [
          {
            name: "Any",
            color: "#ffb115",
            id: "",
          },
          {
            name: "Done",
            color: "#3ECF8E",
            id: 2,
          },
          {
            name: "Active",
            color: "#EC6060",
            id: 1,
          },
        ],
      },
    ],
  ],
  tableFields: (translation) => [
    { title: "action", perm: "reports_action_column" },
    {
      title: "action_type",
      perm: "reports_action_type_column",
      td: (row) =>
        row.action_type === 1 ? (
          <Tag type="success">{translation("Query", "reports")}</Tag>
        ) : row.action_type === 2 ? (
          <Tag type="orange">{translation("Mutation", "reports")}</Tag>
        ) : (
          <Tag type="info">{translation("Unknown", "reports")}</Tag>
        ),
    },

    {
      title: "status",
      perm: "reports_status_column",
      td: (row) => (
        <Tag
          type={
            row.status === 1 ? "error" : row.status === 2 ? "success" : "error"
          }
        >
          {row.status === 1
            ? translation("checking", "reports")
            : row.status === 2
            ? translation("done", "reports")
            : translation("checking", "reports")}
        </Tag>
      ),
    },
  ],
  tableActions: (actions) => [
    {
      onClick: (rows) => actions.show(rows.id),
      icon: "fa-eye",
      perm: "reports_show_action",
      tooltip: "show",
      dir: "right",
    },
    {
      onClick: (rows) => actions.submit(rows.id),
      icon: "fa-bug",
      perm: "reports_set_status_action",
      show: (rows) => rows.department === 2 || rows.status !== 2,
      tooltip: "status",
      dir: "right",
    },
  ],
}
