import Tag from "@admin/Tag"

export default {
  allowed: ["name", "key", "status", "description"],
  imageAllowed: ["title", "link", "url", "media_id", "media", "description"],
  sliderFields: (translation) => [
    [
      {
        type: "multi-language",
        name: "name",
        gridSize: 6,
        perm: "sliders_name_field",
      },
      {
        type: "text",
        name: "key",
        size: 6,
        perm: "sliders_key_field",
      },
      {
        type: "toggle",
        name: "status",
        size: 6,
        data: [
          {
            name: translation("show"),
            id: 2,
          },
          {
            name: translation("hide"),
            id: 1,
          },
        ],
        perm: "sliders_status_field",
      },
    ],
  ],
  imageField: (translation) => [
    [
      {
        name: "title",
        type: "multi-language",
        gridSize: 6,
        perm: "sliders_image_title_field",
      },
      {
        direction: "ltr",
        name: "link",
        size: 12,
        perm: "sliders_image_link_field",
      },
      {
        type: "image",
        name: "media",
        size: 12,
        url: `${process.env.apiHost}api/media/upload-image-slider`,
        // render: ({ label, control }) => (
        //   <Image
        //     label={label}
        //     control={control}
        //     url="http://localhost:3001/api/media/upload-media-category"
        //   />
        // ),
        perm: "sliders_image_image_field",
      },
      {
        type: "multi-language",
        name: "description",
        size: 12,
        gridSize: 12,
        component: "textarea",
        perm: "sliders_image_description_field",
      },
    ],
  ],
  filterFields: (translation) => [
    [
      {
        size: 6,
        name: "name",
        type: "prepend",
        select_size: 4,
        input_size: 8,
        select_placeholder: "زبان",
        input_name: "value",
        select_name: "fields",
        perm: "sliders_name_column",
      },
      {
        size: 6,
        name: "status",
        type: "select",
        data: [
          {
            name: translation("show"),
            id: 1,
          },
          {
            name: translation("hide"),
            id: 2,
          },
        ],
        perm: "sliders_status_column",
      },
      {
        name: "key",
        size: 6,
        type: "text",
        perm: "sliders_key_column",
      },
    ],
  ],
  tableFields: (translation) => [
    { title: "name_panel", perm: "sliders_name_column" },
    { title: "key", perm: "sliders_key_column" },
    {
      title: "status",
      td: (row) => (
        <Tag type="info">{translation(row.status === 1 ? "show" : "hide")}</Tag>
      ),
      perm: "sliders_status_column",
    },
  ],
  tableActions: (actions) => [
    {
      onClick: (rows) => actions.edit(rows),
      icon: "fa-edit",
      // perm: "blogs_edit_action",
    },
    {
      onClick: (rows) => actions.delete(rows),
      icon: "fa-trash-alt",
      // perm: "blogs_delete_action",
    },
  ],
}
