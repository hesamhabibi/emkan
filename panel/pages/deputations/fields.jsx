export default {
  filterFields: (cities, state, watch, getValues) => [
    [
      {
        size: 6,
        // perm: "blogs_title_column",
        name: "title",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
        perm: "deputations_title_action",
      },
      {
        size: 6,
        // perm: "blogs_title_column",
        name: "label",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
        perm: "deputations_label_action",
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
    // {
    //   title: "image",
    //   td: (rows, key) =>
    //     rows.media_gallery && rows.media_gallery[0]?.url ? (
    //       <img
    //         style={{ borderRadius: "50%" }}
    //         width={30}
    //         key={key}
    //         src={process.env.apiHost + rows.media_gallery[0]?.url}
    //         alt={rows.title_panel}
    //       />
    //     ) : (
    //       "-"
    //     ),
    // },
    {
      title: "title_panel",
      perm: "deputations_title_action",
    },
    { title: "label_panel", perm: "deputations_label_action" },
    { title: "cellphone", perm: "deputations_cell_phone_action" },
  ],
  allowedFields: [
    "title",
    "description",
    "address",
    "label",
    "postal_code",
    "location",
    "cellphone",
    "media_gallery",
    "city_id",
    "state_id",
  ],
  fields: (cities, state, watch, getValues) => [
    [
      {
        gridSize: 6,
        name: "title",
        type: "multi-language",
        perm: "deputations_title_action",
      },
      {
        gridSize: 12,
        name: "description",
        component: "textarea",
        type: "multi-language",
        perm: "deputations_title_action",
      },
      {
        gridSize: 12,
        name: "address",
        component: "textarea",
        type: "multi-language",
      },
      {
        name: "label",
        gridSize: 6,
        type: "multi-language",
        perm: "deputations_label_action",
      },
      {
        size: 6,
        name: "postal_code",
        type: "text",
        perm: "deputations_postal_code_action",
      },
      {
        size: 6,
        name: "cellphone",
        type: "text",
        perm: "deputations_cell_phone_action",
      },
      {
        name: "state_id",
        type: "select-searchable",
        size: 6,
        data: state,
        perm: "deputations_state_action",
      },
      {
        name: "city_id",
        type: "select-searchable",
        size: 6,
        data: (() => {
          const value = getValues().state_id
          return cities.filter((item) => String(item.state_id) === String(value))
        })(),
        perm: "deputations_city_action",
      },
      {
        name: "location",
        type: "map",
        size: 12,
        perm: "deputations_location_action",
      },
      {
        name: "media_gallery",
        type: "image-gallery",
        size: 12,
        url: process.env.apiHost + "api/media/upload-image",
        perm: "deputations_image_gallery_action",
      },
    ],
  ],
  tableActions: (actions) => [
    {
      icon: "fa-edit",
      onClick: actions.edit,
      perm: "deputations_edit_action",
    },
    {
      icon: "fa-trash-alt",
      onClick: actions.delete,
      perm: "deputations_delete_action",
    },
  ],
}
