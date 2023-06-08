import { action_types } from "~/app/global"

export default {
  allowed: ["name", "key", "action", "action_type"],
  fields: [
    [
      {
        size: 6,
        name: "name",
        type: "text",
      },
      {
        size: 6,
        name: "key",
        type: "text",
      },
      {
        size: 6,
        name: "action",
        type: "text",
        direction: "ltr",
      },
      // {
      //   size: 6,
      //   name: "action_type",
      //   type: "select",
      //   data: action_types,
      //   extra: {
      //     valueAsNumber: true,
      //   },
      // },
      {
        size: 12,
        name: "description",
        type: "textarea",
      },
    ],
  ],
  defaultValues: {
    name: "",
    action_type: "",
    key: "",
    action: "",
    description: "",
    parent_id: "",
  },
  tableActions: (actions, translation) => [
    (rows) => ({
      onClick: () => actions.create(rows),
      icon: "far fa-plus",
      perm: "components_menu_items_create_action",
      route: "/components/menu-items",
      tooltip: translation("create-tree-component", "menuItems"),
      dir: "right",
    }),
    (rows) => ({
      onClick: () => actions.change(rows),
      icon: "far fa-edit",
      perm: "components_menu_items_edit_action",
      route: "/components/menu-items",
      tooltip: translation("edit-tree-component", "menuItems"),
      dir: "right",
    }),
    (rows) => ({
      onClick: () => actions.delete(rows),
      icon: "far fa-trash-alt",
      perm: "components_menu_items_delete_action",
      route: "/components/menu-items",
      tooltip: translation("delete-tree-component", "menuItems"),
      dir: "right",
    }),
  ],
}
