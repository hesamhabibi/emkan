const typeData = [
  {
    id: 1,
    name: "text",
  },
  {
    id: 2,
    name: "color",
  },
  {
    id: 3,
    name: "image"
  },
  // {
  //   id: 3,
  //   name: "shop",
  // },
  // {
  //   id: 4,
  //   name: "digital-product",
  // },
];

// const toggleData = [
//   {
//     name: "True",
//     color: "#3ECF8E",
//     id: true,
//   },
//   {
//     name: "False",
//     id: false,
//     color: "#EC6060",
//   },
// ];

export default {
  variant: (translation) => [
    {
      name: "name",
      type: "multi-language",
      gridSize: 12,
    },
    {
      name: "type",
      type: "select",
      data: typeData.map((item) => {
        item.name = translation(item.name, "products");
        return item;
      }),
    },
    // {
    //   name: "show_in_filter",
    //   data: toggleData.map((item) => {
    //     item.name = translation(item.name, "products");
    //     return item;
    //   }),
    //   type: "toggle",
    // },
  ],
  variantType: () => [
    {
      name: "title",
      type: "multi-language",
      gridSize: 12,
    },
  ],
  variantColorType: () => [
    {
      name: "title",
      type: "multi-language",
      gridSize: 12,
    },
    {
      name: "values.color_value",
      type: "color",
      size: 12,
    },
  ],
  variantImage: () => [
    {
      name: "title",
      type: "multi-language",
      gridSize: 12,
    },
    {
      name: "values.image",
      type: "image-simple",
      size: 12,
    },
  ],
};
