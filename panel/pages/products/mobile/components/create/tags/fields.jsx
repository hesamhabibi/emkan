export default {
  allowed: ["title"],
  fields: () => [
    [
      {
        name: "title",
        // size: 12,
        type: "multi-language",
        component: "text",
        gridSize: 12,
      },
    ],
  ],
}
