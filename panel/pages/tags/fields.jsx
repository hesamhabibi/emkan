export default {
  allowed: ["title", "deep", "tag_group_ids", "tag_ids"],
  tagFields: (tags) => [
    [
      {
        perm: "tags_tag_title_field",
        name: "title",
        // size: 12,
        type: "multi-language",
        component: "text",
        gridSize: 12,
      },
    ],
  ],
  tagGroupFields: (tags) => [
    [
      {
        perm: "tags_tag_group_title_field",
        name: "title",
        type: "multi-language",
        component: "text",
        // size: 12,
        gridSize: 12,
      },
      {
        name: "tag_ids",
        data: (tags || [])
          .filter((item) => item.deep === 1)
          .map((item) => ({ name: item.title_panel, id: item.id })),
        size: 12,
        type: "select-multiple",
        perm: "tags_tag_group_tags_field",
      },
    ],
  ],
  defaultValues: {
    title: {},
    key: "",
    deep: 1,
  },
  filterFields: [
    [
      {
        size: 6,
        perm: "tags_title_column",
        name: "title",
        type: "prepend",
        component: "text",
        input_size: 8,
        select_size: 4,
      },
    ],
  ],
}
