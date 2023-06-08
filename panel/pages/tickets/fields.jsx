import Tag from "@admin/Tag"

export default {
  fields: [],

  tableFields: (translation) => [
    { title: "title", perm: "campaigns_title_column" },
    {
      title: "status",
      td: (row) =>
        row.status === 1 ? (
          <Tag type="primary">{translation("opened")}</Tag>
        ) : (
          <Tag type="info">{translation("closed")}</Tag>
        ),
      perm: "campaigns_status_column",
    },
    {
      title: "createdAt",
      td: (row) =>
        new Date(parseInt(row.createdAt)).toLocaleDateString("fa-IR"),
      perm: "campaigns_created_at_column",
    },
  ],

  filterFields: (translation) => [
    [
      {
        name: "status",
        size: 12,
        type: "toggle",
        data: [
          {
            name: translation("opened"),
            id: 1,
          },
          {
            name: translation("closed"),
            id: 0,
          },
        ],
        perm: "campaigns_status_column",
      },
    ],
  ],
}
