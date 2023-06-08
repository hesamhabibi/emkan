export default {
  allowed: [
    "title",
    "active",
    "default_value",
    "placeholder",
    "deep",
    "type",
    "parent_id",
  ],
  attributes: (translation) => [
    [
      {
        name: "title",
        type: "multi-language",
        component: "textarea",
        size: 12,
        gridSize: 12,
      },
      {
        name: "active",
        type: "toggle",
        size: 12,
        data: [
          {
            id: true,
            name: translation("True"),
          },
          {
            id: false,
            name: translation("False"),
          },
        ],
      },
    ],
  ],
  attrGroupFields: (translation) => [
    [
      {
        name: "title",
        type: "multi-language",
        size: 12,
        gridSize: 12,
      },
      {
        name: "active",
        type: "toggle",
        size: 12,
        data: [
          {
            id: true,
            name: translation("True"),
          },
          {
            id: false,
            name: translation("False"),
          },
        ],
      },
      // {
      //   name: "default_value",
      //   type: "multi-language",
      //   size: 12,
      //   gridSize: 6,
      // },
      {
        name: "description",
        type: "multi-language",
        component: "textarea",
        size: 12,
        gridSize: 12,
      },
    ],
  ],
  variantFields: (translation) => [
    [
      {
        name: "title",
        type: "multi-language",
        size: 12,
        gridSize: 12,
      },
      {
        name: "active",
        type: "toggle",
        size: 12,
        data: [
          {
            id: true,
            name: translation("True"),
          },
          {
            id: false,
            name: translation("False"),
          },
        ],
      },
      // {
      //   name: "default_value",
      //   type: "multi-language",
      //   size: 12,
      //   gridSize: 6,
      // },
      {
        name: "description",
        type: "multi-language",
        component: "textarea",
        size: 12,
        gridSize: 12,
      },
      {
        name: "type",
        type: "select",
        size: 12,
        data: [
          {
            id: 1,
            name: translation("text", "attributes"),
          },
          {
            id: 2,
            name: translation("big_text", "attributes"),
          },
          {
            id: 3,
            name: translation("two_answer_question"),
          },
        ],
      },
    ],
  ],
  tableFields: [
    {
      title: "title_panel",
    },
  ],
  tableActions: (actions) => [
    {
      onClick: actions.change,
      icon: "far fa-edit",
      perm: "attributes_edit_action",
      tooltip: "edit",
      dir: "right",
    },
    {
      onClick: actions.delete,
      icon: "far fa-trash-alt",
      perm: "attributes_delete_action",
      tooltip: "delete",
      dir: "right",
    },
  ],
};
