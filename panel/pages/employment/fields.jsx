export default {
  filterFields: (translation) => [
    [
      {
        type: "text",
        size: 6,
        name: "user_name",
        perm: "employment_name_column",
      },
      {
        type: "text",
        size: 6,
        name: "user_last_name",
        perm: "employment_last_name_column",
      },
      {
        type: "text",
        size: 6,
        name: "user_email",
        perm: "employment_email_column",
      },
      {
        type: "text",
        size: 6,
        name: "user_mobile",
        perm: "employment_mobile_column",
      },
      { size: 6, type: "date", name: "from_date" },
      { size: 6, type: "date", name: "to_date" },
    ],
  ],
  tableActions: (actions, router) => [
    {
      icon: "fa-eye",
      onClick: actions.detail,
      tooltip: "view",
      dir: "right",
      perm: "employment_view_details_action",
    },
  ],
  tableFields: (translation, locale, callback) => [
    {
      title: "createdAt",
      td: (row, key) =>
        new Date(parseInt(row.createdAt, 10))
          .toLocaleString(locale)
          .replace("،", " - "),
      perm: "employment_createdAt_column",
    },
    {
      title: "user_name",
      perm: "employment_name_column"
    },
    {
      title: "user_last_name",
      perm: "employment_last_name_column",
    },
    {
      title: "user_email",
      perm: "employment_email_column",
    },
    {
      title: "user_mobile",
      perm: "employment_email_column",
    },
  ],
}
