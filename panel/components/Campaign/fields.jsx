export default {
  filterFields: (data) => [
    [
      {
        size: 6,
        type: "text",
        name: "product_title",
      },
      {
        size: 6,
        type: "text",
        name: "product_code",
      },
      // {
      //     size: 6,
      //     type: "select-searchable",
      //     name: "category_id",
      //     data: data.categories.filter(item => item.name)
      // },
      // {
      //     size: 6,
      //     type: "select-multiple",
      //     name: "brand_ids",
      //     data: data.brands.filter(item => item.name)
      // },
    ],
  ],
}
