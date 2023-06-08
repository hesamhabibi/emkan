export default {
  allowed: ["title"],
  fields: () => [
    [
      {
        name: "title",
        type: "multi-language",
        component: "text",
        gridSize: 12,
      },
    ],
  ],
}
