import Tag from "@admin/Tag"
import { action_types } from "~/app/global"

export default {
  defaultValues: {
    name: "",
    key: "",
    description: "",
  },
  backValues: {
    action: "",
    action_types: "",
  },
  fields: [
    [
      {
        name: "name",
        size: 12,
        type: "text",
      },
      {
        name: "field",
        size: 12,
        type: "text",
      },
      {
        name: "key",
        size: 12,
        type: "text",
      },
      {
        name: "description",
        size: 12,
        type: "textarea",
      },
    ],
  ],
  backFields: [
    [
      {
        name: "action",
        size: 12,
        direction: "ltr",
      },
      // {
      //   name: "action_type",
      //   size: 12,
      //   type: "select",
      //   data: action_types,
      // },
    ],
  ],
  filterFields: [
    [
      {
        name: "name",
        text: true,
        size: 6,
        // perm: "components_menu_items_name_column"
      },
      {
        name: "key",
        text: true,
        size: 6,
        // perm: "components_menu_items_key_column"
      },
    ],
  ],
  tableActions: (actions) => [
    {
      onClick: (rows) => actions.backend(rows),
      icon: "fa-passport",
      tooltip: "action_type",
      // perm: "components_menu_items_edit_action"
    },
    {
      onClick: (rows) => actions.change(rows),
      icon: "fa-edit",
      tooltip: "edit-column",
      // perm: "components_menu_items_edit_action"
    },
    {
      onClick: (rows) => actions.delete(rows),
      icon: "fa-trash-alt",
      tooltip: "delete-column",
      // perm: "components_menu_items_delete_action"
    },
  ],
  tableFields: (translation) => [
    {
      title: "name",
      // perm: "actions_name_column"
    },
    {
      title: "field",
      // perm: "actions_action_column"
    },
    {
      title: "action",
      // perm: "actions_action_column"
    },
    {
      title: "is_completed",
      // perm: "actions_is_completed_column",
      td: (items) =>
        items.is_completed ? (
          <Tag type="success">{translation("Completed", "menuItems")}</Tag>
        ) : (
          <Tag type="orange">{translation("Not Completed", "menuItems")}</Tag>
        ),
    },
  ],
}
