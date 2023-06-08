export default {
  fields: [
    [
      {
        perm: "accesses_name_column",
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
        perm: "accesses_name_column",
        name: "name",
        type: "text",
        size: 6,
      },
    ],
  ],
  tableActions: (actions, translation) => [
    {
      perm: "accesses_edit_action",
      onClick: actions.edit,
      icon: "far fa-edit",
      tooltip: translation("edit", "access"),
    },
    {
      perm: "accesses_delete_action",
      onClick: actions.delete,
      icon: "far fa-trash-alt",
      tooltip: translation("delete", "access"),
    },
  ],
};
