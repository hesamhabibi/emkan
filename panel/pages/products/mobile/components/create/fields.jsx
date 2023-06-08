export default {
  allowedFields: {
    attributes: ["title", "active", "description", "deep", "parent_id"],
  },
  attributes: (translation, data) => [
    [
      {
        name: "title",
        type: "multi-language",
        size: 12,
        gridSize: 6,
      },
      {
        name: "parent_id",
        type: "select-searchable",
        data: (data.attributes || []).filter((item) => item.deep === 2),
        size: 6,
      },
      {
        name: "type",
        size: 6,
        type: "select",
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
      {
        name: "active",
        type: "toggle",
        size: 6,
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
      {
        name: "description",
        type: "multi-language",
        component: "textarea",
        size: 12,
        gridSize: 12,
      },
    ],
  ],
  defaultValues: {
    attributes: {
      active: true,
      type: 1,
    },
  },
};
