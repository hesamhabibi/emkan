export default {
  fields: [
    [
      {
        size: 12,
        name: "name",
        type: "text",
      },
      {
        size: 12,
        name: "action",
        type: "text",
      },
      {
        size: 12,
        name: "description",
        type: "textarea",
      },
    ],
  ],
  defaultValues: {
    name: "",
    action: "",
    description: "",
  },
  filterFields: [
    [
      {
        perm: "components_menu_items_name_column",
        name: "name",
        type: "text",
        size: 6,
      },
      {
        perm: "components_menu_items_action_column",
        name: "action",
        type: "text",
        size: 6,
      },
    ],
  ],
  tableActions: (actions, translation) => [
    {
      onClick: (rows) => actions.change(rows),
      icon: "far fa-edit",
      perm: "components_menu_items_edit_action",
      tooltip: `${translation("edit access")}`,
      dir: "right",
    },
    {
      onClick: (rows) => actions.delete(rows),
      icon: "far fa-trash-alt",
      perm: "components_menu_items_delete_action",
      tooltip: translation("delete", "menuItems"),
      dir: "right",
    },
  ],
  tableFields: (router, translation) => [
    {
      onClick: (item) =>
        router.push(`/components/menu-items/columns?id=${item.id}`),
      title: translation("Column Management"),
    },
    {
      onClick: (item) =>
        router.push(`/components/menu-items/tree-id?id=${item.id}`),
      title: translation("Tree Components"),
    },
    {
      onClick: (item) =>
        router.push(`/components/menu-items/actions?id=${item.id}`),
      title: translation("Action Management"),
    },
  ],
};
