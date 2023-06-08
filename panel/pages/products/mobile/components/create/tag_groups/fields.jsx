export default {
  allowed: ["title"],
  fields: (translation, tags) => [
    [
      {
        name: "title",
        // size: 12,
        type: "multi-language",
        component: "text",
        gridSize: 12,
      },
      {
        name: "tag_ids",
        type: "select-multiple",
        data: tags || [],
        size: 12,
      },
    ],
  ],
}
