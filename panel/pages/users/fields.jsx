import Tag from "@admin/Tag"

export default {
  allowedFields: [
    "name",
    "last_name",
    "username",
    "email",
    "mobile",
    "is_active",
    "access_id",
  ],
  addFields: (accesses, translation) => [
    [
      {
        size: 6,
        name: "name",
        type: "text",
      },
      {
        size: 6,
        name: "last_name",
        type: "text",
      },
      {
        size: 6,
        name: "username",
        type: "text",
      },
      {
        size: 6,
        name: "email",
        type: "text",
      },
      {
        size: 6,
        name: "mobile",
        text: true,
        type: "number",
      },
      {
        size: 6,
        name: "password",
        type: "password",
      },
      {
        size: 6,
        type: "toggle",
        name: "is_active",
        section: "user",
        data: [
          {
            name: translation("active", "user"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("inactive", "user"),
            color: "#EC6060",
            id: false,
          },
        ],
      },
      {
        size: 6,
        type: "select",
        name: "access_id",
        data: [
          { name: translation("no Access", "user"), id: null },
          ...accesses,
        ],
      },
    ],
  ],
  editFields: (accesses, translation) => [
    [
      {
        size: 6,
        name: "name",
        type: "text",
      },
      {
        size: 6,
        name: "last_name",
        type: "text",
      },
      {
        size: 6,
        name: "username",
        type: "text",
      },
      {
        size: 6,
        name: "email",
        type: "text",
      },
      {
        size: 6,
        name: "mobile",
        type: "number",
      },
      {
        size: 6,
        type: "toggle",
        defaultValue: true,
        name: "is_active",
        section: "user",
        data: [
          {
            name: translation("active", "user"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("inactive", "user"),
            color: "#EC6060",
            id: false,
          },
        ],
      },
      {
        size: 6,
        type: "select",
        name: "access_id",
        data: [
          { name: translation("no Access", "user"), id: null },
          ...accesses,
        ],
      },
    ],
  ],
  defaultValues: {
    name: "",
    last_name: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    is_active: true,
    can_edit: true,
  },
  passwordFields: [
    [
      {
        size: 12,
        name: "password",
        text: true,
        type: "password",
      },
      {
        size: 12,
        name: "password_confirmation",
        text: true,
        type: "password",
      },
    ],
  ],
  filterFields: (translation, accesses) => [
    [
      {
        size: 6,
        perm: "users_name_column",
        type: "text",
        name: "name",
      },
      {
        size: 6,
        perm: "users_last_name_column",
        type: "text",
        name: "last_name",
      },
      {
        size: 6,
        perm: "users_username_column",
        type: "text",
        name: "username",
      },
      {
        size: 6,
        perm: "users_email_column",
        type: "text",
        name: "email",
      },
      {
        size: 6,
        // perm: "users_is_active_column",
        type: "toggle",
        name: "is_active",
        data: [
          {
            name: translation("any"),
            color: "#ffb115",
            id: "",
          },
          {
            name: translation("active", "user"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("inactive", "user"),
            color: "#EC6060",
            id: false,
          },
        ],
      },
      {
        size: 6,
        // perm: "users_mobile_column",
        type: "text",
        name: "mobile",
      },
      {
        size: 6,
        type: "select",
        name: "access_id",
        data: [
          { name: translation("no Access", "user"), id: null },
          ...accesses,
        ],
      },
    ],
  ],
  tableFields: (translation) => [
    { title: "name", perm: "users_name_column" },
    { title: "last_name", perm: "users_last_name_column" },
    { title: "username", perm: "users_username_column" },
    { title: "email", perm: "users_email_column" },
    {
      title: "access",
      perm: "users_access_column",
      td: (item) =>
        item?.access?.name ? (
          <Tag type="success"> {item?.access?.name} </Tag>
        ) : (
          <Tag type="info">{translation("no Access", "user")}</Tag>
        ),
    },
  ],
  tableActions: (actions, router) => [
    {
      onClick: (rows) => router.push(`/users/${rows.id}`),
      icon: "fa-info-circle",
      perm: "users_view_info_action",
      tooltip: "informations",
      dir: "right",
    },
    {
      onClick: (rows) => actions.show(rows),
      icon: "fa-eye",
      perm: "users_show_column",
      tooltip: "information",
      dir: "right",
    },
    {
      onClick: (rows) => actions.change(rows),
      icon: "fa-user-edit",
      perm: "users_edit_column",
      tooltip: "edit",
      dir: "right",
    },
    {
      onClick: (rows) => actions.password(rows),
      icon: "fa-key",
      perm: "users_change_password_column",
      tooltip: "Change Password",
      dir: "right",
    },
  ],
}
