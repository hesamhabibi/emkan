export default {
  filterFields: (cities, state, watch, getValues) => [
    [
      {
        name: "title",
        type: "text",
        size: 6,
      },
      {
        name: "postal_code",
        type: "text",
        size: 6,
      },
      {
        name: "state_id",
        type: "select-searchable",
        size: 6,
        data: state,
      },
      {
        name: "city_id",
        type: "select-searchable",
        size: 6,
        data: (() => {
          const value = getValues().state_id
          return cities.filter((item) => item.state_id === value)
        })(),
      },
    ],
  ],
  tableFields: [
    {
      title: "title",
    },
    {
      title: "postal_code",
    },
    {
      title: "state",
      td: (row) => row.state.name_panel,
    },
    {
      title: "city",
      td: (row) => row.city.name_panel,
    },
  ],
  allowed: [
    "postal_code",
    "city_id",
    "state_id",
    "is_default",
    "location",
    "address",
    "title",
  ],
  fields: (state, city, watch, getValues, translation) => [
    [
      {
        type: "text",
        name: "title",
        size: 6,
      },
      {
        name: "postal_code",
        type: "text",
        size: 6,
      },
      {
        name: "state_id",
        type: "select-searchable",
        data: state,
        size: 6,
      },
      {
        name: "city_id",
        type: "select-searchable",
        data: watch
          ? (() => {
              const value = getValues().state_id
              return city.filter((item) => item.state_id === value)
            })()
          : [],
        size: 6,
      },
      {
        name: "is_default",
        type: "toggle",
        size: 6,
        data: [
          {
            name: translation("True"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("False"),
            color: "#EC6060",
            id: false,
          },
        ],
      },
      {
        name: "location",
        type: "map",
        size: 12,
      },
      {
        type: "textarea",
        size: 12,
        name: "address",
      },
    ],
  ],
  tableActions: (actions, translation) => [
    {
      onClick: actions.edit,
      icon: "far fa-edit",
      tooltip: translation("edit-address", "user"),
      dir: "right",
    },
    {
      onClick: actions.delete,
      icon: "far fa-trash-alt",
      tooltip: translation("delete-address", "user"),
      dir: "right",
    },
  ],
}
